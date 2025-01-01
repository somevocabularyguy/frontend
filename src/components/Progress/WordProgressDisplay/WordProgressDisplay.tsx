import styles from './WordProgressDisplay.module.css';

import { Word, WordData } from '@/types';
import { Text } from '@/components/atoms';

interface SelectedWordDisplayProps {
  selectedWordData: WordData | undefined;
  selectedWordObject: Word | undefined;
}

const WordProgressDisplay: React.FC<SelectedWordDisplayProps> = ({ selectedWordData, selectedWordObject }) => {

  if (!selectedWordData || !selectedWordObject) {
    return (
      <section className={styles.selectedWordDisplayContainer}>
        <h3>No Word Is Selected!</h3>
      </section>
    );
  }

  const { word } = selectedWordObject;

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
      <Text text={word} as="h2" />
      <Text text={`Times Seen: ${notShownSeen}`} />
      <Text text={`Times Details Shown: ${shownSeen}`} />
      <Text text={`Total Time Spent On Word: ${timeSpentText}`} />
    </section>
  )
}

export default WordProgressDisplay;