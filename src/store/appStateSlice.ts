import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Word, LevelObject } from '@/types';
import storage from '@/storage';

interface AppStateState {
  batch: Word[];
  checkedLevels: string[];
  levels: LevelObject[];
  hoveredLevelObject: LevelObject | null;
  iteration: number;
  handleNextFlag: boolean;
}

const initialState: AppStateState = {
  batch: [],
  checkedLevels: [],
  levels: [],
  hoveredLevelObject: null,
  iteration: -1,
  handleNextFlag: false
}

const appStateSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    updateBatch: (state, action: PayloadAction<Word[]>) => {
      if (!action.payload) return state;
      state.batch = action.payload;
    },
    updateCheckedLevels: (state, action: PayloadAction<string[]>) => {
      if (!action.payload) return state;
      state.checkedLevels = action.payload;
      storage.setItem('checkedLevels', action.payload);
    },
    addCheckedLevel: (state, action: PayloadAction<string>) => {
      if (!action.payload) return state;
      state.checkedLevels = [...state.checkedLevels, action.payload];
      storage.setItem('checkedLevels', state.checkedLevels);
    },
    removeCheckedLevel: (state, action: PayloadAction<string>) => {
      if (!action.payload) return state;
      state.checkedLevels = state.checkedLevels.filter(level => level !== action.payload);
      storage.setItem('checkedLevels', state.checkedLevels);
    },
    updateLevels: (state, action: PayloadAction<LevelObject[]>) => {
      if (!action.payload) return state;
      state.levels = action.payload;
    },
    updateLevel: (state, action: PayloadAction<LevelObject>) => {
      if (!action.payload) return state;
      const index = state.levels.findIndex(level => level.levelName === action.payload.levelName);
      if (index !== -1) {
        state.levels[index] = action.payload;
      }
    },
    updateHoveredLevelObject: (state, action: PayloadAction<LevelObject | null>) => {
      if (!action.payload && action.payload !== null) return state;
      state.hoveredLevelObject = action.payload;
    },
    updateIteration: (state, action: PayloadAction<number>) => {
      state.iteration = action.payload;
    },
    updateHandleNextFlag: (state, action: PayloadAction<boolean>) => {
      state.handleNextFlag = action.payload;
    }
  }
})

export const { updateBatch, updateCheckedLevels, updateLevels, updateHoveredLevelObject, updateIteration, updateLevel, addCheckedLevel, removeCheckedLevel, updateHandleNextFlag } = appStateSlice.actions; 
export default appStateSlice.reducer;