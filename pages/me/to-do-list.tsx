import { Header } from "components/common/Header";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import styles from "styles/pages/me/ToDoList.module.scss";

const ToDoList: NextPage = () => (
  <div>
    <Head>
      <title>To Do List</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Header
      onSave={() => alert("Save placeholder")}
      hasUnsavedChanges={false}
      isSaving={false}
      CentreComponent={<p>To Do List</p>}
      isLoggingOut={false}
      onLogOut={() => alert("logout placeholder")}
    />
    <main className={styles.main}>To do list placeholder</main>
  </div>
);

export const getServerSideProps: GetServerSideProps = async ({ req }) => ({
  props: {},
});

export default ToDoList;
