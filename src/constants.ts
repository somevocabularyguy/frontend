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

const FRONTEND_URL = process.env.NODE_ENV === 'production' ? 'http://164.90.157.50' : 'http://localhost:3000'

export { defaultUserData, finishWord, defaultColorValue, FRONTEND_URL };