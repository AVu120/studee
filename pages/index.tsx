import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import type { ChangeEvent } from "react";
import { useState } from "react";
import passwordSchema from "utils/validators/password";

import styles from "../styles/Home.module.scss";
import connectToDatabase from "../utils/database/mongodb";

const Home: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({ email: false, password: false });
  const errors: {
    email: boolean;
    password: { arguments: number; message: string; validation: string }[];
  } = {
    email: email === "",
    password: passwordSchema.validate(password, { details: true }),
  };
  console.log({ errors });

  const changeEmail = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const blueEmailField = () => {
    if (!touched.email) {
      setTouched((currentTouched) => ({ ...currentTouched, email: true }));
    }
  };
  const changePassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);
  const blurPasswordField = () => {
    if (!touched.password) {
      setTouched((currentTouched) => ({ ...currentTouched, password: true }));
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Studee - log in or sign up</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Studee - log in or sign up</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("BAM");
          }}
        >
          <FormControl isInvalid={touched.email && errors.email}>
            <FormLabel htmlFor="email">Email address</FormLabel>
            <Input
              id="email"
              type="email"
              onChange={changeEmail}
              onBlur={blueEmailField}
            />

            <FormErrorMessage>Email is required</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={touched.password && !!errors.password.length}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              type="password"
              onChange={changePassword}
              onBlur={blurPasswordField}
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
            />
            {errors.password.map(({ message }) => (
              <FormErrorMessage>{message}</FormErrorMessage>
            ))}
          </FormControl>
          <Button
            mt={4}
            colorScheme="teal"
            type="submit"
            isDisabled={errors.email || !!errors.password.length}
          >
            Submit
          </Button>
        </form>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  try {
    // client.db() will be the default database passed in the MONGODB_URI
    // You can change the database by calling the client.db() function and specifying a database like:
    // const db = client.db("myDatabase");
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands
    await connectToDatabase();
    return {
      props: {},
    };
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return {
      props: {},
    };
  }
};
