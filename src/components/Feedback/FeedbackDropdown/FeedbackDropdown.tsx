import styles from './FeedbackDropdown.module.css';
import { OptionObject } from '@/types';

import { Text } from '@/components/atoms';
import { ArrowIcon } from '#/public/icons'; 
import { useCustomTranslation } from '@/hooks';

import { useAppSelector, useAppDispatch } from '@/store/store';
import { updateIsFeedbackDropdownActive } from '@/store/feedbackUiSlice';
import { updateSelectedTypeObject, updateIsSended, updateIsError } from '@/store/feedbackSlice';

const FeedbackDropdown: React.FC = () => {
  const dispatch = useAppDispatch();
  const t = useCustomTranslation("Feedback.FeedbackDropdown")

  const isFeedbackDropdownActive = useAppSelector(state => state.feedbackUi.isFeedbackDropdownActive)
  const isSended = useAppSelector(state => state.feedback.isSended);
  const isError = useAppSelector(state => state.feedback.isError);
  const selectedTypeObject = useAppSelector(state => state.feedback.selectedTypeObject);

  const toggleDropdown = () => {
    dispatch(updateIsFeedbackDropdownActive(!isFeedbackDropdownActive))
    if (isError) {
      dispatch(updateIsError(false));
    }
  }

  const handleFeedbackTypeChange = (typeObject: OptionObject) => {
    dispatch(updateSelectedTypeObject(typeObject));
    dispatch(updateIsFeedbackDropdownActive(false));
    if (isSended) {
      dispatch(updateIsSended(false));
    }
    if (isError) {
      dispatch(updateIsError(false));
    }
  }

  const dropdownButtonClassName = `${styles.dropdownButton} ${isFeedbackDropdownActive ? styles.dropdownButtonActive : isError ? styles.error : ''}`;
  const dropdownArrowIconClassName = `${styles.dropdownArrowIcon} ${isFeedbackDropdownActive ? styles.dropdownArrowIconActive : ''}`;

  const options: OptionObject[] = [
    { key: '', text: t("Options.select") },
    { key: 'bug', text: t("Options.bug") },
    { key: 'feature', text: t("Options.feature") },
    { key: 'usability', text: t("Options.usability") },
    { key: 'performance', text: t("Options.performance") },
    { key: 'general', text: t("Options.general") },
    { key: 'accessibility', text: t("Options.accessibility") },
    { key: 'complaint', text: t("Options.complaint") },
    { key: 'appreciation', text: t("Options.compliment") },
  ]


  return (
    <div className={styles.feedbackTypeContainer}>
      <Text className={styles.dropdownLabel}>{t("label")}</Text>
      <div className={styles.dropdownButtonContainer}>
        <div className={dropdownButtonClassName} onClick={toggleDropdown}>
          <Text className={styles.dropdownButtonText}>{selectedTypeObject.text}</Text>
          <ArrowIcon className={dropdownArrowIconClassName} fill="black" />
        </div>

        {isFeedbackDropdownActive &&
          <div className={styles.optionsContainer}>
            {options.map((optionObject, index) => {
              return (
                <div 
                  key={optionObject.key + index} 
                  className={styles.option} 
                  onClick={() => handleFeedbackTypeChange(optionObject)}
                >
                  <Text className={styles.optionText}>{optionObject.text}</Text>
                </div>
              )
            })}      
          </div>
          }

      </div>
    </div>
  )
}

export default FeedbackDropdown;