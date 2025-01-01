"use client";

import storage from '@/storage';
import { useState, useEffect } from 'react';
import { UserData, Word, WordResources } from '@/types';

import { updateWords } from '@/store/wordSlice';
import { updateIsLoading } from '@/store/loadingSlice';

import { updateUserData } from '@/store/userDataSlice';
import { updateIsSignedIn } from '@/store/userSettingsSlice';
import { updateWordResources } from '@/store/languageSlice';
import { updateIsWaitingVerify } from '@/store/accountUiSlice';
import { updateDisplayWordObject } from '@/store/wordSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { updateLevels, updateCheckedLevels, updateBatch, updateIteration } from '@/store/appStateSlice';

import { createLevels } from '@/utils/levelUtils';
import { returnUserData } from '@/utils/userDataUtils';
import { groupWordsByLevel } from '@/utils/wordUtils';

import { verifySignIn } from '@/lib/api';
import { useMainButtonsUtils, useCheckAppLoaded } from '@/hooks';

import { Shading } from '@/components/overlays';
import { LanguageDropdown } from '@/components/Language';
import { SignInPopup, SignOutPopup, DeletePopup } from '@/components/Popups';

import Sidebar from '@/components/Sidebar';
import Loading from '@/components/Loading';

interface RootLayoutChildWrapperProps {
  children: React.ReactNode;
  serverUserData: UserData | null;
  signedInFlag: string | boolean;
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

  const isAppLoaded = useAppSelector(state => state.loading.isAppLoaded);
  const isLoading = useAppSelector(state => state.loading.isLoading);

  useEffect(() => {
    if (isLoading) dispatch(updateIsLoading(false));
    const loadData = async () => {
      if (signedInFlag === 'waiting') {
        dispatch(updateIsWaitingVerify(true));
        storage.setItem('waitingVerify', true);
      }
      const waitingVerify = storage.getItem('waitingVerify');
      let isSignInVerified: boolean | null = null;
      if (waitingVerify) {
        const response = await verifySignIn();
        console.log("🚀 ~ file: RootLayoutChildWrapper.tsx:68 ~ response:", response);
        if (response === 'verified') {
          dispatch(updateIsWaitingVerify(false));
          storage.removeItem('waitingVerify');
          isSignInVerified = true;
        } else if (response === 'not-verified') {
          console.log(response);
        } else if (response === 'expired') {
          dispatch(updateIsWaitingVerify(false));
          storage.removeItem('waitingVerify');
        }
      }

      const storedUserData = storage.getItem('userData');
      const updatedUserData = returnUserData(storedUserData, serverUserData, languageArray);

      const groupedWords = groupWordsByLevel(initialWords, updatedUserData.hiddenWordIds, updatedUserData.customWordIds);
      const levels = createLevels(groupedWords, updatedUserData.wordsData);

      const storedCheckedLevels = storage.getItem('checkedLevels');
      const checkedLevelsSet = new Set(storedCheckedLevels);
      const newBatch: Word[] = groupedWords.filter(wordObject => checkedLevelsSet.has(wordObject.levelName));

      dispatch(updateIsLoading(false));
      dispatch(updateLevels(levels));
      dispatch(updateBatch(newBatch));
      dispatch(updateWords(groupedWords));
      dispatch(updateUserData(updatedUserData));
      dispatch(updateWordResources(wordResources));
      dispatch(updateCheckedLevels(storedCheckedLevels));
      dispatch(updateIsSignedIn(isSignInVerified || signedInFlag === true));
    } 
    if (!isAppLoaded) {
      loadData();
    }
  }, [])

  /*-----------------------------------------------------------------------*/

  const words = useAppSelector(state => state.word.words);
  const batch = useAppSelector(state => state.appState.batch);
  const isRandom = useAppSelector(state => state.word.isRandom);
  const userData = useAppSelector(state => state.userData.userData);
  const checkedLevels = useAppSelector(state => state.appState.checkedLevels);

  const [handleNextFlag, setHandleNextFlag] = useState(false);

  useEffect(() => {
    if (isAppLoaded) {
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
    if (isAppLoaded) {
      dispatch(updateIteration(-1));
      dispatch(updateDisplayWordObject(null));
    }
  }, [checkedLevels, isRandom, dispatch])

  useEffect(() => {
    if (isAppLoaded) {
      const checkedLevelsSet = new Set(checkedLevels);
      const newBatch: Word[] = words.filter(wordObject => checkedLevelsSet.has(wordObject.levelName));
      dispatch(updateBatch(newBatch));
    }
  }, [checkedLevels, words, dispatch])

  return (
    <>
      <Loading />
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