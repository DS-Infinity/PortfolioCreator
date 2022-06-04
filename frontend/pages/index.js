import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { signIn, signOut, useSession } from 'next-auth/client';
import Navbar from '../components/Navbar';
import Loading from '../components/Loading';
import { useEffect } from 'react';

export default function Home() {
  const [session, loading] = useSession();

  return (
    <div className={styles.container}>
      <Head>
        <title>Portfolio Creator</title>
        <meta
          name="description"
          content="Create portfolio websites in a few minutes seamlessly"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!session && !loading ? (
        <>
          <main className={styles.main}>
            <h1 className={styles.title}>Portfolio Creator</h1>

            <p className={styles.description}>
              Create portfolio websites in a few minutes seamlessly
            </p>

            <a
              className={styles.card}
              onClick={() => {
                signIn('discord', {
                  callbackUrl: 'https://portfoliocreator.vercel.app/edit',
                });
              }}
            >
              <h2>Login with Discord &rarr;</h2>
              {/* <p>
                Login with Discord to make your own portfolio website today!
              </p> */}
            </a>
          </main>
          <footer className={styles.footer}>Made by Daksh</footer>
        </>
      ) : loading ? (
        <Loading />
      ) : session && !loading ? (
        <>
          <div className={styles.logged_in}>
            <Navbar />
          </div>
          <footer className={styles.footer}>Made by Daksh</footer>
        </>
      ) : (
        <div>no</div>
      )}
    </div>
  );
}
