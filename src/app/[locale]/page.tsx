"use client";

import styles from './styles.module.css';
import { Text } from '@/components/atoms';

import Main from '@/components/Main';
import Levels from '@/components/Levels';
import { useTranslation }  from 'react-i18next';

const MainPage: React.FC = () => {

  const { t } = useTranslation();

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