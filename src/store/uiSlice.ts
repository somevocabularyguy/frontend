import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  isLevelsVisible: boolean;
  isSidebarVisible: boolean;
  isShadingVisible: boolean;
  isTransparentOverlayVisible: boolean;
}

const initialState: UIState = {
  isLevelsVisible: true,
  isSidebarVisible: false,
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
    updateIsSidebarVisible: (state, action: PayloadAction<boolean>) => {
      state.isSidebarVisible = action.payload;
    },
    updateIsShadingVisible: (state, action: PayloadAction<boolean>) => {
      state.isShadingVisible = action.payload;
    },
    updateIsTransparentOverlayVisible: (state, action: PayloadAction<boolean>) => {
      state.isTransparentOverlayVisible = action.payload;
    },
  }
})

export const { updateIsLevelsVisible, updateIsSidebarVisible, updateIsShadingVisible, updateIsTransparentOverlayVisible } = uiSlice.actions;
export default uiSlice.reducer;