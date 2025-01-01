import { WordResources, Word } from '@/types';
import { allWordResourcesMap, allWordsMap } from '@/words'; 

const loadWordResourcesServer = (languageArray: string[]) => {
  const wordsLanguage = languageArray[0];
  const initialWords = allWordsMap[wordsLanguage];
  const wordResources: WordResources = {};
  languageArray.forEach(language => {
    wordResources[language] = allWordResourcesMap[wordsLanguage][language]
  })
  return { initialWords, wordResources }
}

export { loadWordResourcesServer };