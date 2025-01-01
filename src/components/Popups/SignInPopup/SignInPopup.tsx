"use client"

import styles from './SignInPopup.module.css';
import { useState, useEffect } from 'react';

import { Button, Text } from '@/components/atoms';

import { useAppSelector } from '@/store/store';

import { EmailIcon } from '@/public/icons';
import { sendMagicLink } from '@/lib/api';
import { useCustomTranslation } from '@/hooks';

const SignInPopup: React.FC = () => {
  const t = useCustomTranslation("Popups.SignInPopup");

  const [email, setEmail] = useState('');
  const [isWarned, setIsWarned] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [animationState, setAnimationState] = useState(t("sending0"));

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
        setIsWaiting(true);
        setEmail('');
      }
    } catch (error) {
      console.error(error);
      setIsSending(false);
    } finally {
      setIsSending(false);
    }
  };

  const checkAndRefresh = () => {
    
  }

  useEffect(() => {
    let iteration = 0;
    const sendingArray = [t("sending1"), t("sending2"), t("sending3")];
    let intervalId: NodeJS.Timeout;

    if (isSending) {
      setAnimationState(sendingArray[iteration]);
      intervalId = setInterval(() => {
        iteration = (iteration + 1) % sendingArray.length;
        setAnimationState(sendingArray[iteration]);
      }, 400);
    } else {
      setAnimationState(t("sending0"));
    }

    return () => clearInterval(intervalId);
  }, [isSending]);

  const isSignInPopupVisible = useAppSelector(state => state.accountUi.isSignInPopupVisible);

  const signInContainerClassName = `${styles.container} ${isSignInPopupVisible ? styles.containerVisible : ''}`

  return (
      <section className={signInContainerClassName}>
        {isWaiting ?
          <section className={styles.waitingContainer}>
            <div className={styles.waitingUpperContainer}>
              <EmailIcon className={styles.emailIcon} />
              <div className={styles.waitingTextContainer}>
                <Text text={t("waitingText")} as="span" className={styles.waitingText} />
                <Text text={t("waitingSmallText")} as="span" className={styles.waitingSmallText}/>
              </div>
            </div>
            <Text className={styles.refreshText} text={t("refreshText")} as="span" />
            <Button text={t("refreshButton")} onClick={checkAndRefresh} className={styles.refreshButton} />
          </section>
          :
          <section className={styles.inputContainer}>
            {isWarned &&
              <Text className={styles.warningText} text={t("warningText")} as="span" />
            }
            <Text text={t("emailLabel")} as="span" className={styles.emailLabel} />
            <input 
              className={styles.emailInput}
              placeholder={t("placeHolder")}
              value={email}
              onChange={handleInputChange}
            />
            <Button text={animationState} className={styles.emailButton} onClick={handleSubmit}/>
          </section>
        }
      </section>
  )
}

export default SignInPopup;