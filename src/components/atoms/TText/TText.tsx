import { Text } from '@/components/atoms';
import { useAppSelector } from '@/store/store';
import { TranslationsProvider } from '@/components/wrappers';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import styles from './TText.module.css';

interface TTextProps {
  translateKey: string;
  className?: string
}

const TText: React.FC<TTextProps> = ({ translateKey, className }) => {
  const namespaceArray = useAppSelector(state => state.userSettings.namespaceArray)
  const [currentNamespaceIndex, setCurrentNamespaceIndex] = useState(0);
  

  return (
    <TranslationsProvider locale={namespaceArray[0]} namespaces={[namespaceArray[currentNamespaceIndex]]} isWords={true}>
      <InnerTText className={className} translateKey={translateKey} setCurrentNamespaceIndex={setCurrentNamespaceIndex}/>
    </TranslationsProvider>
  );
};

interface InnerTTextProps {
  translateKey: string;
  className?: string;
  setCurrentNamespaceIndex: React.Dispatch<React.SetStateAction<number>>;
}

const InnerTText: React.FC<InnerTTextProps> = ({ translateKey, className, setCurrentNamespaceIndex }) => {
  const { t } = useTranslation();

  const namespaceArray = useAppSelector(state => state.userSettings.namespaceArray)
  const handleLanguageChange = () => {
    setCurrentNamespaceIndex(prev => prev === namespaceArray.length - 1 ? 0 : prev + 1);
  };

  const mergedClassName = `${styles.text} ${className || ''}`

  return (
    <Text
      className={mergedClassName}
      onClick={handleLanguageChange}
    >{t(translateKey)}</Text>
  );
};

export default TText;
