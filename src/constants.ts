import { UserData, Word, RGB } from './types';

const defaultUserData: UserData = {
  totalUseTime: 0,
  languageArray: ['en'],
  hiddenWordIds: [],
  customWordIds: [],
  wordsData: []
}

const finishWord: Word = {
  id: '',
  rank: 0,
  difficulty: 'finish',
  levelName: '',
}

const defaultColorValue: RGB = {
  r: 128,
  g: 128,
  b: 128
}

export { defaultUserData, finishWord, defaultColorValue };