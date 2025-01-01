import styles from './FeedbackTextarea.module.css';
import { useRef } from 'react';
import { useCustomTranslation } from '@/hooks';

import { useAppSelector, useAppDispatch } from '@/store/store';
import { updateFeedbackText, updateIsSended } from '@/store/feedbackSlice';

const FeedbackTextarea: React.FC = () => {
  const dispatch = useAppDispatch();
  const t = useCustomTranslation("Feedback.FeedbackTextarea");

  const isSended = useAppSelector(state => state.feedback.isSended);
  const feedbackText = useAppSelector(state => state.feedback.feedbackText);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextareaInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };


  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(updateFeedbackText(event.target.value));
    if (isSended) {
      dispatch(updateIsSended(false));
    }
  };


  return (
    <div className={styles.textareaContainer}>
      <label htmlFor="description">{t("label")}</label>
      <textarea 
        className={styles.textarea} 
        id="description" 
        rows={4} cols={60} 
        ref={textareaRef} 
        value={feedbackText}
        onInput={handleTextareaInput} 
        onChange={handleTextareaChange}
      ></textarea>
    </div>
  )
}

export default FeedbackTextarea;