"use client";

import { UserData, Word, WordResources } from '@/types';

import { useCheckAppLoaded, useLoadApp, useMaintainApp } from '@/hooks';

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

  useLoadApp(
    serverUserData, 
    signedInFlag,
    initialWords,
    wordResources,
    languageArray
  );

  useMaintainApp();

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