interface Word {
  readonly id: string;
  readonly rank: number;
  difficulty: string;
  levelName: string;
}

interface WordObject {
  word: string,
  meaning: string,
  example: string,
  synonyms: string[],
  antonyms: string[]
}

interface WordsObject {
  [key: string]: WordObject;
}

interface WordResources {
  [key: string]: WordsObject;
}

interface AllWordResources {
  [key: string]: WordResources;
}

interface LevelObject {
  levelName: string,
  colorValue: RGB,
  wordIds: string[]
}

interface Position {
  x: number;
  y: number;
}

interface RGB {
  r: number;
  g: number;
  b: number
}

interface WordData {
  id: string;
  notShownTimeSpent: number;
  shownTimeSpent: number;
  notShownSeen: number;
  shownSeen: number;
  lastViewed: number;
  learningScore: number
}

interface UserData {
  totalUseTime: number;
  languageArray: string[];
  hiddenWordIds: string[];
  customWordIds: string[];
  wordsData: WordData[]
}

interface FeedbackData {
  feedbackType: string;
  feedbackText: string;
  files: File[];
}

interface OptionObject {
  key: string;
  text: string;
}

export type { Word, LevelObject, Position, WordData, UserData, RGB, FeedbackData, OptionObject, WordObject, WordsObject, WordResources, AllWordResources };