import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Word } from '@/types';
import wordsJson from '@/data/words.json';
const words: Word[] = wordsJson;

interface DataState {
  words: Word[];
  loading: boolean;
}

const initialState: DataState = {
  words: words,
  loading: true
} 

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    updateWords: (state, action: PayloadAction<Word[] | null>) => {
      if (!action.payload) return state;
      state.words = action.payload;
    },
    updateLoadingState: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    }
  }
})

export const { updateWords, updateLoadingState } = dataSlice.actions;
export default dataSlice.reducer;