import { useAppDispatch, useAppSelector } from '@/store/store';
import { updateHiddenWordIds, updateCustomWordIds } from '@/store/userDataSlice';
import { useMainButtonsUtils } from '@/hooks';


const useHiddenCustomHandler = () => {

  const dispatch = useAppDispatch();
  const { handleNext } = useMainButtonsUtils();
  const displayWordObject = useAppSelector(state => state.word.displayWordObject);

  const handleHideWord = () => {
    if (!displayWordObject?.id) return;
    dispatch(updateHiddenWordIds({ updateType: 'add', id: displayWordObject.id }))
    handleNext(false);
  }

  const handleUnHideWordInSettings = (event: React.MouseEvent<HTMLButtonElement>) => {
    const wordId = event.currentTarget.getAttribute('data-info');
    if (wordId) {
      dispatch(updateHiddenWordIds({ updateType: 'remove', id: wordId }));
    } 
  }

  const handleAddWordToCustom = () => {
    if (!displayWordObject?.id) return;
    dispatch(updateCustomWordIds({ updateType: 'add', id: displayWordObject.id }));
    handleNext(false);
  }

  const handleRemoveWordFromCustomInSettings = (event: React.MouseEvent<HTMLButtonElement>) => {
    const wordId = event.currentTarget.getAttribute('data-info');
    if (wordId) {
      dispatch(updateCustomWordIds({ updateType: 'remove', id: wordId }));
    } 
  }

  return { handleHideWord, handleUnHideWordInSettings, handleAddWordToCustom, handleRemoveWordFromCustomInSettings };
}

export default useHiddenCustomHandler;