import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OptionObject } from '@/types';

interface FeedbackState {
  feedbackText: string;
  imageUrls: string[];
  isSended: boolean;
  selectedTypeObject: OptionObject;
}

const initialState: FeedbackState = {
  feedbackText: '',
  imageUrls: [],
  isSended: false,
  selectedTypeObject: { key: '', text: '-- Select Feedback Type --' } //* Will
}

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
    updateSelectedTypeObject: (state, action: PayloadAction<OptionObject>) => {
      state.selectedTypeObject = action.payload;
    },
    updateFeedbackText: (state, action: PayloadAction<string>) => {
      state.feedbackText = action.payload;
    },
    updateImageUrls: (state, action: PayloadAction<string[]>) => {
      state.imageUrls = action.payload;
    },
    updateIsSended: (state, action: PayloadAction<boolean>) => {
      state.isSended = action.payload;
    },
  }
})

export const { updateSelectedTypeObject, updateFeedbackText, updateImageUrls, updateIsSended } = feedbackSlice.actions; 
export default feedbackSlice.reducer;