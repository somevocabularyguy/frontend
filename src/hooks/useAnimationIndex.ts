import { useState, useEffect } from 'react';

const useAnimationIndex = (dependency: any, interval: number, index: number) => {

  const [animationIndex, setAnimationIndex] = useState(index);
  useEffect(() => {
    const runningInterval = setInterval(() => {
      setAnimationIndex(prevIndex => prevIndex === index ? 0 : prevIndex + 1);
    }, interval);

    if (!dependency) {
      if (runningInterval) clearInterval(runningInterval);
    }

    return () => {
      if (runningInterval) clearInterval(runningInterval);
    };
  }, [dependency, interval]);

  return animationIndex;
}

export default useAnimationIndex;