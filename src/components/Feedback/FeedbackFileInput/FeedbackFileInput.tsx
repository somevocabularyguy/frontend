import styles from './FeedbackFileInput.module.css';
import { useEffect } from 'react';
import { DeleteIcon } from '@/public/icons';
import { useCustomTranslation } from '@/hooks';

import { useAppSelector, useAppDispatch } from '@/store/store';
import { updateImageUrls, updateIsSended } from '@/store/feedbackSlice';

interface FeedbackFileInputProps {
  files: File[];
  setFiles: (value: React.SetStateAction<File[]>) => void;
}

const FeedbackFileInput: React.FC<FeedbackFileInputProps> = ({ files, setFiles}) => {
  const dispatch = useAppDispatch();
  const { t } = useCustomTranslation("Feedback.FeedbackFileInput")

  const imageUrls = useAppSelector(state => state.feedback.imageUrls);


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files)
      setFiles([...files, ...newFiles]);
      dispatch(updateIsSended(false));
    }
  };

  useEffect(() => {
    const newUrls = files.map(file => {
      return file.type.startsWith('image/') ? URL.createObjectURL(file) : '';
    });
    dispatch(updateImageUrls(newUrls));
  }, [files])

  const removeFile = (fileName: string): void => {
    const updatedFiles = [...files];
    const index = updatedFiles.findIndex(file => file.name === fileName)
    updatedFiles.splice(index, 1);
    if (imageUrls[index]) {
      URL.revokeObjectURL(imageUrls[index]);
    }
    setFiles(updatedFiles);
  };

  return (
    <label className={styles.attachmentContainer} onDragOver={(e) => e.preventDefault()}>
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        multiple
        onChange={handleFileChange}
      />

      {files.length > 0 ? files.map((file, index) => {
        const imageURL = imageUrls[index];
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
      }) : <p className={styles.selectFileText}>{t("label")}</p>}

    </label>
  )
}

export default FeedbackFileInput;