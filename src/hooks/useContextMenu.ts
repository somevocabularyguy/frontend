import { useAppDispatch, useAppSelector } from '@/store/store';
import { updateContextMenuPosition } from '@/store/uiSlice';

const useContextMenu = () => {
  const dispatch = useAppDispatch();
  const displayWordObject = useAppSelector(state => state.word.displayWordObject);

  const handleContextMenu = (event: React.MouseEvent<HTMLElement>) => {
    if (displayWordObject?.id) {
      event.preventDefault();
      dispatch(updateContextMenuPosition({ x: event.pageX, y: event.pageY }));
    }
  };

  return handleContextMenu;
}

export default useContextMenu;
