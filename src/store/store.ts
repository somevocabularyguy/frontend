import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import uiReducer from './uiSlice';
import wordReducer from './wordSlice';
import loadingReducer from './loadingSlice';
import userDataReducer from './userDataSlice';
import feedbackReducer from './feedbackSlice';
import languageReducer from './languageSlice';
import appStateReducer from './appStateSlice';
import accountUiReducer from './accountUiSlice';
import settingsUiReducer from './settingsUiSlice';
import feedbackUiReducer from './feedbackUiSlice';
import languageUiReducer from './languageUiSlice';
import progressUiReducer from './progressUiSlice';
import userSettingsReducer from './userSettingsSlice';

const store = configureStore({
  reducer: {
    ui: uiReducer,
    word: wordReducer,
    loading: loadingReducer,
    userData: userDataReducer,
    feedback: feedbackReducer,
    language: languageReducer,
    appState: appStateReducer,
    accountUi: accountUiReducer,
    settingsUi: settingsUiReducer,
    feedbackUi: feedbackUiReducer,
    languageUi: languageUiReducer,
    progressUi: progressUiReducer,
    userSettings: userSettingsReducer,
  }
})

type AppDispatch = typeof store.dispatch;
type RootState = ReturnType<typeof store.getState>

const useAppDispatch: () => AppDispatch = useDispatch;
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type { AppDispatch, RootState };
export { store, useAppDispatch, useAppSelector};