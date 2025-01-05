import styles from './WordProgressDisplay.module.css';

import { WordData } from '@/types';
import { Text, TText } from '@/components/atoms';
import { useCustomTranslation } from '@/hooks';

interface SelectedWordDisplayProps {
  selectedWordData: WordData | undefined;
}

const WordProgressDisplay: React.FC<SelectedWordDisplayProps> = ({ selectedWordData }) => {

  const t = useCustomTranslation('Progress.WordProgressDisplay');

  if (!selectedWordData) {
    return (
      <section className={styles.selectedWordDisplayContainer}>
        <Text as="h3" className={styles.noDataLabel}>{t('noProgress')}</Text>
      </section>
    );
  }

  const { notShownTimeSpent, shownTimeSpent, notShownSeen, shownSeen } = selectedWordData;

  const timeSpent = shownTimeSpent + notShownTimeSpent;
  const minutes = Math.floor(timeSpent / (1000 * 60));
  const seconds = Math.floor((timeSpent % (1000 * 60)) / 1000);

  const returnDoubleDigit = (number: number) => {
    return number.toString().padStart(2, '0');
  };

  const timeSpentText = `${returnDoubleDigit(minutes)}:${returnDoubleDigit(seconds)}`;

  return (
    <section className={styles.selectedWordDisplayContainer}>
      <TText className={styles.selectedWord} wordId={selectedWordData.id} dataKey="word" />
      <Text className={styles.detailsLabel}>{`Times Seen: ${notShownSeen}`}</Text>
      <Text className={styles.detailsLabel}>{`Times Details Shown: ${shownSeen}`}</Text>
      <Text className={styles.detailsLabel}>{`Total Time Spent On Word: ${timeSpentText}`}</Text>
    </section>
  )
}

export default WordProgressDisplay;