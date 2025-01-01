import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoadingState {
  isLoading: boolean;
  isAppLoaded: boolean;
}

const initialState: LoadingState = {
  isLoading: true,
  isAppLoaded: false
} 

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    updateIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    updateIsAppLoaded: (state, action: PayloadAction<true>) => {
      state.isAppLoaded = action.payload;
    }
  }
})

export const { updateIsLoading, updateIsAppLoaded } = loadingSlice.actions;
export default loadingSlice.reducer;