"use client";

// WELCOME TO HELL

import { useState, useEffect, useRef } from 'react';
import styles from './styles.module.css';

import { Text } from '@/components/atoms';

import { useAppSelector, useAppDispatch } from '@/store/store';
import { updateIsFeedbackDropdownActive } from '@/store/feedbackUiSlice';

import { FeedbackData, OptionObject } from '@/types'; 
import { sendFeedbackData } from '@/lib/api';

import { DeleteIcon, ArrowIcon } from '@/public/icons'; 

const FeedbackPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const isFeedbackDropdownActive = useAppSelector(state => state.feedbackUi.isFeedbackDropdownActive)

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [feedbackType, setFeedbackType] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const [isSended, setIsSended] = useState(false);

  const [selectedType, setSelectedType] = useState<OptionObject>({ key: '', text: '-- Select Feedback Type --' });

  const options: OptionObject[] = [
    { key: '', text: '-- Select Feedback Type --' },
    { key: 'bug', text: 'Bug Report' },
    { key: 'feature', text: 'Feature Request' },
    { key: 'usability', text: 'Usability Feedback' },
    { key: 'performance', text: 'Performance Issue' },
    { key: 'general', text: 'General Feedback' },
    { key: 'accessibility', text: 'Accessibility Feedback' },
    { key: 'complaint', text: 'Complaint' },
    { key: 'appreciation', text: 'Compliment / Appreciation' },
  ]

  const handleFeedbackTypeChange = (typeObject: OptionObject) => {
    setSelectedType(typeObject);
    setFeedbackType(typeObject.key);
    dispatch(updateIsFeedbackDropdownActive(false));
    if (isSended) {
      setIsSended(false);
    }
  }

  const handleTextareaInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedbackText(event.target.value);
    if (isSended) {
      setIsSended(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files)
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  useEffect(() => {
    const URLs = files.map(file => {
      return file.type.startsWith('image/') ? URL.createObjectURL(file) : '';
    });
    setImageURLs(URLs);
  }, [files])

  const removeFile = (fileName: string): void => {
    setFiles(prevFiles => {
      const updatedFiles = [...prevFiles];
      const index = updatedFiles.findIndex(file => file.name === fileName)
      updatedFiles.splice(index, 1);
      if (imageURLs[index]) {
        URL.revokeObjectURL(imageURLs[index]);
      }
      return updatedFiles;
    });
  };

  const handleSubmit = async (event: React.MouseEvent) => {

    event.preventDefault()

    const feedbackObject: FeedbackData = {
      feedbackType: feedbackType,
      feedbackText: feedbackText,
      files: files
    }

    try {
      const response = await sendFeedbackData(feedbackObject)
      if (response.status === 201) {
        setIsSended(true);
        setFeedbackType('');
        setFeedbackText('');
        setFiles([]);
        for (let i = 0; i < imageURLs.length; i++) {
          URL.revokeObjectURL(imageURLs[i]);
        }
        setImageURLs([]);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const dropdownButtonStyle = `${styles.dropdownButton} ${isFeedbackDropdownActive ? styles.dropdownButtonActive : ''}`;
  const dropdownArrowIconStyle = `${styles.dropdownArrowIcon} ${isFeedbackDropdownActive ? styles.dropdownArrowIconActive : ''}`;

  const toggleDropdown = () => {
    dispatch(updateIsFeedbackDropdownActive(!isFeedbackDropdownActive))
  }
  const closeDropdown = () => {
    if (isFeedbackDropdownActive) {
      dispatch(updateIsFeedbackDropdownActive(false));
    }
  }

  return (  
    <div className={styles.container} onClick={closeDropdown}>
      <form className={styles.form}>

        <h1 className={isSended ? styles.thanksDiv : styles.hidden}>Thanks for your feedback!</h1>

        <div className={styles.feedbackTypeContainer}>
          <Text className={styles.dropdownLabel} text="Select Feedback Type:" as="span" />
          <div className={dropdownButtonStyle} onClick={toggleDropdown}>
            <Text text={selectedType.text} className={styles.dropdownButtonText} as="span" />
            <ArrowIcon className={dropdownArrowIconStyle} fill="black" />
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
                    <Text text={optionObject.text} className={styles.optionText} />
                  </div>
                )
              })}      
            </div>
            }

        </div>


        <div className={styles.textareaContainer}>
          <label htmlFor="description">Describe Your Feedback:</label>
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

        <label className={styles.attachmentContainer} onDragOver={(e) => e.preventDefault()}>
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            multiple
            onChange={handleFileChange}
          />

          {files.length > 0 ? files.map((file, index) => {
            const imageURL = imageURLs[index];
            return (
              <div className={styles.imageContainer} key={`image${index}`}>
                <div className={styles.imageStrip}>
                  {file.name}
                  <DeleteIcon 
                    onClick={(event: React.MouseEvent) => {
                      event.preventDefault();
                      removeFile(file.name)
                    }} 
                    className={styles.deleteIcon} 
                  />
                </div>
                {imageURL && (
                  <img 
                    key={index} 
                    className={styles.image} 
                    src={imageURL} 
                    alt={file.name} 
                  />
                )}
              </div>
            )
          }) : <p className={styles.selectFileText}>Attach Screenshots (Optional)</p>}

        </label>

        <button className={styles.submitButton} onClick={handleSubmit}>Submit Feedback</button>
      </form>
    </div>

  )
}


export default FeedbackPage;