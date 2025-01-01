import { Line, Text } from '@/components/atoms';
import styles from './styles.module.css';

const TestComponent: React.FC = () => {

  const translatedData = '';

  const outputClassName = `${styles.output} ${translatedData ? '' : styles.outputPlaceholder}`
  return (
    <main className={styles.mainGrid}>
      <Line width="30rem" />
      <div className={styles.mainGrid}>
        <textarea className={styles.input}></textarea>
        <Text text={translatedData || 'Translation'} className={outputClassName}/>
      </div>
    </main>
  )
}

export default TestComponent;