import { Button } from "@chakra-ui/react";
import type { GetServerSideProps, NextPage, NextPageContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import auth from "services/auth";
import styles from "styles/pages/me.module.scss";
import colors from "styles/theme/colors";

import { getUserData } from "./api/user";

interface Props {
  email: string;
  USER_ID: string;
}
const Me: NextPage<Props> = ({ email, USER_ID }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = `${currentDate.getMonth() + 1 < 10 ? "0" : ""}${
    currentDate.getMonth() + 1
  }`;
  const currentDay = `${
    currentDate.getDate() < 10 ? "0" : ""
  }${currentDate.getDate()}`;
  const currentDayOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][
    currentDate.getDay()
  ];

  return (
    <div>
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
        <h1>{`Plan for ${currentDayOfWeek}, ${currentDay}/${currentMonth}/${currentYear}`}</h1>
        <Button
          type="submit"
          variant="primary"
          onClick={() => auth.logOut(setIsLoading, setError, router)}
        >
          {/* // eslint-disable-next-line no-nested-ternary */}
          {isLoading ? "Loading..." : "Log Out "}
        </Button>
      </header>

      <main className={styles.main}>Placeholder text</main>
    </div>
  );
};

export default Me;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { cookies } = req;

  if (cookies.session) {
    const [userData, error] = await getUserData(cookies.session);

    if (userData) {
      const { email, user_id: USER_ID } = userData;
      return { props: { email, USER_ID } };
    }
  }

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
};
