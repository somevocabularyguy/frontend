import { WordResources, Word } from '@/types'; 
import { allWordResourcesMap, allWordsMap } from '@/words'; 

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { wordsLanguage, languageArray, newWordsLanguage } = (await req.json())as { wordsLanguage: string, languageArray: string[] | null, newWordsLanguage: string | null };
  console.log("🚀 ~ file: route.ts:8 ~ newWordsLanguage:", newWordsLanguage);
  console.log("🚀 ~ file: route.ts:8 ~ languageArray:", languageArray);
  console.log("🚀 ~ file: route.ts:8 ~ wordsLanguage:", wordsLanguage);

  let requestedWords: Word[] | null = null;
  if (newWordsLanguage) {
    requestedWords = allWordsMap[newWordsLanguage]
  }

  let requestedWordResources: WordResources | null = {};
  if (languageArray?.length) {
    console.log("🚀 ~ file: route.ts:19 ~ languageArray:", languageArray);
    languageArray.forEach(language => {
      console.log("🚀 ~ file: route.ts:25 ~ language:", language);
      if (requestedWordResources) {
        requestedWordResources[language] = allWordResourcesMap[wordsLanguage][language];
      }
    })
  } else {
    requestedWordResources = null;
  }

  return NextResponse.json({ requestedWords, requestedWordResources }, { status: 200 });
}