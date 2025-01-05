import styles from './Shading.module.css';
import { useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '@/store/store';
import { updateIsShadingVisible } from '@/store/uiSlice';
import { updateIsSignInPopupVisible, updateIsSignOutPopupVisible, updateIsDeletePopupVisible } from '@/store/accountUiSlice';
import { updateIsProgressDeletePopupVisible } from '@/store/progressUiSlice';

const Shading: React.FC = () => {
  const dispatch = useAppDispatch();

  const isShadingVisible = useAppSelector(state => state.ui.isShadingVisible);
  const isSignInPopupVisible = useAppSelector(state => state.accountUi.isSignInPopupVisible);
  const isSignOutPopupVisible = useAppSelector(state => state.accountUi.isSignOutPopupVisible);
  const isDeletePopupVisible = useAppSelector(state => state.accountUi.isDeletePopupVisible);
  const isProgressDeletePopupVisible = useAppSelector(state => state.progressUi.isProgressDeletePopupVisible);

  const closeShading = () => {
    if (isShadingVisible) dispatch(updateIsShadingVisible(false));

    if (isSignInPopupVisible) dispatch(updateIsSignInPopupVisible(false));
    if (isSignOutPopupVisible) dispatch(updateIsSignOutPopupVisible(false));
    if (isDeletePopupVisible) dispatch(updateIsDeletePopupVisible(false));
    if (isProgressDeletePopupVisible) dispatch(updateIsProgressDeletePopupVisible(false));
  }

  const changeAll = (key: string, boolean: boolean) => {
    if (boolean) {
      if (key !== 'signInPopup' && isSignInPopupVisible) {
        dispatch(updateIsSignInPopupVisible(false));
      }
      if (key !== 'signOutPopup' && isSignOutPopupVisible) {
        dispatch(updateIsSignOutPopupVisible(false));
      }
      if (key !== 'deletePopup' && isDeletePopupVisible) {
        dispatch(updateIsDeletePopupVisible(false));
      }
      if (key !== 'progressDeletePopup' && isProgressDeletePopupVisible) {
        dispatch(updateIsProgressDeletePopupVisible(false));
      }

      if (!isShadingVisible) {
        dispatch(updateIsShadingVisible(true));
      }
    } else {
      if (
        !isSignInPopupVisible && 
        !isSignOutPopupVisible &&  
        !isDeletePopupVisible && 
        !isProgressDeletePopupVisible
      ) {
        dispatch(updateIsShadingVisible(false));
      }
    }
  };

  useEffect(() => {
    changeAll('signInPopup', isSignInPopupVisible);
  }, [isSignInPopupVisible]);

  useEffect(() => {
    changeAll('signOutPopup', isSignOutPopupVisible);
  }, [isSignOutPopupVisible]);

  useEffect(() => {
    changeAll('deletePopup', isDeletePopupVisible);
  }, [isDeletePopupVisible]);

  useEffect(() => {
    changeAll('progressDeletePopup', isProgressDeletePopupVisible);
  }, [isProgressDeletePopupVisible]);

  const shadingClassName = `${styles.shading} ${isShadingVisible ? styles.shadingVisible : ''}`;

  return ( 
    <div 
      className={shadingClassName}
      onClick={closeShading}
    ></div>
  )
}

export default Shading;