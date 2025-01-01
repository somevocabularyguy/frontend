import styles from './AccountSettings.module.css';

import { SectionLabel } from '../reuseable';
import { Text, Button } from '@/components/atoms';
import { useCustomTranslation } from '@/hooks';

import { useAppSelector, useAppDispatch } from '@/store/store';
import { updateIsAccountSettingsVisible } from '@/store/settingsUiSlice';
import { updateIsSignInPopupVisible, updateIsSignOutPopupVisible, updateIsDeletePopupVisible } from '@/store/accountUiSlice';

const AccountSettings: React.FC = () => {
  const { t } = useCustomTranslation("Settings.AccountSettings");

  const dispatch = useAppDispatch();
  const isSignedIn = useAppSelector(state => state.userSettings.isSignedIn);

  const isAccountSettingsVisible = useAppSelector(state => state.settingsUi.isAccountSettingsVisible);

  const handleToggleSection = () => {
    dispatch(updateIsAccountSettingsVisible(!isAccountSettingsVisible));
  }

  const openSignInPopup = () => {
    dispatch(updateIsSignInPopupVisible(true));
  }

  const openSignOutPopup = () => {
    dispatch(updateIsSignOutPopupVisible(true));
  }

  const openDeletePopup = () => {
    dispatch(updateIsDeletePopupVisible(true));
  }

  const accountSectionClassName = `${styles.accountSection} 
    ${isAccountSettingsVisible ? styles.accountSectionVisible : ''}`;

  return (
    <>
      <SectionLabel 
        handleToggleSection={handleToggleSection} 
        labelText={t("labelText")} 
        isVisible={isAccountSettingsVisible}
      />
        <section className={accountSectionClassName}>
          {isSignedIn ?
            <>
              <Button text={t("signOutButton")} className={styles.blankButton} onClick={openSignOutPopup} />
              <Button text={t("deleteButton")} className={`${styles.blankButton} ${styles.deleteButton}`} onClick={openDeletePopup} />
            </>
            :
            <>
              <Button text={t("signInButton")} className={styles.signInButton} onClick={openSignInPopup} />
            </>
          }
        </section>
    </>
  )
}

export default AccountSettings;