"use client";

import { useEffect } from 'react';
import { UserData, Word } from '@/types';
import storage from '@/storage';

import { useAppDispatch, useAppSelector } from '@/store/store';
import { updateLoadingState } from '@/store/dataSlice';
import { updateLevels, updateCheckedLevels, updateBatch } from '@/store/appStateSlice';
import { updateUserData } from '@/store/userDataSlice';
import { updateDisplayWordObject } from '@/store/wordSlice';
import { updateIsSignedIn } from '@/store/userSettingsSlice';

import { returnUserData } from '@/utils/userDataUtils';
import { useCreateLevels } from '@/hooks';

import { Shading } from '@/components/overlays';
import { LanguageDropdown } from '@/components/Language';
import { SignInPopup, SignOutPopup, DeletePopup } from '@/components/Popups';
import Sidebar from '@/components/Sidebar';
import Loading from '@/components/Loading';

interface RootLayoutChildWrapperProps {
  children: React.ReactNode;
  serverUserData: UserData | null;
  signedInFlag: boolean;
}

const RootLayoutChildWrapper: React.FC<RootLayoutChildWrapperProps> = ({ children, serverUserData, signedInFlag }) => {
  const dispatch = useAppDispatch();
  const createLevels = useCreateLevels();

  const checkedLevels = useAppSelector(state => state.appState.checkedLevels);
  const userData = useAppSelector(state => state.userData.userData);
  const isRandom = useAppSelector(state => state.word.isRandom);
  const words = useAppSelector(state => state.data.words);

  const isSignedIn = useAppSelector(state => state.userSettings.isSignedIn);
  if (isSignedIn !== signedInFlag) {
    dispatch(updateIsSignedIn(signedInFlag));
  }

  useEffect(() => {
    const storedUserData = storage.getItem('userData');
    const userData = returnUserData(storedUserData, serverUserData);

    const storedCheckedLevels = storage.getItem('checkedLevels');

    dispatch(updateUserData(userData));
    dispatch(updateCheckedLevels(storedCheckedLevels));
    dispatch(updateLoadingState(false));
  }, [serverUserData, dispatch])

  useEffect(() => {
    const levels = createLevels();
    dispatch(updateLevels(levels));
  }, [userData.hiddenWordIds, userData.customWordIds, dispatch])

  useEffect(() => {
    dispatch(updateDisplayWordObject(null));
  }, [checkedLevels, isRandom, dispatch])

  useEffect(() => {
    const checkedLevelsSet = new Set(checkedLevels);
    const newBatch: Word[] = words.filter(wordObject => checkedLevelsSet.has(wordObject.levelName));
    dispatch(updateBatch(newBatch));
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