'use client';
import { TText, Text } from '@/components/atoms';
import { useCustomTranslation } from '@/hooks';
import { useAppSelector } from '@/store/store';
import { useEffect, useState } from 'react';
 
const TestComponent: React.FC = () => {
  const t = useCustomTranslation('Levels.LevelBox')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
      <Text>aaaaaaaaaaa</Text>
      <Text>{t('easy')}</Text>

    </div>
  )
}

export default TestComponent;