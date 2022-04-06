import {
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import type { ChangeEvent } from "react";
import { useState } from "react";
import { login } from "services/auth";
import styles from "styles/pages/Home.module.scss";
import passwordSchema from "utils/validators/password";

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
        <Heading variant="h1" size="h1" as="h1">
          Welcome to Studee
        </Heading>

        <form
          className={styles.form}
          onSubmit={(e) => {
            login(email, password);
            e.preventDefault();
          }}
        >
          <FormControl isInvalid={touched.email && errors.email}>
            <FormLabel htmlFor="email" mb="-0.1">
              Email address
            </FormLabel>
            <Input
              id="email"
              type="email"
              onChange={changeEmail}
              onBlur={blueEmailField}
            />

            <FormErrorMessage>Email is required</FormErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={touched.password && !!errors.password.length}
            mt="2"
          >
            <FormLabel htmlFor="password" mb="-0.1">
              Password
            </FormLabel>
            <Input
              id="password"
              type="password"
              onChange={changePassword}
              onBlur={blurPasswordField}
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
            />
            {errors.password.map(({ message }) => (
              <FormErrorMessage key={message}>{message}</FormErrorMessage>
            ))}
          </FormControl>

          <Button
            mt={4}
            type="submit"
            isDisabled={errors.email || !!errors.password.length}
            variant="primary"
          >
            Log In
          </Button>
          <Text
            textStyle="a"
            as="a"
            mt="2"
            onClick={() => alert("Forgot password flow initiated.")}
          >
            Forgot your password?
          </Text>
          <Divider />
          <Button
            mt={1}
            type="button"
            variant="secondary"
            onClick={() => alert("Create account flow initiated")}
          >
            Create New Account
          </Button>
        </form>
      </main>
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
