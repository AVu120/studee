import { Button, useToast } from "@chakra-ui/react";
import { Planner } from "components/Planner";
import { DailyPlan } from "components/Planner/DailyPlan";
import type { GetServerSideProps, NextPage, NextPageContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import auth from "services/auth";
import styles from "styles/pages/me.module.scss";
import colors from "styles/theme/colors";
import { daysOfWeek } from "utils/constants/dateTimes";
import { getEmptyWeeklyPlan } from "utils/constants/weeklyPlan";
import { getCurrentStartDate, getDateInUrlPath } from "utils/helpers/dateTime";
import { IWeeklyPlan } from "utils/types/weeklyPlan";

import { getUserData } from "../../api/user";
import { getWeeklyPlan } from "../../api/weeklyPlans";

interface Props {
  email: string;
  weeklyPlan: IWeeklyPlan | null;
}
const Me: NextPage<Props> = ({ email, weeklyPlan }) => {
  const savedWeeklyPlanRef = useRef(weeklyPlan);
  const [weeklyPlanState, setWeeklyPlanState] = useState(weeklyPlan);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const toast = useToast();

  // console.log(router.query);
  let startDate: string;
  if (Array.isArray(router?.query?.params)) {
    startDate = getDateInUrlPath(router?.query?.params);
  } else {
    startDate = getCurrentStartDate();
  }

  return (
    <div className={styles.page}>
      <Head>
        <title>Studee</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header
        className={styles.header}
        // @ts-ignore
        style={{ "--bgColor": colors.secondary }}
      >
        <h1>Plan for placeholder start of week</h1>
        <Button
          type="submit"
          variant="primary"
          onClick={() => auth.logOut(setIsLoading, setError, router, toast)}
        >
          {/* // eslint-disable-next-line no-nested-ternary */}
          {isLoading ? "Loading..." : "Log Out "}
        </Button>
      </header>

      <main className={styles.main}>
        <Planner
          weeklyPlan={weeklyPlanState || getEmptyWeeklyPlan(startDate)}
        />
      </main>
    </div>
  );
};

export default Me;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { cookies } = req;

  if (cookies.session) {
    const userData = await getUserData(cookies.session);

    if (userData) {
      const { email, user_id: userId } = userData;

      const { params } = query as { params: string[] };
      const startDate = `${params[0]}/${params[1]}/${params[2]}`;

      const weeklyPlan = await getWeeklyPlan({ userId, startDate });

      return {
        props: { email, weeklyPlan },
      };
    }
  }

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
};
