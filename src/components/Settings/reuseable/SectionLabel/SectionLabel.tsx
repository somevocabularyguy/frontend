import styles from './SectionLabel.module.css';

import { ArrowIcon } from '@/public/icons';
import { Text } from '@/components/atoms';

interface SectionLabelProps {
  handleToggleSection:  React.MouseEventHandler<HTMLElement>;
  labelText: string;
  isVisible: boolean;
}

const SectionLabel: React.FC<SectionLabelProps> = ({ handleToggleSection, labelText, isVisible }) => {

  const sectionToggleIconClassName = `${styles.sectionToggleIcon} 
    ${isVisible ? styles.sectionToggleIconActive : ''}`;

  return (
    <div onClick={handleToggleSection} className={styles.sectionLabelContainer}>
      <Text className={styles.sectionLabel} text={labelText} as="h2"/>
      <ArrowIcon className={sectionToggleIconClassName}/>
    </div>
  )
}

export default SectionLabel;