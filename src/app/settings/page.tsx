"use client"

import styles from './styles.module.css';

import { Text, Button } from '@/components/atoms';

import { useAppSelector } from '@/store/store';

import { useHiddenCustomHandler } from '@/hooks';

const SettingsPage: React.FC = () => {
  const words = useAppSelector(state => state.data.words);

  const { handleUnHideWordInSettings, handleRemoveWordFromCustomInSettings } = useHiddenCustomHandler();

  const hiddenWords = words.filter(wordObject => wordObject.isHidden);
  const customWords = words.filter(wordObject => wordObject.isCustom);

  const loading = useAppSelector(state => state.data.loading);

  if (loading) return <h1>loading...</h1>

  return (
    <>
      <main className={styles.mainGrid}>
        <h2>Hidden Words</h2>
        <section className={styles.hiddenWordsGrid}>
          {hiddenWords && hiddenWords.map(wordObject => {
            return (
              <div key={`hiddenWord-${wordObject.id}`} className={styles.hiddenWordCell}>
                <Text text={wordObject.word} as="span" />
                <Button text="Remove" dataInfo={wordObject.id} onClick={handleUnHideWordInSettings} />
              </div>
            )
          })}
        </section>
        <h2>Custom Words</h2>
        <section className={styles.customWordsGrid}>
          {customWords && customWords.map(wordObject => {
            return (
              <div key={`customWord-${wordObject.id}`} className={styles.customWordCell}>
                <Text text={wordObject.word} as="span" />
                <Button text="Remove" dataInfo={wordObject.id} onClick={handleRemoveWordFromCustomInSettings} />
              </div>
            )
          })}
        </section>
      </main>
    </>
  )
}

export default SettingsPage;