
import { useAppSelector, useAppDispatch } from '@/store/store';
import { updateContextMenuPosition } from '@/store/uiSlice';


const useContextMenuUtils = () => {

  const contextMenuPosition = useAppSelector(state => state.ui.contextMenuPosition);
  const dispatch = useAppDispatch();

  const closeContextMenu = () => {
    if (contextMenuPosition) {
      dispatch(updateContextMenuPosition(null));
    }
  }

  return { closeContextMenu };
}

export default useContextMenuUtils;