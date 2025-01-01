import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserSettingsState {
  isSignedIn: boolean;
  translateFrom: string;
  translateTo: string;
}

const initialState: UserSettingsState = {
  isSignedIn: true,
  translateFrom: 'en',
  translateTo: 'tr'
} 

const userSettingsSlice = createSlice({
  name: 'userSettings',
  initialState,
  reducers: {
    updateTranslateFrom: (state, action: PayloadAction<string>) => {
      state.translateFrom = action.payload;
    },
    updateTranslateTo: (state, action: PayloadAction<string>) => {
      state.translateTo = action.payload;
    },
    updateIsSignedIn: (state, action: PayloadAction<boolean>) => {
      state.isSignedIn = action.payload;
    }
  }
})

export const { updateIsSignedIn, updateTranslateTo } = userSettingsSlice.actions;
export default userSettingsSlice.reducer;


