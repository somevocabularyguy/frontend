"use client";

import React from 'react';

interface ButtonProps {
  text: string;
  className?: string;
  id?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  dataInfo?: string
}


const Button: React.FC<ButtonProps> = ({ text, className, onClick, dataInfo, id }) => {
  return (
    <button data-info={dataInfo} id={id} className={className} onClick={onClick}>{text}</button>
  )
}

export default Button;