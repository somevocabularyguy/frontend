import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserSettingsState {
  isSignedIn: boolean;
  namespaceArray: string[];
}

const initialState: UserSettingsState = {
  isSignedIn: false,
  namespaceArray: ['en', 'ru']
} 

const userSettingsSlice = createSlice({
  name: 'userSettings',
  initialState,
  reducers: {
    updateIsSignedIn: (state, action: PayloadAction<boolean>) => {
      state.isSignedIn = action.payload;
    },
    updateNamespaceArray: (state, action: PayloadAction<string[]>) => {
      state.namespaceArray = action.payload;
    }
  }
})

export const { updateIsSignedIn, updateNamespaceArray } = userSettingsSlice.actions;
export default userSettingsSlice.reducer;


