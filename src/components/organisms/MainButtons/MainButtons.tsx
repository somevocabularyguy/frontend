import React from 'react';

import styles from './MainButtons.module.css';
import { Button } from '@/components/atoms/index';
import { useMainButtonsUtils } from '@/hooks';


const MainButtons: React.FC = () => {
  const { handleNext, handleShow } = useMainButtonsUtils();

  return (
    <section className={styles.mainGrid}>
      <div>{/* blank */}</div>
      <Button text="Next" onClick={() => handleNext()} className={styles.mainButton} />
      <Button text="Show" onClick={handleShow} className={styles.mainButton} />
    </section>
  )
}

export default MainButtons;