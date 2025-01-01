"use client";

import React from 'react';

interface TextProps {
  children?: React.ReactNode;
  className?: string;
  style?: Object;
  as?: 'span' | 'p' | 'label' | 'h2' | 'h3'; 
  onClick?: React.MouseEventHandler<HTMLElement>;
  onContextMenu?:  React.MouseEventHandler<HTMLElement>;
}

const Text: React.FC<TextProps> = ({ children = '', className, style, as: Component = 'span', onContextMenu, onClick }) => {
  return (
    <Component
      style={style || {}}
      className={className || ''} 
      onClick={onClick} 
      onContextMenu={onContextMenu}
    >{children}</Component>
  )
}

export default Text;