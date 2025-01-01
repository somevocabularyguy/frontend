import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Position } from '@/types';

interface UIState {
  contextMenuPosition: Position | null;
  isLevelsVisible: boolean;
  isSidebarOpen: boolean;
}

const initialState: UIState = {
  contextMenuPosition: null,
  isLevelsVisible: true,
  isSidebarOpen: false
} 

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    updateContextMenuPosition: (state, action: PayloadAction<Position | null>) => {
      state.contextMenuPosition = action.payload;
    },
    toggleIsLevelsVisible: (state, action: PayloadAction<boolean | undefined>) =>  {
      if (typeof action.payload === 'boolean') {
        state.isLevelsVisible = action.payload;
      } else {
        state.isLevelsVisible = !state.isLevelsVisible;
      }
    },
    toggleIsSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.isSidebarOpen = action.payload;
    }
  }
})

export const { updateContextMenuPosition, toggleIsLevelsVisible, toggleIsSidebarOpen } = uiSlice.actions;
export default uiSlice.reducer;