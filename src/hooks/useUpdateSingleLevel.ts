import { WordData } from '@/types';
import { returnColorValue } from '@/utils/levelUtils';

import { useAppSelector, useAppDispatch } from '@/store/store';
import { updateLevel } from '@/store/appStateSlice';

const useUpdateSingleLevel = (): (levelNameToChange: string) => void => {
  const levels = useAppSelector(state => state.appState.levels);
  const wordsData = useAppSelector(state => state.userData.userData.wordsData);
  const dispatch = useAppDispatch();

  const updateSingleLevel = (levelNameToChange: string) => {
    const wordsDataMap = new Map<string, WordData>();
    for (let i = 0; i < wordsData.length; i++) {
      wordsDataMap.set(wordsData[i].id, wordsData[i]);
    }

    const levelToUpdatePointer = levels.find(levelObject => levelObject.levelName === levelNameToChange);

    if (!levelToUpdatePointer) return;

    const levelToUpdate = {...levelToUpdatePointer}
    const dataArray: WordData[] = [];
    for (let i = 0; i < levelToUpdate.wordIds.length; i++) {
      const wordDataObject = wordsDataMap.get(levelToUpdate.wordIds[i]);
      if (wordDataObject) {
        dataArray.push(wordDataObject);
      }
    }

    let totalLearningScore = 0;
    for (let i = 0; i < levelToUpdate.wordIds.length; i++) {
      if (dataArray[i]) {
        totalLearningScore += dataArray[i].learningScore;
      }
    }

    const newColorValue = returnColorValue(totalLearningScore / dataArray.length);
    levelToUpdate.colorValue = newColorValue;

    dispatch(updateLevel(levelToUpdate));
  }

  return updateSingleLevel;
}

export default useUpdateSingleLevel;