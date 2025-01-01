import { defaultColorValue } from '@/constants';
import { LevelObject, Word, WordData, RGB } from '@/types';

const returnColorValue = (learningScore: number): RGB => {
  const colorValue = {...defaultColorValue};
  let change = learningScore * 300;
  if (change > 159) {
    change = 159;
  }
  colorValue.r -= Math.floor(0.5 * change);
  colorValue.g += Math.floor(change);
  return colorValue;
}

const createLevels = (words: Word[], wordsData: WordData[]): LevelObject[] => {

  const levelMap = new Map<string, { totalLearningScore: number; count: number, wordIds: string[] }>();
  const wordsDataMap = new Map(wordsData.map(wordDataObject => [wordDataObject.id, wordDataObject]));

  words.forEach(wordObject => {
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

export { returnColorValue, createLevels };