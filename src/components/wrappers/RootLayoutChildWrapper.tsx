"use client";

import { useEffect } from 'react';
import { UserData } from '@/types';

import { useAppDispatch, useAppSelector } from '@/store/store';
import { updateLoadingState } from '@/store/dataSlice';
import { updateLevels, updateCheckedLevels } from '@/store/appStateSlice';
import { updateUserData } from '@/store/userDataSlice';
import { updateDisplayWordObject } from '@/store/wordSlice';
import { updateIsSignedIn } from '@/store/userSettingsSlice';

import { returnUserData } from '@/utils/userDataUtils';
import { useCreateLevels } from '@/hooks';

import { Sidebar } from '@/components/overlays';

interface RootLayoutChildWrapperProps {
  children: React.ReactNode;
  serverUserData: UserData | null;
  signedInFlag: boolean;
}

const RootLayoutChildWrapper: React.FC<RootLayoutChildWrapperProps> = ({ children, serverUserData, signedInFlag }) => {
  const dispatch = useAppDispatch();

  const isSignedIn = useAppSelector(state => state.userSettings.isSignedIn);
  if (isSignedIn !== signedInFlag) {
    dispatch(updateIsSignedIn(signedInFlag));
  }

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    const parsedUserData: UserData | null = storedUserData ? JSON.parse(storedUserData) : null;
    const userData = returnUserData(parsedUserData, serverUserData);

    const storedCheckedLevels = localStorage.getItem('checkedLevels');
    const parsedCheckedLevels = storedCheckedLevels ? JSON.parse(storedCheckedLevels) : null;

    dispatch(updateUserData(userData));
    dispatch(updateCheckedLevels(parsedCheckedLevels));
    dispatch(updateLoadingState(false));
  }, [serverUserData, dispatch])

  const userData = useAppSelector(state => state.userData.userData);
  const createLevels = useCreateLevels();

  useEffect(() => {
    const levels = createLevels();
    dispatch(updateLevels(levels));
  }, [userData.hiddenWordIds, userData.customWordIds, dispatch])

  const checkedLevels = useAppSelector(state => state.appState.checkedLevels);
  const isRandom = useAppSelector(state => state.word.isRandom);

  useEffect(() => {
    dispatch(updateDisplayWordObject(null));
  }, [checkedLevels, isRandom, dispatch])

  const loading = useAppSelector(state => state.data.loading)
  if (loading) return <h1>loading...</h1>;

  return (
    <>
      <Sidebar />
      {children}
    </>
  )
}

export default RootLayoutChildWrapper;