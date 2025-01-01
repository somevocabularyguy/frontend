    
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserData, WordData } from '@/types';
import { defaultUserData } from '@/constants';

interface UserDataState {
  userData: UserData;
}

interface hiddenCustomObject {
  updateType: string;
  id: string;
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
      localStorage.setItem('userData', JSON.stringify(state.userData))
    },
    updateUserUseTime: (state, action: PayloadAction<number>) => {
      if (!action.payload) return state;
      state.userData.totalUseTime = action.payload;
      localStorage.setItem('userData', JSON.stringify(state.userData))
    },
    updateWordData: (state, action: PayloadAction<WordData>) => {
      if (!action.payload) return state;
      const index = state.userData.wordsData.findIndex(wordData => wordData.id === action.payload.id);
      if (index === -1) {
        state.userData.wordsData.push(action.payload);
      } else {
        state.userData.wordsData[index] = action.payload;
      }
      localStorage.setItem('userData', JSON.stringify(state.userData))
    },
    updateHiddenWordIds: (state, action: PayloadAction<hiddenCustomObject>) => {
      switch (action.payload.updateType) {
        case 'clear':
          state.userData.hiddenWordIds = [];
          localStorage.setItem('userData', JSON.stringify(state.userData))
          break;
        case 'add':
          if (!state.userData.hiddenWordIds.includes(action.payload.id)) {
            state.userData.hiddenWordIds.push(action.payload.id);
            localStorage.setItem('userData', JSON.stringify(state.userData))
          }
          break;
        case 'remove':
          state.userData.hiddenWordIds = state.userData.hiddenWordIds.filter(id => id !== action.payload.id);
          localStorage.setItem('userData', JSON.stringify(state.userData))
          break;
        default: 
          return state;
      }
    },
    updateCustomWordIds: (state, action: PayloadAction<hiddenCustomObject>) => {
      switch (action.payload.updateType) {
        case 'clear':
          state.userData.customWordIds = [];
          localStorage.setItem('userData', JSON.stringify(state.userData))
          break;
        case 'add':
          if (!state.userData.customWordIds.includes(action.payload.id)) {
            state.userData.customWordIds.push(action.payload.id);
            localStorage.setItem('userData', JSON.stringify(state.userData))
          }
          break;
        case 'remove':
          state.userData.customWordIds = state.userData.customWordIds.filter(id => id !== action.payload.id);
          localStorage.setItem('userData', JSON.stringify(state.userData))
          break;
        default: 
          return state;
      }
    }
  }
})

export const { updateUserData, updateHiddenWordIds, updateCustomWordIds, updateUserUseTime, updateWordData } = userDataSlice.actions;
export default userDataSlice.reducer;


