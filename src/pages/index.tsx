import Head from 'next/head';

import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { ChagellendBox } from '../components/ChagellendBox';

import styles from '../styles/pages/Home.module.css';
import {CountdownProvider } from '../contexts/CountdownContext';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Página inicial | move.it</title>
      </Head>
      <ExperienceBar />
      <CountdownProvider>
      <section>
        <div>
          <Profile />
          <CompletedChallenges />
          <Countdown />
        </div>
        <div>
          <ChagellendBox />
        </div>
      </section>
      </CountdownProvider>
    </div>
  )
}
