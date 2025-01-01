import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Word } from '@/types';

interface WordState {
  words: Word[];
  displayWordObject: Word | null,
  isRandom: boolean,
  isShown: boolean
}

const initialState: WordState = {
  words: [],
  displayWordObject: null,
  isRandom: false,
  isShown: false
} 

const wordSlice = createSlice({
  name: 'word',
  initialState,
  reducers: {
    updateWords: (state, action: PayloadAction<Word[] | null>) => {
      if (!action.payload) return state;
      state.words = action.payload;
    },
    updateDisplayWordObject: (state, action: PayloadAction<Word | null>) => {
      state.displayWordObject = action.payload;
    },
    updateIsRandom: (state, action: PayloadAction<boolean>) => {
      state.isRandom = action.payload;
    },
    updateIsShown: (state, action: PayloadAction<boolean>) => {
      if (!action.payload && action.payload !== false) return state;
      state.isShown = action.payload;
    }
  }
})

export const { updateWords, updateDisplayWordObject, updateIsRandom, updateIsShown } = wordSlice.actions;
export default wordSlice.reducer;