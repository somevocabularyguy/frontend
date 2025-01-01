"use client";

import styles from './styles.module.css';
import { useContextMenuUtils } from '@/hooks';

import { UpperSection, LevelSection } from '@/components/templates';
import { ContextMenu } from '@/components/overlays';

const MainPage: React.FC = () => {

  const { closeContextMenu } = useContextMenuUtils()   

  return (
    <section className={styles.container}>
      <main className={styles.main} onClick={closeContextMenu}>
        <section className={styles.upperSection}>
          <UpperSection />
        </section>
        <ContextMenu />
        <LevelSection />
      </main>
    </section>
  )
}

export default MainPage;