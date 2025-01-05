import storage from '@/storage';
import { useEffect } from 'react';
import { UserData, Word } from '@/types';

import { updateWords } from '@/store/wordSlice';
import { updateUserData } from '@/store/userDataSlice';
import { updateIsLoading } from '@/store/loadingSlice';
import { updateIsSignedIn } from '@/store/userSettingsSlice';
import { updateWordResources } from '@/store/languageSlice';
import { updateIsWaitingVerify } from '@/store/accountUiSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { updateLevels, updateCheckedLevels, updateBatch } from '@/store/appStateSlice';

import { returnUserData } from '@/utils/userDataUtils';
import { verifySignIn, syncUserData, getWordResources } from '@/lib/api';

import { createLevels } from '@/utils/levelUtils';
import { groupWordsByLevel } from '@/utils/wordUtils';

const useLoadApp = (
  serverUserData: UserData | null,
  signedInFlag: string | boolean,
  languageArray: string[]
) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.loading.isLoading);
  const isAppLoaded = useAppSelector(state => state.loading.isAppLoaded);

  const checkVerify = async (signedInFlag: string | boolean) => {
    if (signedInFlag === 'waiting') {
      dispatch(updateIsWaitingVerify(true));
      storage.setItem('waitingVerify', true);
    }

    let isSignInVerified: boolean | null = null;
    const waitingVerify = storage.getItem('waitingVerify');
    if (waitingVerify) {

      const response = await verifySignIn();
      if (response === 'verified') {

        isSignInVerified = true;
        storage.removeItem('waitingVerify');
        dispatch(updateIsWaitingVerify(false));

      } else if (response === 'not-verified') {

        console.log(response);

      } else if (response === 'expired') {

        storage.removeItem('waitingVerify');
        dispatch(updateIsWaitingVerify(false));
      }
    }
    return isSignInVerified;
  }

  const loadData = async () => {
    const isSignInVerified = await checkVerify(signedInFlag);

    const isSignedIn = isSignInVerified || signedInFlag === true;

    const storedUserData = storage.getItem('userData');
    const updatedUserData = returnUserData(storedUserData, serverUserData, languageArray);
    if (isSignedIn) {
      syncUserData(updatedUserData);
    }

    const { requestedWords, requestedWordResources } = await getWordResources(languageArray[0], languageArray, languageArray[0])

    if (!requestedWords) throw new Error('No resource arrived.');

    const groupedWords = groupWordsByLevel(requestedWords, updatedUserData.hiddenWordIds, updatedUserData.customWordIds);
    const levels = createLevels(groupedWords, updatedUserData.wordsData);

    const storedCheckedLevels = storage.getItem('checkedLevels');
    const checkedLevelsSet = new Set(storedCheckedLevels);
    const newBatch: Word[] = groupedWords.filter(wordObject => checkedLevelsSet.has(wordObject.levelName));

    dispatch(updateLevels(levels));
    dispatch(updateBatch(newBatch));
    dispatch(updateWords(groupedWords));
    dispatch(updateUserData(updatedUserData));
    dispatch(updateCheckedLevels(storedCheckedLevels));
    dispatch(updateWordResources(requestedWordResources));
    dispatch(updateIsSignedIn(isSignInVerified || signedInFlag === true));
  } 

  useEffect(() => {
    if (!isAppLoaded) {
      dispatch(updateIsLoading(true));
      loadData();
    } else {
      dispatch(updateIsLoading(false));
    }
  }, [isAppLoaded])
}

export default useLoadApp;