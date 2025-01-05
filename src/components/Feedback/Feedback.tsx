"use client";

import styles from './Feedback.module.css';
import { useState } from 'react';
import { useCustomTranslation } from '@/hooks';
import { Text } from '@/components/atoms';

import { useAppSelector, useAppDispatch } from '@/store/store';
import { updateIsFeedbackDropdownActive } from '@/store/feedbackUiSlice';
import { updateSelectedTypeObject, updateFeedbackText, updateIsSended, updateImageUrls, updateIsError } from '@/store/feedbackSlice';

import { FeedbackData } from '@/types'; 
import { sendFeedbackData } from '@/lib/api';

import FeedbackDropdown from './FeedbackDropdown';
import FeedbackTextarea from './FeedbackTextarea';
import FeedbackFileInput from './FeedbackFileInput';

const FeedbackPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const t = useCustomTranslation("Feedback")

  const [files, setFiles] = useState<File[]>([]);

  const imageUrls = useAppSelector(state => state.feedback.imageUrls);
  const isSended = useAppSelector(state => state.feedback.isSended);
  const isError = useAppSelector(state => state.feedback.isError);
  const selectedTypeObject = useAppSelector(state => state.feedback.selectedTypeObject);
  const feedbackText = useAppSelector(state => state.feedback.feedbackText);

  const isFeedbackDropdownActive = useAppSelector(state => state.feedbackUi.isFeedbackDropdownActive)

  const handleSubmit = async (event: React.MouseEvent) => {
    event.preventDefault();
    
    if (!selectedTypeObject.key || !feedbackText) {
      if (!isError) {
        dispatch(updateIsError(true));
      }
      return;
    }

    const feedbackObject: FeedbackData = {
      feedbackType: selectedTypeObject.key,
      feedbackText: feedbackText,
      files: files
    }

    try {
      const response = await sendFeedbackData(feedbackObject)
      if (response.status === 201) {
        dispatch(updateIsSended(true));
        dispatch(updateSelectedTypeObject({ key: '', text: t("FeedbackDropdown.Options.select") }));
        dispatch(updateFeedbackText(''));
        setFiles([]);
        for (let i = 0; i < imageUrls.length; i++) {
          URL.revokeObjectURL(imageUrls[i]);
        }
        dispatch(updateImageUrls([]));
      }
    } catch (error) {
      console.error(error);
    }
  }

  const closeDropdown = () => {
    if (isFeedbackDropdownActive) {
      dispatch(updateIsFeedbackDropdownActive(false));
    }
  }

  return (  
    <div className={styles.container} onClick={closeDropdown}>
      <div className={styles.form}>
        {isError ? 
          <Text className={isSended ? styles.thanksDiv : styles.hidden}>{t("errorText")}</Text>
          : isSended &&
          <Text className={isSended ? styles.thanksDiv : styles.hidden}>{t("thankingText")}</Text>
        }

        <FeedbackDropdown />
        <FeedbackTextarea />
        <FeedbackFileInput files={files} setFiles={setFiles} />

        <button className={styles.submitButton} onClick={handleSubmit}>{t("submitButton")}</button>
      </div>
    </div>

  )
}


export default FeedbackPage;