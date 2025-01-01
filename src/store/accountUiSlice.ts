import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AccountUiState {
  isSignInPopupActive: boolean;
  isSignOutPopupActive: boolean;
  isDeletePopupActive: boolean;
}

const initialState: AccountUiState = {
  isSignInPopupActive: false,
  isSignOutPopupActive: false,
  isDeletePopupActive: false
}

const accountUiSlice = createSlice({
  name: 'accountUi',
  initialState,
  reducers: {
    updateIsSignInPopupActive: (state, action: PayloadAction<boolean>) => {
      state.isSignInPopupActive = action.payload;
    },
    updateIsSignOutPopupActive: (state, action: PayloadAction<boolean>) => {
      state.isSignOutPopupActive = action.payload;
    },
    updateIsDeletePopupActive: (state, action: PayloadAction<boolean>) => {
      state.isDeletePopupActive = action.payload;
    }
  }
})

export const { updateIsSignInPopupActive, updateIsSignOutPopupActive, updateIsDeletePopupActive } = accountUiSlice.actions; 
export default accountUiSlice.reducer;