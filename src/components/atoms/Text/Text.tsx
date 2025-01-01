"use client";

import React from 'react';

interface TextProps {
  text?: string;
  className?: string;
  style?: Object;
  as?: 'span' | 'p' | 'label' | 'h2' | 'h3'; 
  onClick?: React.MouseEventHandler<HTMLElement>;
  onContextMenu?:  React.MouseEventHandler<HTMLElement>;
}


const Text: React.FC<TextProps> = ({ text, className, style, as: Component = 'p', onContextMenu, onClick }) => {
  return (
    <Component
      style={style || {}}
      className={className || ''} 
      onClick={onClick} 
      onContextMenu={onContextMenu}
    >{text}</Component>
  )
}

export default Text;