import { RGB } from '@/types';
import { defaultColorValue } from '@/constants';

const returnColorValue = (learningScore: number): RGB => {
  const colorValue = {...defaultColorValue};
  let change = learningScore * 300;
  if (change > 159) {
    change = 159;
  }
  colorValue.r -= Math.floor(0.5 * change);
  colorValue.g += Math.floor(change);
  return colorValue;
}

export { returnColorValue };