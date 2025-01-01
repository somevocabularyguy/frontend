// "use client";
// 
// import styles from './Dropdown.module.css';
// import { useState } from 'react';
// 
// import { OptionObject } from '@/types';
// 
// interface DropdownProps {
//   options: OptionObject[];
//   handlerFunction: (optionObject: OptionObject) => void;
//   className?: string;
// }
// 
// const Dropdown:React.FC<DropdownProps> = ({ options, handlerFunction, className }) => {
// 
//   const [selectedType, setSelectedType] = useState<OptionObject>({ key: '', text: '-- Select Feedback Type --' });
// 
//   const selectTypeButtonStyle = `${styles.selectTypeButton} ${isSelectActive ? styles.selectTypeButtonActive : ''}`;
// 
//   return (
//     <div className={className}>
//       <div className={selectTypeButtonStyle} onClick={toggleSelect}>
//         <div className={styles.selectTypeButtonInnerContainer}>
//           <Text text={selectedType.text} className={styles.selectTypeButtonText} />
//           <ArrowIcon className={styles.selectTypeArrowIcon} fill="black" />
//         </div>
//       </div>
// 
//         
//     </div>
//   )
// }
// 
// export default Dropdown;