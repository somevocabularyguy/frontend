import React from 'react';
import { MainLabels, MainButtons } from '@/components/organisms';
import styles from './UpperSection.module.css';


const UpperSection: React.FC = () => {



  return (
    <section className={styles.mainGrid}>
      <MainLabels />
      <MainButtons />
    </section>
  )
}

export default UpperSection;