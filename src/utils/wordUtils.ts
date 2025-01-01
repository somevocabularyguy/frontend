import { Word } from '@/types';

interface Group {
  custom: Word[]; 
  easy: Word[]; 
  medium: Word[]; 
  hard: Word[]; 
  expert: Word[]; 
}

type Difficulty = 'easy' | 'medium' | 'hard' | 'expert' | 'custom';

const groupWordsByLevel = (words: Word[]): Word[] => {
  const filteredWords = words.filter(wordObject => !wordObject.isHidden);

  const group: Group = {
    custom: [],
    easy: [],
    medium: [],
    hard: [],
    expert: [],
  };

  filteredWords.forEach(wordObject => {
    const wordDifficulty = wordObject.isCustom ? 'custom' : (wordObject.difficulty as Difficulty);
    group[wordDifficulty].push(wordObject);
  });

  const groupedWords: Word[] = [];

  (Object.keys(group) as (keyof Group)[]).forEach(key => {
    let levelNumber = 1;
    group[key].forEach((wordObject, index) => {

      const updatedWord = {
      ...wordObject,
      levelName: `${key}${levelNumber}`,
      };

      groupedWords.push(updatedWord);

      if ((index + 1) % 10 === 0) levelNumber++;
    })
  })
  const groupedWordsMap = new Map();

  groupedWords.forEach(wordObject => {
    groupedWordsMap.set(wordObject.id, wordObject);
  });

  words.forEach(wordObject => {
    if (!groupedWordsMap.has(wordObject.id)) {
      groupedWords.push(wordObject);
    }
  })

  groupedWords.forEach(wordObject => {
    if (wordObject.isHidden) {
      wordObject.levelName = '';
    }
  })
  
  const sortedGroupedWords = sortWordsAscending(groupedWords)

  return sortedGroupedWords;
}

const updateReturnWordStatus = (words: Word[], hiddenWordIds: string[], customWordIds: string[]): Word[] => {
  const hiddenWordIdsSet = new Set(hiddenWordIds);
  const customWordIdsSet = new Set(customWordIds);

  const updatedWords = words.map(wordObject => ({
    ...wordObject,
    isHidden: hiddenWordIdsSet.has(wordObject.id),
    isCustom: customWordIdsSet.has(wordObject.id),
  }));

  return updatedWords;
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

export { groupWordsByLevel, updateReturnWordStatus };