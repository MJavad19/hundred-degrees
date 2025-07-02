"use client";
import Head from "next/head";
import styles from "./page.module.scss";

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className={styles.container}>
        <h1 className={styles.title}>Welcome</h1>
      </div>
    </>
  );
}
