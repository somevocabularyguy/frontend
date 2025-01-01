'use client';

import styles from './styles.module.css';
import { useTranslation }  from 'react-i18next';

import { Text } from '@/components/atoms';
import { LanguageDropdown } from '@/components/Language';
import { FeedbackFileInput } from '@/components/Feedback';
 
const TestComponent: React.FC = () => {

  const { t } = useTranslation();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
      <FeedbackFileInput />
    </div>
  )
}

export default TestComponent;