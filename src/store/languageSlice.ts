import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WordsObject, WordResources } from '@/types';

interface LanguageState {
  wordResources: WordResources;
}

const initialState: LanguageState = {
  wordResources: {},
} 

interface UpdateOneResourceType {
  language: string;
  wordResource: WordsObject;
}

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    updateWordResources: (state, action: PayloadAction<WordResources>) => {
      if (!action.payload) return state;
      state.wordResources = action.payload;
    },
    addSingleWordResource: (state, action: PayloadAction<UpdateOneResourceType>) => {
      if (!action.payload) return state;
      const { language, wordResource } = action.payload;
      state.wordResources[language] = wordResource;
    },
    removeSingleWordResource: (state, action: PayloadAction<string>) => {
      if (!action.payload) return state;
      const language = action.payload;
      delete state.wordResources[language];
    },
  }
})

export const { updateWordResources, addSingleWordResource, removeSingleWordResource } = languageSlice.actions;
export default languageSlice.reducer;