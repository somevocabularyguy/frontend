    
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserData, WordData } from '@/types';
import { defaultUserData } from '@/constants';
import storage from '@/storage';

interface UserDataState {
  userData: UserData;
}

const initialState: UserDataState = {
  userData: defaultUserData
} 

const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    updateUserData: (state, action: PayloadAction<UserData>) => {
      if (!action.payload) return state;
      state.userData = action.payload;
      storage.setItem('userData', state.userData)
    },
    updateUserUseTime: (state, action: PayloadAction<number>) => {
      if (!action.payload) return state;
      state.userData.totalUseTime = action.payload;
      storage.setItem('userData', state.userData)
    },
    updateWordData: (state, action: PayloadAction<WordData>) => {
      if (!action.payload) return state;
      const index = state.userData.wordsData.findIndex(wordData => wordData.id === action.payload.id);
      if (index === -1) {
        state.userData.wordsData.push(action.payload);
      } else {
        state.userData.wordsData[index] = action.payload;
      }
      storage.setItem('userData', state.userData)
    },

    updateHiddenWordIds: (state, action: PayloadAction<string[]>) => {
      state.userData.hiddenWordIds = action.payload;
      storage.setItem('userData', state.userData)
    },
    addHiddenWordId: (state, action: PayloadAction<string>) => {
      state.userData.hiddenWordIds.push(action.payload);
      storage.setItem('userData', state.userData)
    },
    removeHiddenWordId: (state, action: PayloadAction<string>) => {
      state.userData.hiddenWordIds = state.userData.hiddenWordIds.filter(id => id !== action.payload);
      storage.setItem('userData', state.userData)
    },

    updateCustomWordIds: (state, action: PayloadAction<string[]>) => {
      state.userData.customWordIds = action.payload;
      storage.setItem('userData', state.userData)
    },
    addCustomWordId: (state, action: PayloadAction<string>) => {
      state.userData.customWordIds.push(action.payload);
      storage.setItem('userData', state.userData)
    },
    removeCustomWordId: (state, action: PayloadAction<string>) => {
      state.userData.customWordIds = state.userData.customWordIds.filter(id => id !== action.payload);
      storage.setItem('userData', state.userData)
    }
  }
})

export const { updateUserData, updateHiddenWordIds, updateCustomWordIds, updateUserUseTime, updateWordData, addHiddenWordId, removeHiddenWordId, addCustomWordId, removeCustomWordId } = userDataSlice.actions;
export default userDataSlice.reducer;


