import { Word, WordData, UserData } from '@/types'; 

const calculateLearningScoreForWord = (wordData: WordData) => {
  //! UNDERSTAND THE LOGIC!!!!!!!!!!
  if (!wordData) return 0;

  const { notShownTimeSpent, shownTimeSpent, notShownSeen, shownSeen, lastViewed } = wordData;
  const now = new Date().getTime();
  const timeSinceLastView = now - lastViewed

  const maxNotShownTimeSpent = 120000;
  const maxShownTimeSpent = 120000;
  const maxNotShownSeen = 24;
  const maxShownSeen = 12;
  const maxTimeSinceLastView = 3600000 * 24 * 7;

  const notShownTimeSpentNormalized = notShownTimeSpent / maxNotShownTimeSpent;
  const shownTimeSpentNormalized = shownTimeSpent / maxShownTimeSpent;
  const notShownSeenNormalized = notShownSeen / maxNotShownSeen;
  const shownSeenNormalized = shownSeen / maxShownSeen;
  const timeSinceLastViewNormalized = timeSinceLastView / maxTimeSinceLastView;

  const notShownTimeWeight = 0.3;
  const shownTimeWeight = -0.2;
  const notShownSeenWeight = 0.3;
  const shownSeenWeight = -0.1;
  const timeSinceLastViewWeight = -0.1;

  const learningScore = (
    (notShownTimeSpentNormalized * notShownTimeWeight) +
    (shownTimeSpentNormalized * shownTimeWeight) +
    (notShownSeenNormalized * notShownSeenWeight) +
    (shownSeenNormalized * shownSeenWeight) -
    (timeSinceLastViewNormalized * timeSinceLastViewWeight)
  );

  return learningScore;
}

const updateSingleWordData = (
  wordObject: Word, 
  shownState: boolean, 
  elapsed: number,
  userData: UserData
) => {

  const wordId = wordObject.id; 
  const now = new Date().getTime();
  
  const wordsData = userData.wordsData
  const existingWordDataIndex = wordsData.findIndex(wordData => wordData.id === wordId);

  let newWordData: WordData;

  if (existingWordDataIndex === -1) {
    newWordData = {
      id: wordId,
      notShownTimeSpent: shownState ? 0 : elapsed,
      shownTimeSpent: shownState ? elapsed : 0,
      notShownSeen: shownState ? 0 : 1,
      shownSeen: shownState ? 1 : 0,
      lastViewed: now,
      learningScore: 0
    };
    newWordData.learningScore = calculateLearningScoreForWord(newWordData)
  } else {
    const wordData = wordsData[existingWordDataIndex];
    newWordData = {
      ...wordData,
      notShownTimeSpent: wordData.notShownTimeSpent + (shownState ? 0 : elapsed),
      shownTimeSpent: wordData.shownTimeSpent + (shownState ? elapsed : 0),
      notShownSeen: (elapsed === 0) ? wordData.notShownSeen : wordData.notShownSeen + (shownState ? -1 : 1),
      shownSeen: (elapsed === 0) ? wordData.shownSeen : wordData.shownSeen + (shownState ? 1 : 0),
      lastViewed: now
    }
    newWordData.learningScore = calculateLearningScoreForWord(newWordData)
  }

  return newWordData;
}

export { updateSingleWordData, calculateLearningScoreForWord };