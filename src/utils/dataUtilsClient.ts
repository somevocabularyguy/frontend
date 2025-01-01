import { getLanguageResources } from '@/lib/api';

const loadWordResourcesClient = async (oldLanguageArray: string[], newLanguageArray: string[]) => {

  let wordsLanguage: string = newLanguageArray[0];
  let newWordsLanguage: string | null = null;
  let languageDifference: string[] = [];

  if (newLanguageArray[0] !== oldLanguageArray[0]) {
    newWordsLanguage = newLanguageArray[0];
  }

  newLanguageArray.forEach(language => {
    if (!oldLanguageArray.includes(language)) {
      languageDifference.push(language);
    }
  })

  const { requestedWords, requestedWordResources } = await getLanguageResources(wordsLanguage, languageDifference, newWordsLanguage);

  return { requestedWords, requestedWordResources };
}

export { loadWordResourcesClient };