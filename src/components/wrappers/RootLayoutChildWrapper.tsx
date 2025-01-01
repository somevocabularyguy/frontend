"use client";

import storage from '@/storage';
import { useState, useEffect } from 'react';
import { UserData, Word, WordResources } from '@/types';

import { updateWords } from '@/store/wordSlice';
import { updateIsSignedIn } from '@/store/userSettingsSlice';
import { updateDisplayWordObject } from '@/store/wordSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { updateUserData, updateLanguageArray } from '@/store/userDataSlice';
import { updateWordResources } from '@/store/languageSlice';
import { updateLevels, updateCheckedLevels, updateBatch, updateIteration } from '@/store/appStateSlice';

import { createLevels } from '@/utils/levelUtils';
import { returnUserData } from '@/utils/userDataUtils';
import { groupWordsByLevel } from '@/utils/wordUtils';

import { useMainButtonsUtils, useCheckAppLoaded } from '@/hooks';

import { Shading } from '@/components/overlays';
import { LanguageDropdown } from '@/components/Language';
import { SignInPopup, SignOutPopup, DeletePopup } from '@/components/Popups';

import Sidebar from '@/components/Sidebar';
import Loading from '@/components/Loading';

interface RootLayoutChildWrapperProps {
  children: React.ReactNode;
  serverUserData: UserData | null;
  signedInFlag: boolean;
  initialWords: Word[];
  wordResources: WordResources;
  languageArray: string[];
}

const RootLayoutChildWrapper: React.FC<RootLayoutChildWrapperProps> = ({ 
  children, 
  serverUserData, 
  signedInFlag,
  initialWords,
  wordResources,
  languageArray
}) => {
  useCheckAppLoaded();

  const dispatch = useAppDispatch();
  const { handleNext } = useMainButtonsUtils();

  useEffect(() => {
    const storedUserData = storage.getItem('userData');
    const updatedUserData = returnUserData(storedUserData, serverUserData);
    dispatch(updateUserData(updatedUserData));

    const groupedWords = groupWordsByLevel(initialWords, updatedUserData.hiddenWordIds, updatedUserData.customWordIds);
    const levels = createLevels(groupedWords, updatedUserData.wordsData);

    const storedCheckedLevels = storage.getItem('checkedLevels');
    const checkedLevelsSet = new Set(storedCheckedLevels);
    const newBatch: Word[] = groupedWords.filter(wordObject => checkedLevelsSet.has(wordObject.levelName));

    dispatch(updateLevels(levels));
    dispatch(updateBatch(newBatch));
    dispatch(updateWords(groupedWords));
    dispatch(updateIsSignedIn(signedInFlag));
    dispatch(updateWordResources(wordResources));
    dispatch(updateLanguageArray(languageArray));
    dispatch(updateCheckedLevels(storedCheckedLevels));
  }, [])

  /*-----------------------------------------------------------------------*/

  const appIsLoaded = useAppSelector(state => state.loading.appIsLoaded);

  const words = useAppSelector(state => state.word.words);
  const batch = useAppSelector(state => state.appState.batch);
  const isRandom = useAppSelector(state => state.word.isRandom);
  const userData = useAppSelector(state => state.userData.userData);
  const checkedLevels = useAppSelector(state => state.appState.checkedLevels);

  const [handleNextFlag, setHandleNextFlag] = useState(false);

  useEffect(() => {
    if (appIsLoaded) {
      const groupedWords = groupWordsByLevel(words, userData.hiddenWordIds, userData.customWordIds);
      const levels = createLevels(groupedWords, userData.wordsData);
      dispatch(updateWords(groupedWords));
      dispatch(updateLevels(levels));
      setHandleNextFlag(true);
    }
  }, [userData.hiddenWordIds, userData.customWordIds, dispatch])

  useEffect(() => {
    if (handleNextFlag) {
      handleNext(false);
      setHandleNextFlag(false);
    }
  }, [batch])

  useEffect(() => {
    if (appIsLoaded) {
      dispatch(updateIteration(-1));
      dispatch(updateDisplayWordObject(null));
    }
  }, [checkedLevels, isRandom, dispatch])

  useEffect(() => {
    if (appIsLoaded) {
      const checkedLevelsSet = new Set(checkedLevels);
      const newBatch: Word[] = words.filter(wordObject => checkedLevelsSet.has(wordObject.levelName));
      dispatch(updateBatch(newBatch));
    }
  }, [checkedLevels, words, dispatch])

  return (
    <>
      {/* <Loading /> */}
      <Sidebar />
      <Shading />
      <SignInPopup />
      <SignOutPopup />
      <DeletePopup />
      <LanguageDropdown />
      {children}
    </>
  )
}

export default RootLayoutChildWrapper;