import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProgressUiState {
  isProgressDeletePopupVisible: boolean;
}

const initialState: ProgressUiState = {
  isProgressDeletePopupVisible: false
}

const progressUiSlice = createSlice({
  name: 'progressUi',
  initialState,
  reducers: {
    updateIsProgressDeletePopupVisible: (state, action: PayloadAction<boolean>) => {
      state.isProgressDeletePopupVisible = action.payload;
    }
  }
})

export const { updateIsProgressDeletePopupVisible } = progressUiSlice.actions; 
export default progressUiSlice.reducer;