import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AccountUiState {
  isSignInPopupVisible: boolean;
  isSignOutPopupVisible: boolean;
  isDeletePopupVisible: boolean;
  isWaitingVerify: boolean;
}

const initialState: AccountUiState = {
  isSignInPopupVisible: false,
  isSignOutPopupVisible: false,
  isDeletePopupVisible: false,
  isWaitingVerify: false
}

const accountUiSlice = createSlice({
  name: 'accountUi',
  initialState,
  reducers: {
    updateIsSignInPopupVisible: (state, action: PayloadAction<boolean>) => {
      state.isSignInPopupVisible = action.payload;
    },
    updateIsSignOutPopupVisible: (state, action: PayloadAction<boolean>) => {
      state.isSignOutPopupVisible = action.payload;
    },
    updateIsDeletePopupVisible: (state, action: PayloadAction<boolean>) => {
      state.isDeletePopupVisible = action.payload;
    },
    updateIsWaitingVerify: (state, action: PayloadAction<boolean>) => {
      state.isWaitingVerify = action.payload;
    }
  }
})

export const { updateIsSignInPopupVisible, updateIsSignOutPopupVisible, updateIsDeletePopupVisible, updateIsWaitingVerify } = accountUiSlice.actions; 
export default accountUiSlice.reducer;