import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import dataReducer from './dataSlice';
import userDataReducer from './userDataSlice';
import uiReducer from './uiSlice';
import wordReducer from './wordSlice';
import appStateReducer from './appStateSlice';
import userSettingsSlice from './userSettingsSlice';
import settingsUiSlice from './settingsUiSlice';
import accountUiSlice from './accountUiSlice';
import feedbackUiSlice from './feedbackUiSlice';

const store = configureStore({
  reducer: {
    data: dataReducer,
    userData: userDataReducer,
    ui: uiReducer,
    word: wordReducer,
    appState: appStateReducer,
    userSettings: userSettingsSlice,
    settingsUi: settingsUiSlice,
    accountUi: accountUiSlice,
    feedbackUi: feedbackUiSlice
  }
})

type AppDispatch = typeof store.dispatch;
type RootState = ReturnType<typeof store.getState>

const useAppDispatch: () => AppDispatch = useDispatch;
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type { AppDispatch, RootState };
export { store, useAppDispatch, useAppSelector};