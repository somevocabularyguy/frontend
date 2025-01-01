"use client";

import { useState, useEffect } from 'react';

import { Word } from '@/types';
import { finishWord, selectLevelWord } from '@/constants';

import { useAppDispatch, useAppSelector } from '@/store/store';

import { updateIteration } from '@/store/appStateSlice';

const useReturnNextDisplayWordObject = (): (iterate: boolean) => Word | null => {
  const dispatch = useAppDispatch();

  const checkedLevels = useAppSelector(state => state.appState.checkedLevels)
  const batch = useAppSelector(state => state.appState.batch)
  const displayWordObject = useAppSelector(state => state.word.displayWordObject)
  const iteration = useAppSelector(state => state.appState.iteration)

  const returnNextWordForPractice = (iterate: boolean): Word | null => {  
    const nextWordObject: Word | null = batch[iteration] ? batch[iteration] : null;
    if (iterate) {
      const newIteration = iteration < batch.length - 1 ? iteration + 1 : 0;
      dispatch(updateIteration(newIteration));
    }
    return nextWordObject;
  }

  const [indexArray, setIndexArray] = useState<number[]>([]);

  useEffect(() => {
    const newIndexArray = batch.flatMap((_, index) => Array(8).fill(index));
    setIndexArray(newIndexArray);
  }, [batch])

  useEffect(() => {
    dispatch(updateIteration(0));
  }, [checkedLevels, dispatch])

  const returnNextWordForRandom = (): Word | null => {

    let nextWordObject: Word | null = null;
    let currentIndex: number;

    if (indexArray.length) {
      const allSame = indexArray.every(number => number === indexArray[0]);
      if (allSame) {
        currentIndex = indexArray[0];
        nextWordObject = indexArray.length === 1 ? finishWord : batch[currentIndex];
      } else {
        do {
          const randomNumber = Math.floor(Math.random() * indexArray.length);
          currentIndex = indexArray[randomNumber]
          nextWordObject = batch[currentIndex];
        } while (nextWordObject && displayWordObject && nextWordObject.word === displayWordObject.word);
      }

      const indexToRemove = indexArray.indexOf(currentIndex);
      if (indexToRemove !== -1) {
        setIndexArray(prevArray => [
          ...prevArray.slice(0, indexToRemove),
          ...prevArray.slice(indexToRemove + 1)
        ]);
      }

    } else {
      nextWordObject = finishWord;
    }

    return nextWordObject;
  }

  const isRandom = useAppSelector(state => state.word.isRandom);

  const returnNextDisplayWordObject = (iterate: boolean) => {
    if (batch.length === 0) return selectLevelWord;

    return isRandom ? returnNextWordForRandom() : returnNextWordForPractice(iterate);
  }; 

  return returnNextDisplayWordObject;
}

export default useReturnNextDisplayWordObject;