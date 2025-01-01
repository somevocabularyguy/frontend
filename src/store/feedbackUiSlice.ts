import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FeedbackUiState {
  isFeedbackDropdownActive: boolean;
}

const initialState: FeedbackUiState = {
  isFeedbackDropdownActive: false
}

const feedbackUiSlice = createSlice({
  name: 'feedbackUi',
  initialState,
  reducers: {
    updateIsFeedbackDropdownActive: (state, action: PayloadAction<boolean>) => {
      state.isFeedbackDropdownActive = action.payload;
    }
  }
})

export const { updateIsFeedbackDropdownActive } = feedbackUiSlice.actions; 
export default feedbackUiSlice.reducer;