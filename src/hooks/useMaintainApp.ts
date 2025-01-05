import { Word } from '@/types';
import { useState, useEffect } from 'react';


import { updateWords } from '@/store/wordSlice';
import { updateDisplayWordObject } from '@/store/wordSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { updateLevels, updateBatch, updateIteration } from '@/store/appStateSlice';

import { createLevels } from '@/utils/levelUtils';
import { groupWordsByLevel } from '@/utils/wordUtils';

import { useMainButtonsUtils } from '@/hooks';

const useMaintainApp = () => {
  
  const dispatch = useAppDispatch();
  const { handleNext } = useMainButtonsUtils();

  const words = useAppSelector(state => state.word.words);
  const batch = useAppSelector(state => state.appState.batch);
  const isRandom = useAppSelector(state => state.word.isRandom);
  const userData = useAppSelector(state => state.userData.userData);
  const isAppLoaded = useAppSelector(state => state.loading.isAppLoaded);
  const checkedLevels = useAppSelector(state => state.appState.checkedLevels);

  const [handleNextFlag, setHandleNextFlag] = useState(false);
  
  useEffect(() => {
    if (userData.wordsData.length !== 0 && isAppLoaded) {
      const groupedWords = groupWordsByLevel(words, userData.hiddenWordIds, userData.customWordIds);
      const levels = createLevels(groupedWords, userData.wordsData);
      dispatch(updateWords(groupedWords));
      dispatch(updateLevels(levels));
      setHandleNextFlag(true);
    }
  }, [userData.hiddenWordIds, userData.customWordIds, dispatch])

  useEffect(() => {
    if (handleNextFlag) {
      handleNext(false);
      setHandleNextFlag(false);
    }
  }, [batch])

  useEffect(() => {
    if (isAppLoaded) {
      dispatch(updateIteration(-1));
      dispatch(updateDisplayWordObject(null));
    }
  }, [checkedLevels, isRandom, dispatch])

  useEffect(() => {
    if (isAppLoaded) {
      const checkedLevelsSet = new Set(checkedLevels);
      const newBatch: Word[] = words.filter(wordObject => checkedLevelsSet.has(wordObject.levelName));
      dispatch(updateBatch(newBatch));
    }
  }, [checkedLevels, words, dispatch])
}

export default useMaintainApp;