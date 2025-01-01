"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './styles.module.css';

import { FeedbackData } from '@/types'; 
import { sendFeedbackData } from '@/lib/api';

import { DeleteIcon } from '@/public/icons'; 

const FeedbackPage: React.FC = () => {

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [feedbackType, setFeedbackType] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const [isSended, setIsSended] = useState(false);

  const handleFeedbackTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFeedbackType(event.target.value);
  }

  const handleTextareaInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedbackText(event.target.value);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files)

      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  useEffect(() => {
    const URLs = files.map(file => {
      return file.type.startsWith('image/') ? URL.createObjectURL(file) : ''
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

  return (
    <form className={styles.form}>

      <h1 className={isSended ? styles.thanksDiv : styles.hidden}>Thanks for your feedback!</h1>

      <div className={styles.selectTypeContainer}>
        <label className={styles.label} htmlFor="feedbackType">Select Feedback Type:</label>
        <select
          id="feedbackType"
          className={styles.selectType}
          value={feedbackType}
          onChange={handleFeedbackTypeChange}
        >
          <option value="">-- Select Feedback Type --</option>
          <option value="bug">Bug Report</option>
          <option value="feature">Feature Request</option>
          <option value="usability">Usability Feedback</option>
          <option value="performance">Performance Issue</option>
          <option value="general">General Feedback</option>
          <option value="complaint">Complaint</option>
          <option value="accessibility">Accessibility Feedback</option>
          <option value="appreciation">Compliment / Appreciation</option>
        </select>
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

        {files[0] ? files.map((file, index) => {
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
              <Image 
                key={index} 
                className={styles.image} 
                src={imageURLs[index]}
                alt={file.name}
              />
            </div>
          )
        }) : <p className={styles.selectFileText}>Attach Screenshots (Optional)</p>}

      </label>

      <button className={styles.submitButton} onClick={handleSubmit}>Submit Feedback</button>
    </form>

  )
}


export default FeedbackPage;