import React from 'react';

import styles from './MainButtons.module.css';
import { Button } from '@/components/atoms/index';
import { useMainButtonsUtils, useCustomTranslation } from '@/hooks';
import { useAppSelector } from '@/store/store';


const MainButtons: React.FC = () => {
  const t = useCustomTranslation("Main.MainButtons");

  const { handleNext, handleShow, handleHideWord, handleAddToCustom, handleRemoveCustomWord } = useMainButtonsUtils();

  const displayWordObject = useAppSelector(state => state.word.displayWordObject);
  const customWordIds = useAppSelector(state => state.userData.userData.customWordIds);
  const customWordIdsSet = new Set(customWordIds);

  return (
    <section className={styles.container}>
      <Button text={t("nextButton")} onClick={() => handleNext()} className={styles.mainButton} />
      <Button text={t("showButton")} onClick={handleShow} className={styles.mainButton} />
      <div className={styles.sideButtonsContainer}>
        <Button text={t("removeButton")} onClick={handleHideWord} className={styles.removeButton}/>
        {displayWordObject?.id && customWordIdsSet.has(displayWordObject.id) ?
          <Button text={t("removeCustom")} onClick={handleRemoveCustomWord} className={styles.addToCustomButton}/>
          :
          <Button text={t("addCustom")} onClick={handleAddToCustom} className={styles.addToCustomButton}/>
        }
      </div>
    </section>
  )
}

export default MainButtons;