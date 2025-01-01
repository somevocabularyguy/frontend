import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Word } from '@/types';

interface WordState {
  displayWordObject: Word | null,
  isRandom: boolean,
  isShown: boolean
}

const initialState: WordState = {
  displayWordObject: null,
  isRandom: false,
  isShown: false
} 

const wordSlice = createSlice({
  name: 'word',
  initialState,
  reducers: {
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

export const { updateDisplayWordObject, updateIsRandom, updateIsShown } = wordSlice.actions;
export default wordSlice.reducer;