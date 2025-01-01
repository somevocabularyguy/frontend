import { Text, TText } from '@/components/atoms';
import { TArray } from '@/components/molecules';
import { useCustomTranslation } from '@/hooks';

import styles from './MainLabels.module.css';

import { useAppSelector } from '@/store/store';

const MainLabels: React.FC = () => {
  const t = useCustomTranslation("Main.MainLabels");

  const displayWordObject = useAppSelector(state => state.word.displayWordObject);
  const isRandom = useAppSelector(state => state.word.isRandom);
  const isShown = useAppSelector(state => state.word.isShown);
  const checkedLevels = useAppSelector(state => state.appState.checkedLevels);

  const dynamicLabelClassName = `${styles.dynamicLabel} ${isShown ? '' : styles.hidden}`

  return (
    <section className={styles.container}>

      <div className={styles.wordLabelContainer}>
        <div style={{ width: '6.75rem' }}>{/*left-blank*/}</div>
        {displayWordObject?.difficulty === 'finish' ?
          <Text className={styles.wordLabel}>{t('finishText')} 🎉</Text>
          : displayWordObject?.id ?
            <TText 
              className={styles.wordLabel} 
              wordId={displayWordObject.id}
              dataKey="word"
            />
            : checkedLevels.length ?
              <Text className={styles.wordLabel}>
                {isRandom ? t("randomText") : t("practiceText")}
              </Text>
              :
              <Text className={styles.wordLabel}>{t('selectLevelText')}</Text>
        }
      </div>

      <div className={styles.otherLabelsContainer}>
        <div className={styles.shownLabelGroup}>
          <Text className={styles.headLabel}>{t("definitionText")}</Text>
          <article className={styles.dynamicLabelContainer}>
            {displayWordObject?.id &&
              <TText 
                className={dynamicLabelClassName} 
                wordId={displayWordObject.id}
                dataKey="meaning"
              />
            }
          </article>
        </div>

        <div className={styles.shownLabelGroup}>
          <Text className={styles.headLabel}>{t("exampleText")}</Text>
          <article className={styles.dynamicLabelContainer}>
            {displayWordObject?.id &&
              <TText 
                className={dynamicLabelClassName} 
                wordId={displayWordObject.id}
                dataKey="example"
              />
            }
          </article>
        </div>

        <div className={styles.shownLabelGroup}>
          <Text className={styles.headLabel}>{t("synonymsText")}</Text>
          <article className={styles.dynamicLabelContainer}>
            {displayWordObject?.id &&
              <TArray 
                wordId={displayWordObject.id} 
                arrayKey="synonyms"
                itemClassName={dynamicLabelClassName}
                dashClassName={isShown ? '' : styles.hidden}
              />
            }
          </article>
        </div>

        <div className={styles.shownLabelGroup}>
          <Text className={styles.headLabel}>{t("antonymsText")}</Text>
          <article className={styles.dynamicLabelContainer}>
            {displayWordObject?.id &&
              <TArray 
                wordId={displayWordObject.id} 
                arrayKey="antonyms"
                itemClassName={dynamicLabelClassName}
                dashClassName={isShown ? '' : styles.hidden}
              />
            }
          </article>
        </div>

      </div>
    </section>
  )
}

export default MainLabels;