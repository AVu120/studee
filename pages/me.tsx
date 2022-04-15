import { Button } from "@chakra-ui/react";
import type { NextPage, NextPageContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import auth from "services/auth";
import styles from "styles/pages/me.module.scss";

import { getUserData } from "./api/user";

interface Props {
  email: string;
  USER_ID: string;
}
const Me: NextPage<Props> = ({ email, USER_ID }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  return (
    <div className={styles.container}>
      <Head>
        <title>Studee</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>{`Welcome ${email}`}</h1>
        <Button
          mt={4}
          type="submit"
          variant="primary"
          onClick={() => auth.logOut(setIsLoading, setError, router)}
        >
          {/* // eslint-disable-next-line no-nested-ternary */}
          {isLoading ? "Loading..." : "Log Out "}
        </Button>
      </main>
    </div>
  );
};

export default Me;

export async function getServerSideProps({ req }: NextPageContext) {
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
}
