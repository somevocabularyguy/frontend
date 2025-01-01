
import React from 'react';
import { Text, Line } from '@/components/atoms';
import { ScrollRail } from '@/components/ui';
import { LevelArray } from '@/components/molecules';
import styles from './LevelBox.module.css';

const LevelBox: React.FC = () => {


  const levelKeys: string[] = ['easy', 'medium', 'hard', 'expert', 'custom']; 

  return (
    <section className={styles.wrapper}>
      <div className={styles.mainGrid}>
        {levelKeys.map((levelKey, index) => (
          <section className={styles.section} key={levelKey}>
            {<Text 
              text={levelKey} 
              className={`${styles.categoryLabel} ${index === 0 ? styles.firstCategoryLabel : '' }`} 
              as='h2' 
            />}
            <Line width="30rem" className={styles.categoryLabelLine}/>
            <LevelArray levelKey={levelKey} />
          </section>
        ))}
      </div>
      <ScrollRail className={styles.scrollRail} height="100%" lineSize="0.125rem" ballSize="0.4375rem"/>
    </section>
  )
}

export default LevelBox;