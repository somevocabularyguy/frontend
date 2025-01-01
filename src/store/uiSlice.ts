import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  isLevelsVisible: boolean;
  isSidebarOpen: boolean;
  isShadingVisible: boolean;
  isTransparentOverlayVisible: boolean;
}

const initialState: UIState = {
  isLevelsVisible: true,
  isSidebarOpen: false,
  isShadingVisible: false,
  isTransparentOverlayVisible: false
} 

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    updateIsLevelsVisible: (state, action: PayloadAction<boolean>) =>  {
      state.isLevelsVisible = action.payload
    },
    updateIsSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.isSidebarOpen = action.payload;
    },
    updateIsShadingVisible: (state, action: PayloadAction<boolean>) => {
      state.isShadingVisible = action.payload;
    },
    updateIsTransparentOverlayVisible: (state, action: PayloadAction<boolean>) => {
      state.isTransparentOverlayVisible = action.payload;
    },
  }
})

export const { updateIsLevelsVisible, updateIsSidebarOpen, updateIsShadingVisible, updateIsTransparentOverlayVisible } = uiSlice.actions;
export default uiSlice.reducer;