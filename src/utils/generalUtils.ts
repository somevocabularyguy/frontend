const extractParts = (levelName: string) => {
  const match = levelName.match(/(\D+)(\d+)/);
  if (match) {
    const string = match[1];
    const number = parseInt(match[2], 10);
    return { string, number };
  }
  return { string: null, number: null };
};

export { extractParts };