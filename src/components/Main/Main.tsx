import MainButtons from './MainButtons';
import MainLabels from './MainLabels';
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