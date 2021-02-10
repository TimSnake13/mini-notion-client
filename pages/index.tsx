import Head from "next/head";
import React from "react";
// import Navbar from "../components/Navbar/Navbar";
import NotesSection from "../components/NotesSection";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Tan's <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          ENV_URL: {process.env.NEXT_PUBLIC_API_URL}
        </p>
      </main>
      <NotesSection />
      <footer className={styles.footer}></footer>
    </div>
  );
}
