import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsUiState {
  isHiddenCustomSettingsVisible: boolean;
  isAccountSettingsVisible: boolean;
}

const initialState: SettingsUiState = {
  isHiddenCustomSettingsVisible: false,
  isAccountSettingsVisible: false
}

const settingsUiSlice = createSlice({
  name: 'settingsUi',
  initialState,
  reducers: {
    updateIsHiddenCustomSettingsVisible: (state, action: PayloadAction<boolean>) => {
      state.isHiddenCustomSettingsVisible = action.payload;
    },
    updateIsAccountSettingsVisible: (state, action: PayloadAction<boolean>) => {
      state.isAccountSettingsVisible = action.payload;
    }
  }
})

export const { updateIsHiddenCustomSettingsVisible, updateIsAccountSettingsVisible } = settingsUiSlice.actions; 
export default settingsUiSlice.reducer;