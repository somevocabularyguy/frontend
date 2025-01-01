interface Word {
  readonly id: string;
  word: string;
  definition: string;
  example: string;
  synonyms: string[];
  antonyms: string[];
  frequency: string;
  difficulty: string;
  levelName: string;
  isHidden: boolean;
  isCustom: boolean;
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
  hiddenWordIds: string[];
  customWordIds: string[];
  wordsData: WordData[]
}

interface FeedbackData {
  feedbackType: string;
  feedbackText: string;
  files: File[];
}

export type { Word, LevelObject, Position, WordData, UserData, RGB, FeedbackData };