import { LevelObject } from '@/types';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { updateWords } from '@/store/dataSlice';

import { returnColorValue } from '@/utils/levelSectionUtils';
import { groupWordsByLevel, updateReturnWordStatus } from '@/utils/wordUtils';


const useCreateLevels = (): () => LevelObject[] => {

  const dispatch = useAppDispatch();

  const userData = useAppSelector(state => state.userData.userData);
  const words = useAppSelector(state => state.data.words);
  const wordsData = userData.wordsData;
  
  const createLevels = (): LevelObject[] => {

    const updatedWords = updateReturnWordStatus(words, userData.hiddenWordIds, userData.customWordIds)
    const groupedWords = groupWordsByLevel(updatedWords);
    dispatch(updateWords(groupedWords));

    const levelMap = new Map<string, { totalLearningScore: number; count: number, wordIds: string[] }>();
    const wordsDataMap = new Map(wordsData.map(wordDataObject => [wordDataObject.id, wordDataObject]));

    groupedWords.forEach(wordObject => {
      const { levelName, id } = wordObject;
      const wordDataObject = wordsDataMap.get(id);
      const learningScore = wordDataObject?.learningScore || 0;

      if (levelMap.has(levelName)) {
        const existingData = levelMap.get(levelName);
        if (existingData) {
          existingData.totalLearningScore += learningScore;
          existingData.count += 1;
          existingData.wordIds.push(id);
          levelMap.set(levelName, existingData);
        }
      } else {
        levelMap.set(levelName, {
          totalLearningScore: learningScore,
          count: 1,
          wordIds: [id]
        });
      }
    });

    const levels: LevelObject[] = Array.from(levelMap, ([levelName, { totalLearningScore, count, wordIds }]) => ({
      levelName,
      colorValue: returnColorValue(totalLearningScore / count),
      wordIds: wordIds
    }));

    return levels;
  }

  return createLevels;
}

export default useCreateLevels;