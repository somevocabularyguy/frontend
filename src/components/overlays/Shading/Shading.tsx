import styles from './Shading.module.css';
import { useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '@/store/store';
import { updateIsShadingVisible } from '@/store/uiSlice';
import { updateIsSignInPopupActive, updateIsSignOutPopupActive, updateIsDeletePopupActive } from '@/store/accountUiSlice';

const Shading: React.FC = () => {
  const dispatch = useAppDispatch();

  const isShadingVisible = useAppSelector(state => state.ui.isShadingVisible); 
  const isSignInPopupActive = useAppSelector(state => state.accountUi.isSignInPopupActive); 
  const isSignOutPopupActive = useAppSelector(state => state.accountUi.isSignOutPopupActive); 
  const isDeletePopupActive = useAppSelector(state => state.accountUi.isDeletePopupActive); 


  const closeOverlay = () => {
    if (isSignInPopupActive) {
      dispatch(updateIsSignInPopupActive(false));
    }
    if (isSignOutPopupActive) {
      dispatch(updateIsSignOutPopupActive(false));
    }
    if (isDeletePopupActive) {
      dispatch(updateIsDeletePopupActive(false));
    }
    dispatch(updateIsShadingVisible(false));
  }

  const shadingClassName = `${styles.shading} ${isShadingVisible ? styles.shadingVisible : ''}`;

  useEffect(() => {
    if ((isSignOutPopupActive || isDeletePopupActive || isSignInPopupActive) && !isShadingVisible) {
      dispatch(updateIsShadingVisible(true));
    } else {
      dispatch(updateIsShadingVisible(false));
    }
  }, [isSignOutPopupActive, isDeletePopupActive, isSignInPopupActive])

  return ( 
    <div 
      className={shadingClassName}
      onClick={closeOverlay}
    ></div>
  )
}

export default Shading;