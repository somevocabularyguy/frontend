import { Word } from '@/types';

const groupWordsByLevel = (words: Word[], hiddenWordIds: string[], customWordIds: string[]): Word[] => {
  const hiddenWordIdsSet = new Set(hiddenWordIds);
  const customWordIdsSet = new Set(customWordIds);

  const groupedWords: Word[] = [];
  let prevDifficulty = '';
  let currentWord = 0;
  let currentLevel = 1;

  let currentCustomWord = 0;
  let currentCustomLevel = 1;

  for (let i = 0; i < words.length; i++) {
    const newWordObject: Word = {...words[i]};
    if (hiddenWordIdsSet.has(newWordObject.id)) {
      newWordObject.levelName = '';
      groupedWords.push(newWordObject);
      continue;
    }
    if (customWordIdsSet.has(newWordObject.id)) {
      newWordObject.levelName = 'custom' + currentCustomLevel;
      currentCustomWord += 1;
      if (currentCustomWord === 10) {
        currentCustomWord = 0;
        currentCustomLevel +=1;
      }
      groupedWords.push(newWordObject);
      continue;
    }
    const currentDifficulty = newWordObject.difficulty;
    if (prevDifficulty !== currentDifficulty) {
      currentWord = 0;
      currentLevel = 1;
      prevDifficulty = currentDifficulty;
    }
    newWordObject.levelName = currentDifficulty + currentLevel;
    currentWord += 1;
    if (currentWord === 10) {
      currentWord = 0;
      currentLevel += 1;
    }
    groupedWords.push(newWordObject);
  }

  const sortedGroupedWords = sortWordsAscending(groupedWords)

  return sortedGroupedWords;
}

function sortWordsAscending(words: Word[]) {
  const array = [...words];
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      const temp = array[i];
      if (array[j].frequency > array[i].frequency) {
        array[i] = array[j];
        array[j] = temp;
      }
    }
  }
	return array;
}

export { groupWordsByLevel };