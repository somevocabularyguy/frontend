"use client";

import styles from './TransparentOverlay.module.css';
import { useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '@/store/store';
import { updateIsTransparentOverlayVisible } from '@/store/uiSlice';

const TransparentOverlay: React.FC = () => {
  const dispatch = useAppDispatch();

  const isTransparentOverlayVisible = useAppSelector(state => state.ui.isTransparentOverlayVisible); 
  const isFeedbackDropdownActive = useAppSelector(state => state.feedbackUi.isFeedbackDropdownActive); 

  const closeOverlay = () => {
    dispatch(updateIsTransparentOverlayVisible(false));
  }

  const transparentOverlayClassName = `${styles.transparentOverlay} ${isTransparentOverlayVisible ? styles.transparentOverlayVisible : ''}`;

  useEffect(() => {
    if (isFeedbackDropdownActive && !isTransparentOverlayVisible) {
      dispatch(updateIsTransparentOverlayVisible(true));
    } else {
      dispatch(updateIsTransparentOverlayVisible(false));
    }
  }, [isFeedbackDropdownActive])

  return ( 
    <div 
      className={transparentOverlayClassName}
      onClick={closeOverlay}
    ></div>
  )
}

export default TransparentOverlay;