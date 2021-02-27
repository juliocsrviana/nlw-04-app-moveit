import Head from 'next/head';
import {GetServerSideProps} from 'next';

import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { ChagellendBox } from '../components/ChagellendBox';

import styles from '../styles/pages/Home.module.css';
import { CountdownProvider } from '../contexts/CountdownContext';
import { ChagellendProvider } from '../contexts/ChagellendContext';

export default function Home(props) {
  return (
    <ChagellendProvider
      level={props.level}
      currentExperience={props.currentExperience}
      chagellendCompleted={props.chagellendCompleted}
    >
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
    </ChagellendProvider>
  )
}

export const getServerSideProps:GetServerSideProps = async (ctx) => {

  const {level, currentExperience, chagellendCompleted} = ctx.req.cookies;

  return{
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      chagellendCompleted: Number(chagellendCompleted)
    }
  }
}