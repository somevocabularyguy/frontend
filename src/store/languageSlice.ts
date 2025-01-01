import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WordResources } from '@/types';

interface LanguageResourcesState {
  wordResources: WordResources;
}

const initialState: LanguageResourcesState = {
  wordResources: {},
} 

const languageResourcesSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    updateWordResources: (state, action: PayloadAction<WordResources>) => {
      if (!action.payload) return state;
      state.wordResources = action.payload;
    },
  }
})

export const { updateWordResources } = languageResourcesSlice.actions;
export default languageResourcesSlice.reducer;