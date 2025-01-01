"use client";

import styles from './styles.module.css';
import { Text } from '@/components/atoms';

import Main from '@/components/Main';
import Levels from '@/components/Levels';

const MainPage: React.FC = () => {

  return (
    <>
      <section className={styles.container}>
        <Main />
        <Levels />
      </section>
    </>
  )
}

export default MainPage;