"use client"

import styles from './styles.module.css';

import { Button, Text } from '@/components/atoms';
import { useState, useEffect } from 'react';

import { EmailIcon } from '@/public/icons';

import { sendMagicLink } from '@/lib/api';

const SignInPage = () => {

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

  const warningBoxClassName = `${styles.warningBox} ${isWarned ? '' : styles.hidden}`;
  const mainGridClassName = `${styles.mainGrid} ${isWaiting ? styles.none : ''}`;
  const waitingGridClassName = `${styles.waitingGrid} ${isWaiting ? '' : styles.none}`

  return (
    <main className={styles.main} >
      <section className={mainGridClassName}>
        <div className={warningBoxClassName} >
          <Text text="Please Enter A Valid Email" as="span" />
        </div>
        <Text text="Email" as="label" className={styles.emailLabel} />
        <input 
          className={styles.emailInput}
          placeholder="dontstoplearning@email.com"
          value={email}
          onChange={handleInputChange}
        />
        <Button text={animationState} className={styles.emailButton} onClick={handleSubmit}/>
      </section>
      <section className={waitingGridClassName}>
        <EmailIcon width="3.25rem" height="3.25rem" className={styles.emailIcon} />
        <Text text="Check Your Email For Special Login Link" as="span" />
        <Text text="Be sure to check your spam..." as="span" className={styles.waitingSmallText}/>
      </section>
    </main>
  )
}

export default SignInPage;