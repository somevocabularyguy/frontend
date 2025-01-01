"use client";

import styles from './Dropdown.module.css';
import { useState } from 'react';

import { ArrowIcon } from '@/public/icons'; 
import { OptionObject } from '@/types';
import { Text } from '@/components/atoms';

interface DropdownProps {
  options: OptionObject[];
  defaultKey?: string;
  activityBoolean: boolean;
  toggleFunction: () => void;
  dispatcherFunction: (optionObject: OptionObject) => void;
  widthProp?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ options, defaultKey, activityBoolean, toggleFunction, dispatcherFunction, widthProp }) => {

  const [currentSelection, setCurrentSelection] = useState<OptionObject>(() => {
    return defaultKey ? 
      options.filter(option => option.key === defaultKey)[0] : 
        options[0];
  }) 

  const dispatchHandler = (optionObject: OptionObject) => {
    dispatcherFunction(optionObject);
    setCurrentSelection(optionObject);
    toggleFunction();
  }

  const dropdownButtonStyle = `${styles.dropdownButton} ${activityBoolean ? styles.dropdownButtonActive : ''}`;
  const dropdownArrowIconStyle = `${styles.dropdownArrowIcon} ${activityBoolean ? styles.dropdownArrowIconActive : ''}`;

  return (
    <div className={styles.container} style={{ width: widthProp || '' }}>
      <div className={dropdownButtonStyle} onClick={toggleFunction}>
        <Text text={currentSelection.text} className={styles.dropdownButtonText} as="span" />
        <ArrowIcon className={dropdownArrowIconStyle} fill="black" />
      </div>

      {activityBoolean &&
        <div className={styles.optionsContainer}>
          {options.map((optionObject, index) => {
            return (
              <div 
                key={optionObject.key + index} 
                className={styles.option} 
                onClick={() => dispatchHandler(optionObject)}
              >
                <Text text={optionObject.text} className={styles.optionText} as="span" />
              </div>
            )
          })}      
        </div>
        }
    </div>
  )
}

export default Dropdown;