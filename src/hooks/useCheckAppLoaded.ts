"use client"

import storage from '@/storage';

import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { updateAppIsLoaded } from '@/store/loadingSlice';

const useCheckAppLoaded = () => {
  const dispatch = useAppDispatch();


  const words = useAppSelector(state => state.word.words);
  const levels = useAppSelector(state => state.appState.levels);
  const checkedLevels = useAppSelector(state => state.appState.checkedLevels);

  const wordResources = useAppSelector(state => state.language.wordResources);

  const appIsLoaded = useAppSelector(state => state.loading.appIsLoaded);
  const isUserDataLoaded = useAppSelector(state => state.userData.isUserDataLoaded);

  useEffect(() => {
    const storedCheckedLevels = storage.getItem('checkedLevels');

    const checkedLevelsBoolean = storedCheckedLevels.length ?
      checkedLevels.length ? true : false
      : true;
    const arrayBoolean = words.length && levels.length; 
    const objectBoolean = Object.keys(wordResources).length;

    if (!appIsLoaded && checkedLevelsBoolean && arrayBoolean && objectBoolean && isUserDataLoaded) {
      dispatch(updateAppIsLoaded(true));
    }
  }, [words, levels, checkedLevels, wordResources, isUserDataLoaded])
}

export default useCheckAppLoaded;