import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LanguageUiState {
  isLanguageDropdownActive: boolean;
}

const initialState: LanguageUiState = {
  isLanguageDropdownActive: false
}

const languageUiSlice = createSlice({
  name: 'languageUi',
  initialState,
  reducers: {
    updateIsLanguageDropdownActive: (state, action: PayloadAction<boolean>) => {
      state.isLanguageDropdownActive = action.payload;
    }
  }
})

export const { updateIsLanguageDropdownActive } = languageUiSlice.actions; 
export default languageUiSlice.reducer;