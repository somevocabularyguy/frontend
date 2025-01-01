import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import loadingReducer from './loadingSlice';
import userDataReducer from './userDataSlice';
import uiReducer from './uiSlice';
import wordReducer from './wordSlice';
import appStateReducer from './appStateSlice';
import userSettingsSlice from './userSettingsSlice';
import settingsUiSlice from './settingsUiSlice';
import accountUiSlice from './accountUiSlice';
import feedbackSlice from './feedbackSlice';
import feedbackUiSlice from './feedbackUiSlice';
import languageUiSlice from './languageUiSlice';
import languageSlice from './languageSlice';

const store = configureStore({
  reducer: {
    loading: loadingReducer,
    userData: userDataReducer,
    ui: uiReducer,
    word: wordReducer,
    appState: appStateReducer,
    userSettings: userSettingsSlice,
    settingsUi: settingsUiSlice,
    accountUi: accountUiSlice,
    feedback: feedbackSlice,
    feedbackUi: feedbackUiSlice,
    languageUi: languageUiSlice,
    language: languageSlice
  }
})

type AppDispatch = typeof store.dispatch;
type RootState = ReturnType<typeof store.getState>

const useAppDispatch: () => AppDispatch = useDispatch;
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type { AppDispatch, RootState };
export { store, useAppDispatch, useAppSelector};