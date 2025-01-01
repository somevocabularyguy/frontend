import React from 'react';

interface ScrollRailProps {
  'height'?: string;
  'width'?: string;
  ballSize?: string;
  lineSize?: string;
  className?: string;
}

const ScrollRail: React.FC<ScrollRailProps> = ({ height, width, ballSize, lineSize, className }) => {

    const ballStyle: React.CSSProperties = {
      backgroundColor: '#ffffff',
      width: ballSize || '0.3125rem',
      height: ballSize || '0.3125rem',
      borderRadius: '50%'
    }

    const lineStyle: React.CSSProperties = {
      backgroundColor: '#ffffff', 
      width: width ? width : lineSize || '0.125rem', 
      height: height ? height : lineSize || '0.125rem', 
      alignSelf: 'stretch',
    }

    const mainDiv: React.CSSProperties = {
      display: 'grid',
      width: width || 'auto',
      height: height || 'auto',
      ...(width
        ? { gridTemplateColumns: `${ballSize} auto ${ballSize}` }
        : { gridTemplateRows: `${ballSize} auto ${ballSize}` }
      ),
      alignItems: 'center',
      justifyItems: 'center',
    }

  return (
    <>
      <div style={mainDiv} className={className}>
        <div style={ballStyle}></div>
        <div style={lineStyle}></div>
        <div style={ballStyle}></div>
      </div>
    </>
  )
}

export default ScrollRail;