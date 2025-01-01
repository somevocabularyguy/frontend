import { MainLabels, MainButtons } from './';
import styles from './Main.module.css';

const Main: React.FC = () => {

  return (
    <section className={styles.container}>
      <MainLabels />
      <MainButtons />
    </section>
  )
}

export default Main;