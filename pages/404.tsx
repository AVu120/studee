import { Text, useToast } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "styles/pages/404.module.scss";

const PageNotFound: NextPage = () => {
  const toast = useToast();

  return (
    <div>
      <Head>
        <title>404: Page not found</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Text
          as="h1"
          variant="h1"
          fontSize="1.5rem"
          padding="10px 23px 10px 0px"
          fontWeight="500"
          borderRight="1px solid rgba(0, 0, 0, 0.3)"
          color="black"
          marginRight="20px"
        >
          404
        </Text>{" "}
        <Text>
          This page could not be found.{" "}
          <Text
            as="a"
            onClick={() => {
              toast({
                title: `Redirecting...`,
                position: "top",
                isClosable: true,
                duration: 3000,
                status: "info",
              });
            }}
            href="/"
          >
            Return to Studee
          </Text>
        </Text>
      </main>
    </div>
  );
};

export default PageNotFound;
