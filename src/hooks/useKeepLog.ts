import { useState } from 'react';
import { Word } from '@/types';

import { updateSingleWordData } from '@/utils/keepLogUtils';
import useUpdateSingleLevel from './useUpdateSingleLevel';

import { useAppDispatch, useAppSelector } from '@/store/store';
import { updateUserUseTime, updateWordData } from '@/store/userDataSlice';

const useKeepLog = (): () => void => {
  const dispatch = useAppDispatch();
  const updateSingleLevel = useUpdateSingleLevel();

  const [lastDisplayWordObject, setLastDisplayWordObject] = useState<Word | null>(null);
  const [lastIsShown, setLastIsShown] = useState<boolean | null>(null);
  const [timeStamp, setTimeStamp] = useState<number | null>(null);

  const displayWordObject = useAppSelector(state => state.word.displayWordObject);
  const isShown = useAppSelector(state => state.word.isShown);
  const userData = useAppSelector(state => state.userData.userData);

  const keepLog = (isTimerEnded: boolean) => {

    if (!displayWordObject?.id) return;
    if (lastIsShown === true && isShown === true && !isTimerEnded) return;

    setLastDisplayWordObject(displayWordObject);
    setLastIsShown(isShown);

    const currentTime = new Date().getTime();
    setTimeStamp(currentTime);

    if (!lastDisplayWordObject || lastIsShown === null) return;

    let elapsed: number;
    let wordObject: Word;

    if (isTimerEnded) {
      wordObject = displayWordObject;
      elapsed = 5000;
      setTimeStamp(null);
    } else if (timeStamp) {
      wordObject = lastDisplayWordObject;
      elapsed = new Date().getTime() - timeStamp;
    } else {
      return;
    }

    if (elapsed > 500) {
      const newWordData = updateSingleWordData(wordObject, lastIsShown, elapsed, userData);
      dispatch(updateUserUseTime(userData.totalUseTime + elapsed))
      dispatch(updateWordData(newWordData))
    }

    updateSingleLevel(wordObject.levelName)
  }

  let timer1: NodeJS.Timeout | undefined;
  const callKeepLog = () => {
    if (timer1) {
      clearTimeout(timer1);
    }
    timer1 = setTimeout(() => {
      keepLog(true);
    }, 5000)
    keepLog(false);
  }

  return callKeepLog;
};

export default useKeepLog;
