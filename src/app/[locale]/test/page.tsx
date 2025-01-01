'use client';

import { TText, Text } from '@/components/atoms';
import { useCustomTranslation } from '@/hooks';
 
const TestComponent: React.FC = () => {
  const { t, returnKey } = useCustomTranslation('greeting');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
      <TText translateKey={returnKey('hello')} />
    </div>
  )
}

export default TestComponent;