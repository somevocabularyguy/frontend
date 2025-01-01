"use client"

import styles from './SignInPopup.module.css';
import { useState, useEffect } from 'react';

import { Button, Text } from '@/components/atoms';

import { useAppSelector } from '@/store/store';

import { EmailIcon } from '@/public/icons';
import { sendMagicLink } from '@/lib/api';

const SignInPopup: React.FC = () => {

  const [email, setEmail] = useState('');
  const [isWarned, setIsWarned] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [animationState, setAnimationState] = useState('Send Magic Link');

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
    const sendingArray = ['Sending.', 'Sending..', 'Sending...'];
    let intervalId: NodeJS.Timeout;

    if (isSending) {
      setAnimationState(sendingArray[iteration]);
      intervalId = setInterval(() => {
        iteration = (iteration + 1) % sendingArray.length;
        setAnimationState(sendingArray[iteration]);
      }, 400);
    } else {
      setAnimationState('Send Magic Link');
    }

    return () => clearInterval(intervalId);
  }, [isSending]);

  const isSignInPopupActive = useAppSelector(state => state.accountUi.isSignInPopupActive);

  const signInContainerClassName = `${styles.container} ${isSignInPopupActive ? styles.containerVisible : ''}`

  return (
      <section className={signInContainerClassName}>
        {isWaiting ?
          <section className={styles.waitingContainer}>
            <div className={styles.waitingUpperContainer}>
              <EmailIcon className={styles.emailIcon} />
              <div className={styles.waitingTextContainer}>
                <Text text="Check Your Email For Special Login Link" as="span" className={styles.waitingText} />
                <Text text="Be sure to check your spam..." as="span" className={styles.waitingSmallText}/>
              </div>
            </div>
            <Text className={styles.refreshText} text="Refresh the website after you clicked the link" as="span" />
            <Button text="Refresh" onClick={checkAndRefresh} className={styles.refreshButton} />
          </section>
          :
          <section className={styles.inputContainer}>
            {isWarned &&
              <Text className={styles.warningText} text="Please Enter A Valid Email" as="span" />
            }
            <Text text="Email" as="span" className={styles.emailLabel} />
            <input 
              className={styles.emailInput}
              placeholder="dontstoplearning@email.com"
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