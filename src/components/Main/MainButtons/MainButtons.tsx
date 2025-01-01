import React from 'react';

import styles from './MainButtons.module.css';
import { Button } from '@/components/atoms/index';
import { useMainButtonsUtils } from '@/hooks';
import { useAppSelector } from '@/store/store';


const MainButtons: React.FC = () => {
  const { handleNext, handleShow, handleHideWord, handleAddToCustom, handleRemoveCustomWord } = useMainButtonsUtils();

  const displayWordObject = useAppSelector(state => state.word.displayWordObject);
  const customWordIds = useAppSelector(state => state.userData.userData.customWordIds);
  const customWordIdsSet = new Set(customWordIds);

  return (
    <section className={styles.container}>
      <Button text="Next Word" onClick={() => handleNext()} className={styles.mainButton} />
      <Button text="Show Details" onClick={handleShow} className={styles.mainButton} />
      <div className={styles.sideButtonsContainer}>
        <Button text="Remove Word" onClick={handleHideWord} className={styles.removeButton}/>
        {displayWordObject?.id && customWordIdsSet.has(displayWordObject.id) ?
          <Button text="Remove Word From Custom" onClick={handleRemoveCustomWord} className={styles.addToCustomButton}/>
          :
          <Button text="Add Word To Custom" onClick={handleAddToCustom} className={styles.addToCustomButton}/>
        }
      </div>
    </section>
  )
}

export default MainButtons;