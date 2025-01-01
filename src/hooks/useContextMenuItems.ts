import { useAppSelector } from '@/store/store';
import { useHiddenCustomHandler } from '@/hooks';

const useContextMenuItems = () => {

  const displayWordObject = useAppSelector(state => state.word.displayWordObject);

  const { handleHideWord, handleAddWordToCustom } = useHiddenCustomHandler();

  if (!displayWordObject) return

  const contextMenuItems = [
    { label: 'Hide Word', onClick: handleHideWord },
    { label: 'Add To Custom', onClick: handleAddWordToCustom },
  ];

  return contextMenuItems;
}

export default useContextMenuItems;