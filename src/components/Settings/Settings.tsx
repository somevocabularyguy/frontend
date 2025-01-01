import styles from './Settings.module.css';

import HiddenCustomSettings from './HiddenCustomSettings';
import AccountSettings from './AccountSettings';

const Settings: React.FC = () => {
 
  return (
      <div className={styles.container}>
        <section className={styles.settingsContainer}>

          <HiddenCustomSettings />
          <AccountSettings />
          
        </section>

      </div>
  )
}

export default Settings;