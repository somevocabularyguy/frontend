import styles from './Language.module.css';
import { useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '@/store/store';
import { updateIsWordsLanguageSelectVisible, updateIsOtherLanguagesSelectVisible } from '@/store/languageUiSlice';

import { Line } from '@/components/atoms';
import { useCustomTranslation, useAnimationIndex } from '@/hooks';

import LanguageStrip from './LanguageStrip';
import WordsLanguageSelect from './WordsLanguageSelect';
import OtherLanguagesSelect from './OtherLanguagesSelect';

const Language: React.FC = () => {
  const dispatch = useAppDispatch();
  const t = useCustomTranslation('Language');

  const isLanguageLoading = useAppSelector(state => state.languageUi.isLanguageLoading);
  const isLanguagesVisible = useAppSelector(state => state.languageUi.isLanguagesVisible);
  const isWordsLanguageSelectVisible = useAppSelector(state => state.languageUi.isWordsLanguageSelectVisible);
  const isOtherLanguagesSelectVisible = useAppSelector(state => state.languageUi.isOtherLanguagesSelectVisible);

  const changeAll = (key: string, boolean: boolean) => {
    if (boolean) {
      if (key !== 'wordsLanguageSelect' && isWordsLanguageSelectVisible) {
        dispatch(updateIsWordsLanguageSelectVisible(false));
      }
      if (key !== 'otherLanguagesSelect' && isOtherLanguagesSelectVisible) {
        dispatch(updateIsOtherLanguagesSelectVisible(false));
      }
    }
  };

  useEffect(() => {
    changeAll('wordsLanguageSelect', isWordsLanguageSelectVisible);
  }, [isWordsLanguageSelectVisible]);

  useEffect(() => {
    changeAll('otherLanguagesSelect', isOtherLanguagesSelectVisible);
  }, [isOtherLanguagesSelectVisible]);

  const mainContainerClassName = `${styles.mainContainer} ${isLanguagesVisible ? styles.mainContainerVisible : ''}`;

  const loadingClassName = `${styles.loading} ${isLanguageLoading ? styles.loadingVisible : ''}`

  const animationIndex = useAnimationIndex(isLanguageLoading, 250, 3)

  return (
    <>
      <section className={mainContainerClassName}>
        <WordsLanguageSelect />
        <OtherLanguagesSelect />
        <Line width="21rem" className={styles.line} />
        <div className={loadingClassName}>{t('loading') + '.'.repeat(animationIndex)}</div>
      </section>
      <LanguageStrip />
    </>
  )
}

export default Language;