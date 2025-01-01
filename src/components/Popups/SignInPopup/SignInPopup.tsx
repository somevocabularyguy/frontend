"use client"

import styles from './SignInPopup.module.css';
import { useState, useEffect, useRef } from 'react';

import { Button, Text } from '@/components/atoms';

import { useAppSelector } from '@/store/store';

import { EmailIcon } from '@/public/icons';
import { sendMagicLink } from '@/lib/api';
import { useCustomTranslation } from '@/hooks';

const SignInPopup: React.FC = () => {
  const { t } = useCustomTranslation("Popups.SignInPopup");

  const [email, setEmail] = useState('');
  const [isWarned, setIsWarned] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [animationIndex, setAnimationIndex] = useState(0);
  const animationIndexRef = useRef(animationIndex);

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
    let loadingInterval: NodeJS.Timeout | null = null;

    if (isSending) {
      loadingInterval = setInterval(() => {
        setAnimationIndex(prevIndex => {
          const nextIndex = prevIndex === 3 ? 1 : prevIndex + 1;
          animationIndexRef.current = nextIndex;
          return nextIndex;
        });
      }, 250);
    }

    return () => {
      if (loadingInterval) clearInterval(loadingInterval);
      setAnimationIndex(0);
    };
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
                <Text className={styles.waitingText}>{t("waitingText")}</Text>
                <Text className={styles.waitingSmallText}>{t("waitingSmallText")}</Text>
              </div>
            </div>
            <Text className={styles.refreshText}>{t("refreshText")}</Text>
            <Button text={t("refreshButton")} onClick={checkAndRefresh} className={styles.refreshButton} />
          </section>
          :
          <section className={styles.inputContainer}>
            {isWarned &&
              <Text className={styles.warningText}>{t("warningText")}</Text>
            }
            <Text className={styles.emailLabel}>{t("emailLabel")}</Text>
            <input 
              className={styles.emailInput}
              placeholder={t("placeHolderStart") + '@email.com'}
              value={email}
              onChange={handleInputChange}
            />
            <Button text={isSending ? t('sendingText') + '.'.repeat(animationIndex) : t('sendText')} className={styles.emailButton} onClick={handleSubmit}/>
          </section>
        }
      </section>
  )
}

export default SignInPopup;