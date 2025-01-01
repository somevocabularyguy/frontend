import styles from './WordProgressDisplay.module.css';

import { WordData } from '@/types';
import { Text, TText } from '@/components/atoms';
import { useCustomTranslation } from '@/hooks';

interface SelectedWordDisplayProps {
  selectedWordData: WordData | undefined;
}

const WordProgressDisplay: React.FC<SelectedWordDisplayProps> = ({ selectedWordData }) => {

  const t = useCustomTranslation();

  if (!selectedWordData) {
    return (
      <section className={styles.selectedWordDisplayContainer}>
        <Text as="h3">{t('noWordSelected')}</Text>
      </section>
    );
  }

  const { notShownTimeSpent, shownTimeSpent, notShownSeen, shownSeen } = selectedWordData;

  const timeSpent = shownTimeSpent + notShownTimeSpent;
  const minutes = Math.floor(timeSpent / 1000 * 60);
  const seconds = Math.floor(timeSpent / 1000) % 60;

  let timeSpentText = '';

  if (minutes) {
    timeSpentText += `${minutes} minutes`
  }
  if (seconds && minutes) {
    timeSpentText += ` and ${seconds} seconds`
  } else {
    timeSpentText += `${seconds} seconds`
  }

  return (
    <section className={styles.selectedWordDisplayContainer}>
      <TText wordId={selectedWordData.id} dataKey="word" />
      <Text>{`Times Seen: ${notShownSeen}`}</Text>
      <Text>{`Times Details Shown: ${shownSeen}`}</Text>
      <Text>{`Total Time Spent On Word: ${timeSpentText}`}</Text>
    </section>
  )
}

export default WordProgressDisplay;