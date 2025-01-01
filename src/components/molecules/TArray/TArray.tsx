"use client";

import { useAppSelector } from '@/store/store';
import { TText, Text } from '@/components/atoms';
import React from 'react';

interface TArrayProps {
  wordId: string;
  arrayKey: 'synonyms' | 'antonyms';
  itemClassName?: string;
  dashClassName?: string
}

const TArray: React.FC<TArrayProps> = ({ wordId, arrayKey, itemClassName, dashClassName }) => {

  if (!wordId) return null;

  const wordResources = useAppSelector(state => state.language.wordResources);
  const languageArray = useAppSelector(state => state.userData.userData.languageArray);
  const array = wordResources[languageArray[0]][wordId][arrayKey];

  return (
    <>
      {array.map((string, index) => (
        <React.Fragment key={string + index}>
          <TText 
            wordId={wordId} 
            arrayKey={arrayKey} 
            arrayIndex={index} 
            className={itemClassName} 
          />
          <Text className={dashClassName}>{index !== array.length - 1 && '-'}</Text>
        </React.Fragment>
      ))}
    </>
  )
}

export default TArray;