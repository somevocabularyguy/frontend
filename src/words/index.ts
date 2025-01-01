import fs from 'fs';
import { wordResourceKeys } from '@/i18nConfig';
import { Word, WordsObject } from '@/types';
 
interface AllWordResourcesMap {
  [key: string]: {
    [key: string]: WordsObject;
  }
}

interface AllWordsMap {
  [key: string]: Word[];
}

const allWordResourcesMap: AllWordResourcesMap = {}

const allWordsMap: AllWordsMap = {}

Object.keys(wordResourceKeys).forEach(key => {
  const wordsString = fs.readFileSync(`src/words/${key}/${key}-words.json`, 'utf8');
  const words = JSON.parse(wordsString) as Word[];
  allWordsMap[key] = words;

  wordResourceKeys[key].forEach(resourceLanguage => {
    const wordResourceString = fs.readFileSync(`src/words/${key}/${resourceLanguage}.json`, 'utf8');
    const wordResource = JSON.parse(wordResourceString) as WordsObject;

    if (!allWordResourcesMap[key]) {
      allWordResourcesMap[key] = {};
    }

    allWordResourcesMap[key][resourceLanguage] = wordResource;
  })
})

export { allWordResourcesMap, allWordsMap };