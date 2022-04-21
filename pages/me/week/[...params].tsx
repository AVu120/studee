import { Button, useToast } from "@chakra-ui/react";
import { Planner } from "components/Planner";
import { DailyPlan } from "components/Planner/DailyPlan";
import type { GetServerSideProps, NextPage, NextPageContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { login, logOut, signUp } from "services/auth";
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
  const router = useRouter();

  /** Start date that is set when the page is loaded but weeklyPlan can't be found in the db.  */
  let emptyStartDate: string;
  if (Array.isArray(router?.query?.params)) {
    emptyStartDate = getDateInUrlPath(router?.query?.params);
  } else {
    emptyStartDate = getCurrentStartDate();
  }

  const savedWeeklyPlanRef = useRef(
    weeklyPlan || getEmptyWeeklyPlan(emptyStartDate)
  );
  const [weeklyPlanState, setWeeklyPlanState] = useState(
    weeklyPlan || getEmptyWeeklyPlan(emptyStartDate)
  );
  const [hasUnsavedChanges, setHasUnsavedChanged] = useState(false);

  useEffect(() => {
    if (
      !hasUnsavedChanges &&
      JSON.stringify(weeklyPlanState) !==
        JSON.stringify(savedWeeklyPlanRef.current)
    ) {
      setHasUnsavedChanged(true);
    }
  }, [weeklyPlanState]);

  const [startDateYear, startDateMonth, startDateDay] =
    weeklyPlanState.startDate.split("/").map((numString) => Number(numString));
  const startDateString = `${startDateDay}/${startDateMonth}/${startDateYear}`;
  const endDateObject = new Date(
    startDateYear,
    startDateMonth - 1,
    startDateDay
  );
  endDateObject.setDate(endDateObject.getDate() + 6);
  const endDateString = `${endDateObject.getDate()}/${
    endDateObject.getMonth() + 1
  }/${endDateObject.getFullYear()}`;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const toast = useToast();

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
        <h1>{`Week of Mon ${startDateString} to Sun ${endDateString}`}</h1>
        <Button
          type="submit"
          variant="primary"
          onClick={() => alert("initiate save workflow")}
          disabled={
            JSON.stringify(weeklyPlanState) ===
            JSON.stringify(savedWeeklyPlanRef.current)
          }
        >
          Save
        </Button>
        <Button
          type="submit"
          variant="secondary"
          onClick={() => logOut(setIsLoading, setError, router, toast)}
        >
          {isLoading ? "Loading..." : "Log Out "}
        </Button>
      </header>

      <main className={styles.main}>
        <Planner
          weeklyPlan={weeklyPlanState}
          setWeeklyPlanState={setWeeklyPlanState}
        />
      </main>

      <footer
        className={styles.footer}
        // @ts-ignore
        style={{ "--bgColor": colors.secondary }}
      >
        Footer
      </footer>
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
