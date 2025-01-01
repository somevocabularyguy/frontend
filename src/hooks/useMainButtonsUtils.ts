import useReturnNextDisplayWordObject from './useReturnNextDisplayWordObject'; 
import useKeepLog from './useKeepLog'; 

import { useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '@/store/store';
import { updateDisplayWordObject, updateIsShown } from '@/store/wordSlice';
import { addHiddenWordId, addCustomWordId, removeCustomWordId } from '@/store/userDataSlice';

const useMainButtonsUtils = () => {
  const dispatch = useAppDispatch();

  const returnNextDisplayWordObject = useReturnNextDisplayWordObject();
  const callKeepLog = useKeepLog();

  const isShown = useAppSelector(state => state.word.isShown);
  const displayWordObject = useAppSelector(state => state.word.displayWordObject);

  const handleNext = (iterate: boolean = true) => {
    const nextDisplayWordObject = returnNextDisplayWordObject(iterate);
    if (isShown) {
      dispatch(updateIsShown(false));
    }
    dispatch(updateDisplayWordObject(nextDisplayWordObject));
    if (iterate) {
      callKeepLog()
    }
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
  }

  const handleAddToCustom = () => {
    if (!displayWordObject?.id) return;
    dispatch(addCustomWordId(displayWordObject.id));
  }

  const handleRemoveCustomWord = () => {
    if (!displayWordObject?.id) return;
    dispatch(removeCustomWordId(displayWordObject.id));
  }

  useEffect(() => {
    return () => {
      dispatch(updateDisplayWordObject(null));
      dispatch(updateIsShown(false));
    }
  }, [])

  return { handleNext, handleShow, handleHideWord, handleAddToCustom, handleRemoveCustomWord };
}

export default useMainButtonsUtils;