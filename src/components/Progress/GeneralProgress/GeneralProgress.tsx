import styles from './GeneralProgress.module.css';

import { useAppSelector } from '@/store/store';

import { Text } from '@/components/atoms';

const GeneralProgress: React.FC = () => {

  const userData = useAppSelector(state => state.userData.userData);

  const totalTimeSpentText = `${userData.totalUseTime} milliseconds`

  return (
    <span className={styles.container}>
      <Text>{`Total time spent to learn: ${totalTimeSpentText}`}</Text>
    </span>
  )
}

export default GeneralProgress;