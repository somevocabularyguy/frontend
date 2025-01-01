import { UserData } from '@/types';
import { defaultUserData } from '@/constants';

const compareUserData = (userData1: UserData, userData2: UserData) => {
  if (userData1.totalUseTime > userData2.totalUseTime) {
    return userData1;
  } else {
    return userData2;
  }
}

const returnUserData = (storedUserData: UserData | null, serverUserData: UserData | null) => {
  let newUserData: UserData | null = null;

  if (storedUserData && serverUserData) {
    newUserData = compareUserData(storedUserData, serverUserData);
  } else if (storedUserData) {
    newUserData = storedUserData;
  } else if (serverUserData) {
    newUserData = serverUserData;
  } else {
    newUserData = defaultUserData;
  }

  return newUserData;
}


export { returnUserData };