"use client";

import { Text } from '@/components/atoms/index';
import { useTranslate } from '@/hooks';

interface TextArrayProps {
  array: string[];
  arrayName: string;
  itemClassName?: string;
  textType?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

const TextArray: React.FC<TextArrayProps> = ({ array, arrayName, itemClassName, textType = 'inline' }) => {

  const translate = useTranslate();

  return (
    <>
      {array.map((item, index, array) => {
        if (textType === 'block' || index === array.length - 1) {
          return (
            <Text 
              key={`${arrayName}${index}`} 
              text={item} 
              className={itemClassName} 
              as='span'
              onClick={() => translate(item)}
            />
          )
        } else {
          return (
            <>
              <Text 
                key={`${arrayName}${index}`} 
                text={item} 
                className={itemClassName} 
                as='span'
                onClick={() => translate(item)}
              />
              <Text text="-"/>
            </>
          )
        }
      })}
    </>
  )
}

export default TextArray;