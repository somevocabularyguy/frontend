"use client";

import { UserData } from '@/types';

import { useCheckAppLoaded, useLoadApp, useMaintainApp } from '@/hooks';

import { Shading } from '@/components/overlays';
import { LanguageDropdown } from '@/components/Language';
import { SignInPopup, SignOutPopup, DeletePopup, ProgressDeletePopup } from '@/components/Popups';

import Sidebar from '@/components/Sidebar';
import Loading from '@/components/Loading';

interface RootLayoutChildWrapperProps {
  children: React.ReactNode;
  serverUserData: UserData | null;
  signedInFlag: string | boolean;
  languageArray: string[];
}

const RootLayoutChildWrapper: React.FC<RootLayoutChildWrapperProps> = ({ 
  children, 
  serverUserData, 
  signedInFlag,
  languageArray
}) => {
  useCheckAppLoaded();

  useLoadApp(serverUserData, signedInFlag, languageArray);

  useMaintainApp();

  return (
    <>
      <Loading />
      <Sidebar />
      <Shading />
      <SignInPopup />
      <SignOutPopup />
      <DeletePopup />
      <ProgressDeletePopup />
      <LanguageDropdown />
      {children}
    </>
  )
}

export default RootLayoutChildWrapper;