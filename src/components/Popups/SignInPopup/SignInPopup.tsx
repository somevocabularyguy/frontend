"use client"

import styles from './SignInPopup.module.css';
import { useState } from 'react';
import { UserData } from '@/types';

import storage from '@/storage';
import { Button, Text } from '@/components/atoms';

import { updateWords } from '@/store/wordSlice';
import { updateUserData } from '@/store/userDataSlice';
import { updateIsSignedIn } from '@/store/userSettingsSlice';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { addSingleWordResource, removeSingleWordResource } from '@/store/languageSlice';
import { updateIsWaitingVerify, updateIsSignInPopupVisible } from '@/store/accountUiSlice';

import { getWordResources } from '@/lib/api';

import { EmailIcon, BackArrowIcon } from '#/public/icons';
import { useCustomTranslation, useAnimationIndex } from '@/hooks';
import { sendMagicLink, verifySignIn, syncUserData } from '@/lib/api';

const SignInPopup: React.FC = () => {
  const t = useCustomTranslation("Popups.SignInPopup");
  const dispatch = useAppDispatch();

  const isSignInPopupVisible = useAppSelector(state => state.accountUi.isSignInPopupVisible);
  const isWaitingVerify = useAppSelector(state => state.accountUi.isWaitingVerify);

  const [email, setEmail] = useState('');
  const [isWarned, setIsWarned] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const isValidEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

 const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsWarned(false);

    if (!isValidEmail(email)) {
      setIsWarned(true);  
      return;
    }
    setIsSending(true);

    try {
      const response = await sendMagicLink(email);
      if (response.status === 200) {
        dispatch(updateIsWaitingVerify(true));
        storage.setItem('waitingVerify', true);
      }
    } catch (error) {
      console.error(error);
      setIsSending(false);
    } finally {
      setIsSending(false);
    }
  };

  const checkAndRefresh = async () => {
    const waitingVerify = storage.getItem('waitingVerify');
    if (waitingVerify) {

      const response = await verifySignIn();
      if (response === 'verified') {

        setEmail('');
        storage.removeItem('waitingVerify');
        storage.removeItem('tempVerifyToken');

        const storedUserData = storage.getItem('userData') as UserData;

        const dataResponse = await syncUserData(storedUserData);

        if (dataResponse) {
          dispatch(updateUserData(dataResponse.serverUserData));
          const oldLanguageArray = storedUserData.languageArray;
          const newLanguageArray = dataResponse.serverUserData.languageArray;
          oldLanguageArray.forEach(language => {
            if (!newLanguageArray.includes(language)) {
              dispatch(removeSingleWordResource(language))
            }
          })

          const requestArray = newLanguageArray.filter(language => !oldLanguageArray.includes(language));
          const newWordsLanguage = newLanguageArray[0] === oldLanguageArray[0] ? newLanguageArray[0] : null;

          const { requestedWords, requestedWordResources } = await getWordResources(newLanguageArray[0], requestArray, newWordsLanguage);

          if (requestedWords) {
            dispatch(updateWords(requestedWords))
          }

          if (requestedWordResources) {
            Object.keys(requestedWordResources).forEach(language => {
              dispatch(addSingleWordResource({ language: language, wordResource: requestedWordResources[language] }))
            })
          }
        }

        dispatch(updateIsSignedIn(true));
        dispatch(updateIsSignInPopupVisible(false));
        dispatch(updateIsWaitingVerify(false));

      } else if (response === 'not-verified') {

        console.log(response);

      } else if (response === 'expired') {

        storage.removeItem('waitingVerify');
        dispatch(updateIsWaitingVerify(false));
      }
    }
  }

  const handleGoBack = () => {
    dispatch(updateIsWaitingVerify(false));
  }

  const sendingAnimationIndex = useAnimationIndex(isSending, 250, 3);

  const signInContainerClassName = `${styles.container} ${isSignInPopupVisible ? styles.containerVisible : ''}`

  return (
      <section className={signInContainerClassName}>
        {isWaitingVerify ?
          <section className={styles.waitingContainer}>
            <div className={styles.waitingUpperContainer}>
              <EmailIcon className={styles.emailIcon} />
              <div className={styles.waitingTextContainer}>
                <Text className={styles.waitingText}>{t("waitingText")}</Text>
                <Text className={styles.waitingSmallText}>{t("waitingSmallText")}</Text>
              </div>
            </div>
            <Text className={styles.refreshText}>{t("refreshText")}</Text>
            <div className={styles.buttonsContainer}>
              <div 
                className={styles.backIconContainer}
                onClick={handleGoBack}
              >
                <BackArrowIcon className={styles.backIcon} />
              </div>
              <Button 
                text={t("refreshButton")} 
                onClick={checkAndRefresh} 
                className={styles.refreshButton} 
              />
            </div>
          </section>
          :
          <section className={styles.inputContainer}>
            {isWarned &&
              <Text className={styles.warningText}>{t("warningText")}</Text>
            }
            <Text className={styles.emailLabel}>{t("emailLabel")}</Text>
            <input 
              className={styles.emailInput}
              placeholder={t("placeholderStart") + '@email.com'}
              value={email}
              onChange={handleInputChange}
            />
            <Button 
              text={isSending ? t('sendingText') + '.'.repeat(sendingAnimationIndex) : t('sendText')} 
              className={styles.emailButton} 
              onClick={handleSubmit}
            />
          </section>
        }
      </section>
  )
}

export default SignInPopup;