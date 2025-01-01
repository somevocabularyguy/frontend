import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LanguageUiState {
  isLanguageLoading: boolean;
  isLanguagesVisible: boolean;
  isLanguageDropdownVisible: boolean;
  isWordsLanguageSelectVisible: boolean;
  isOtherLanguagesSelectVisible: boolean;
}

const initialState: LanguageUiState = {
  isLanguageLoading: false,
  isLanguagesVisible: false,
  isLanguageDropdownVisible: false,
  isWordsLanguageSelectVisible: false,
  isOtherLanguagesSelectVisible: true
}

const languageUiSlice = createSlice({
  name: 'languageUi',
  initialState,
  reducers: {
    updateIsLanguagesLoading: (state, action: PayloadAction<boolean>) => {
      state.isLanguageLoading = action.payload;
    },
    updateIsLanguagesVisible: (state, action: PayloadAction<boolean>) => {
      state.isLanguagesVisible = action.payload;
    },
    updateIsLanguageDropdownVisible: (state, action: PayloadAction<boolean>) => {
      state.isLanguageDropdownVisible = action.payload;
    },
    updateIsWordsLanguageSelectVisible: (state, action: PayloadAction<boolean>) => {
      state.isWordsLanguageSelectVisible = action.payload;
    },
    updateIsOtherLanguagesSelectVisible: (state, action: PayloadAction<boolean>) => {
      state.isOtherLanguagesSelectVisible = action.payload;
    }
  }
})

export const { 
  updateIsLanguagesLoading, 
  updateIsLanguagesVisible, 
  updateIsLanguageDropdownVisible, 
  updateIsWordsLanguageSelectVisible, 
  updateIsOtherLanguagesSelectVisible 
} = languageUiSlice.actions; 
export default languageUiSlice.reducer;