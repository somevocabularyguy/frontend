import styles from './LanguageStrip.module.css';

import { ArrowIcon } from '#/public/icons';
import { Text } from '@/components/atoms';

import { useAppDispatch, useAppSelector } from '@/store/store';
import { updateIsLanguagesVisible } from '@/store/languageUiSlice';

import { useCustomTranslation } from '@/hooks';

const LanguageStrip: React.FC = () => {
  const dispatch = useAppDispatch();
  const t = useCustomTranslation('Language.LanguageStrip');

  const isLanguagesVisible = useAppSelector(state => state.languageUi.isLanguagesVisible);

  const toggleLanguages = () => {
    dispatch(updateIsLanguagesVisible(!isLanguagesVisible))
  }

  const classNameForLanguagesToggleIconLeft = isLanguagesVisible ? styles.languagesToggleIconRotatedLeft : styles.languagesToggleIconLeft
  const classNameForLanguagesToggleIconRight = isLanguagesVisible ? styles.languagesToggleIconRotatedRight : styles.languagesToggleIconRight

  const containerClassName = `${styles.container} ${isLanguagesVisible ? styles.containerActive : ''}`;
  return (
    <section className={containerClassName} onClick={toggleLanguages}>
      <ArrowIcon className={classNameForLanguagesToggleIconLeft} />
      <Text className={styles.selectLanguagesLabel} as="h2">{t("label")}</Text>
      <ArrowIcon className={classNameForLanguagesToggleIconRight} />
    </section>
  )
}

export default LanguageStrip;