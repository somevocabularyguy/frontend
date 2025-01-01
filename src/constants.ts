import { UserData, Word, RGB } from './types';

const defaultUserData: UserData = {
  totalUseTime: 0,
  hiddenWordIds: [],
  customWordIds: [],
  wordsData: []
}

const templateUserData: UserData = {
  totalUseTime: 0,
  hiddenWordIds: [],
  customWordIds: [],
  wordsData: []
}

const finishWord: Word = {
  id: '0',
  word: '🎉🎉🎉Finish🎉🎉🎉',
  definition: '',
  example: '',
  synonyms: [],
  antonyms: [],
  frequency: '0',
  difficulty: '',
  levelName: '',
  isHidden: false,
  isCustom: false
}

const selectLevelWord: Word = {
  id: '0',
  word: 'Please Select Level',
  definition: '',
  example: '',
  synonyms: [],
  antonyms: [],
  frequency: '0',
  difficulty: '',
  levelName: '',
  isHidden: false,
  isCustom: false
}

const defaultColorValue: RGB = {
  r: 128,
  g: 128,
  b: 128
}

export { defaultUserData, finishWord, selectLevelWord, templateUserData, defaultColorValue };