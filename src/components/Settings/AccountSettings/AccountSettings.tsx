import styles from './AccountSettings.module.css';

import { SectionLabel } from '../reuseable';
import { Text, Button } from '@/components/atoms';

import { useAppSelector, useAppDispatch } from '@/store/store';
import { updateIsAccountSettingsVisible } from '@/store/settingsUiSlice';
import { updateIsSignInPopupActive, updateIsSignOutPopupActive, updateIsDeletePopupActive } from '@/store/accountUiSlice';

const AccountSettings: React.FC = () => {
  const dispatch = useAppDispatch();
  const isSignedIn = useAppSelector(state => state.userSettings.isSignedIn);

  const isAccountSettingsVisible = useAppSelector(state => state.settingsUi.isAccountSettingsVisible);

  const handleToggleSection = () => {
    dispatch(updateIsAccountSettingsVisible(!isAccountSettingsVisible));
  }

  const openSignInPopup = () => {
    dispatch(updateIsSignInPopupActive(true));
  }

  const openSignOutPopup = () => {
    dispatch(updateIsSignOutPopupActive(true));
  }

  const openDeletePopup = () => {
    dispatch(updateIsDeletePopupActive(true));
  }

  const accountSectionClassName = `${styles.accountSection} 
    ${isAccountSettingsVisible ? styles.accountSectionVisible : ''}`;

  return (
    <>
      <SectionLabel 
        handleToggleSection={handleToggleSection} 
        labelText="Account" 
        isVisible={isAccountSettingsVisible}
      />
        <section className={accountSectionClassName}>
          {isSignedIn ?
            <>
              <Button text="Sign Out" className={styles.blankButton} onClick={openSignOutPopup} />
              <Button text="Delete Account" className={`${styles.blankButton} ${styles.deleteButton}`} onClick={openDeletePopup} />
            </>
            :
            <>
              <Button text="Sign In" className={styles.signInButton} onClick={openSignInPopup} />
            </>
          }
        </section>
    </>
  )
}

export default AccountSettings;