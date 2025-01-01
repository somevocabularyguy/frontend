import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoadingState {
  isLoading: boolean;
  appIsLoaded: boolean;
}

const initialState: LoadingState = {
  isLoading: true,
  appIsLoaded: false
} 

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    updateLoadingState: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    updateAppIsLoaded: (state, action: PayloadAction<true>) => {
      state.appIsLoaded = action.payload;
    }
  }
})

export const { updateLoadingState, updateAppIsLoaded } = loadingSlice.actions;
export default loadingSlice.reducer;