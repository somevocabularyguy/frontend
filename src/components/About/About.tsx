"use client";

import styles from './About.module.css';
import { Text } from '@/components/atoms';
import { useCustomTranslation } from '@/hooks'; 

const About: React.FC = () => {

  const t = useCustomTranslation('About');

  return (
    <section className={styles.container}>
      <Text className={styles.welcomeText}>{t('text1')}</Text>
      <Text className={styles.welcomeText}>{t('text2')}</Text>
      <Text className={styles.welcomeText}>{t('text3')}</Text>
      <Text className={styles.welcomeText}>{t('text4')}</Text>
      <Text className={styles.welcomeText}>
        {t('text5') + ' '}
        <a 
          className={styles.link}
          href="https://www.github.com/somevocabularyguy" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          https://www.github.com/somevocabularyguy
        </a>
      </Text>
      <Text className={styles.welcomeText}>{t('text6')}</Text>

      <div className={styles.sourceLinksContainer}>
        <Text className={styles.welcomeText}>
          {t('resource1') + ' '}
          <a 
            className={styles.link}
            href="https://www.wordfrequency.info" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            www.wordfrequency.info
          </a>
        </Text>
      </div>
    </section>
  )
}

export default About;