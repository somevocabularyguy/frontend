import { WordResources, Word } from '@/types';
import fs from 'fs';

const loadWordResources = (languageArray: string[]) => {
  const wordLanguage = languageArray[0];
  const wordsFile = fs.readFileSync(`src/words/${wordLanguage}/${wordLanguage}-words.json`, 'utf8');
  const initialWords = JSON.parse(wordsFile) as Word[]; 
  const wordResources: WordResources = {};
  languageArray.forEach(language => {
    const wordResourceString = fs.readFileSync(`src/words/${wordLanguage}/${language}.json`, 'utf8');
    wordResources[language] = JSON.parse(wordResourceString);
  })
  return { initialWords, wordResources }
}

export { loadWordResources };