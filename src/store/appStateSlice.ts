import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Word, LevelObject } from '@/types';

interface AppStateState {
  batch: Word[];
  checkedLevels: string[];
  levels: LevelObject[];
  hoveredLevel: string | null;
  iteration: number;
}

const initialState: AppStateState = {
  batch: [],
  checkedLevels: [],
  levels: [],
  hoveredLevel: null,
  iteration: 0
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
      localStorage.setItem('checkedLevels', JSON.stringify(action.payload));
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
    updateHoveredLevel: (state, action: PayloadAction<string | null>) => {
      if (!action.payload && action.payload !== null) return state;
      state.hoveredLevel = action.payload;
    },
    updateIteration: (state, action: PayloadAction<number>) => {
      state.iteration = action.payload;
    }
  }
})

export const { updateBatch, updateCheckedLevels, updateLevels, updateHoveredLevel, updateIteration, updateLevel } = appStateSlice.actions; 
export default appStateSlice.reducer;