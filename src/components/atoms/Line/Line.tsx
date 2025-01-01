import React from 'react';

interface LineProps {
  'height'?: string;
  'width'?: string;
  className?: string;
}

const Line: React.FC<LineProps> = ({ height, width, className }) => {
    const inlineStyle: React.CSSProperties = {
      height: height || '0.125rem',
      width: width || '0.125rem',  
      backgroundColor: '#ffffff',
    }

  return (
    <>
      <div style={inlineStyle} className={className}></div>
    </>
  )
}

export default Line;