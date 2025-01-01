"use client";

import React from 'react';

interface TextProps {
  text?: string;
  className?: string;
  as?: 'span' | 'p' | 'h2' | 'label'; 
  onClick?: React.MouseEventHandler<HTMLElement>;
  onContextMenu?:  React.MouseEventHandler<HTMLElement>;
}


const Text: React.FC<TextProps> = ({ text, className, as: Component = 'p', onContextMenu, onClick }) => {
  return (
    <Component
      className={className || ''} 
      onClick={onClick} 
      onContextMenu={onContextMenu}
    >{text}</Component>
  )
}

export default Text;