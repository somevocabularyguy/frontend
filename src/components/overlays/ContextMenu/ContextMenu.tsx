import styles from './ContextMenuStyles.module.css';
import React from 'react';
import { useContextMenuItems } from '@/hooks';


import { useAppSelector } from '@/store/store';

const ContextMenu: React.FC = () => {

  const contextMenuItems = useContextMenuItems();

  const contextMenuPosition = useAppSelector(state => state.ui.contextMenuPosition);

  if (!contextMenuPosition || !contextMenuItems) return null;

  return (
    <div
      className={styles.contextMenu}
      style={{ top: `${contextMenuPosition.y}px`, left: `${contextMenuPosition.x}px` }}
    >
      {contextMenuItems.map((item, index) => (
        <div 
          key={`contextMenuItem${index}`} 
          className={styles.contextMenuItem} 
          onClick={item.onClick}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
}

export default ContextMenu;