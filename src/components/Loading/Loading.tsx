import styles from './Loading.module.css';
import { useEffect } from 'react';
import { useAppSelector } from '@/store/store';

import { useCustomTranslation, useAnimationIndex } from '@/hooks';
import { Text } from '@/components/atoms';

const Loading: React.FC = () => {
  const t = useCustomTranslation('Loading');

  const isLoading = useAppSelector(state => state.loading.isLoading);

  const animationIndex = useAnimationIndex(isLoading, 250, 3)


  return (
    <>
      {isLoading && 
        <div className={styles.container}>
          <Text className={styles.loadingText}>{`${t('loadingText')}${'.'.repeat(animationIndex)}`}</Text>
        </div>
      }
    </>    
  );
}

export default Loading;