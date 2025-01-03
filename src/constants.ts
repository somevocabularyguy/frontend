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

const BACKEND_URL = 'http://164.90.157.50'

export { defaultUserData, finishWord, defaultColorValue, BACKEND_URL };