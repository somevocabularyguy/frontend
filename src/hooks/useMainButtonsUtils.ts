import { useReturnNextDisplayWordObject, useKeepLog } from '@/hooks'; 

import { useAppSelector, useAppDispatch } from '@/store/store';
import { updateDisplayWordObject, updateIsShown } from '@/store/wordSlice';
import { addHiddenWordId, addCustomWordId, removeCustomWordId } from '@/store/userDataSlice';

const useMainButtonsUtils = () => {
  const dispatch = useAppDispatch();

  const returnNextDisplayWordObject = useReturnNextDisplayWordObject();
  const keepLog = useKeepLog();

  const isShown = useAppSelector(state => state.word.isShown);
  const displayWordObject = useAppSelector(state => state.word.displayWordObject);

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

  const handleHideWord = () => {
    if (!displayWordObject?.id) return;
    dispatch(addHiddenWordId(displayWordObject.id))
    handleNext(false);
  }

  const handleAddToCustom = () => {
    if (!displayWordObject?.id) return;
    dispatch(addCustomWordId(displayWordObject.id));
    handleNext(false);
  }

  const handleRemoveCustomWord = () => {
    if (!displayWordObject?.id) return;
    dispatch(removeCustomWordId(displayWordObject.id));
    handleNext(false);
  }

  return { handleNext, handleShow, handleHideWord, handleAddToCustom, handleRemoveCustomWord };
}

export default useMainButtonsUtils;