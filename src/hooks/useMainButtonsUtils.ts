import { useReturnNextDisplayWordObject, useKeepLog } from '@/hooks'; 

import { useAppSelector, useAppDispatch } from '@/store/store';
import { updateDisplayWordObject, updateIsShown } from '@/store/wordSlice';

const useMainButtonsUtils = () => {
  const dispatch = useAppDispatch();

  const returnNextDisplayWordObject = useReturnNextDisplayWordObject();
  const keepLog = useKeepLog();

  const isShown = useAppSelector(state => state.word.isShown);

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

  const handleNext = (iterate: boolean = true) => {
    const nextDisplayWordObject = returnNextDisplayWordObject(iterate);
    if (isShown) {
      dispatch(updateIsShown(false));
    }
    dispatch(updateDisplayWordObject(nextDisplayWordObject));
    callKeepLog()
  }

  const handleShow = () => {
    if (!isShown) {
      dispatch(updateIsShown(true));
    }
    callKeepLog()
  }

  return { handleNext, handleShow };
}

export default useMainButtonsUtils;