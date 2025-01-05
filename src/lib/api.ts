import pako from 'pako'; 
import { UserData, FeedbackData, Word, WordResources } from '@/types';
import { AuthConfig } from '@/apiTypes';
import axios from 'axios';

import { FRONTEND_URL } from '@/constants';

const getUserData = async (authToken: string): Promise<UserData | null> => {
  console.log("🚀 ~ file: api.ts:8 ~ authToken:", authToken);
  const config: AuthConfig = {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  }

  try {
    const response = await axios.get(`${FRONTEND_URL}/api/web/proxy/data/get-user-data`, config);
    console.log("🚀 ~ file: api.ts:18 ~ response:", response);
    return response.data;
  } catch (error) {
    console.log("🚀 ~ file: api.ts:20 ~ error:", error);
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNREFUSED') {
        console.log('Error: Could not connect to the server. Please check if the server is running.');
      }
    } else {
      console.error(error)
    }

    return null;
  }
}

const syncUserData = async (userDataToSync: UserData | null = null) => {
  try {
    const response = await axios.post(`${FRONTEND_URL}/api/web/proxy/data/sync-user-data`, { userDataToSync }, { withCredentials: true });
    console.log("🚀 ~ file: api.ts:37 ~ response:", response);
    return response.data as { serverUserData: UserData } | null;
  } catch (error) {
    console.log("🚀 ~ file: api.ts:39 ~ error:", error);
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNREFUSED') {
        console.log('Error: Could not connect to the server. Please check if the server is running.');
      }
    } else {
      console.error(error)
    }

    return null;
  }
}

const verifySignIn = async (): Promise<string | null> => {
  try {
    const response = await axios.get(`${FRONTEND_URL}/api/web/proxy/entry/verify-sign-in`, { withCredentials: true });
    if (response.status === 200) {
      console.log("🚀 ~ file: api.ts:56 ~ response:", response);
      return 'verified';
    }
    return null;
  } catch (error) {
    console.log("🚀 ~ file: api.ts:61 ~ error:", error);
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNREFUSED') {
        console.log('Error: Could not connect to the server. Please check if the server is running.');
      } else if (error.code === 'ETIMEDOUT') {
        console.log('Error: Request timed out. Server may be slow or unreachable.');
      } else {
        // console.log(`Axios Error: ${error.message}`);
      }
      if (error.status === 401) {
        return 'expired';
      } else if (error.status === 403) {
        return 'not-verified';
      }
    }
    return null;
  }
}

const sendMagicLink = async (email: string) => {
  console.log("🚀 ~ file: api.ts:81 ~ email:", email);
  const response = await axios.post(`${FRONTEND_URL}/api/web/proxy/entry/send-magic-link`, { email });
  console.log("🚀 ~ file: api.ts:84 ~ response:", response);
  return response;
}

const sendFeedbackData = async (feedbackData: FeedbackData) => {
  console.log("🚀 ~ file: api.ts:88 ~ feedbackData:", feedbackData);
  const response = await axios.post(`${FRONTEND_URL}/api/web/proxy/feedback/send-feedback`, { feedbackData }, { withCredentials: true })
  console.log("🚀 ~ file: api.ts:91 ~ response:", response);
  return response;
}

const logout = async () => {
  const response = await axios.get(`${FRONTEND_URL}/api/web/logout`, { withCredentials: true });
  console.log("🚀 ~ file: api.ts:97 ~ response:", response);
  return response
}

const deleteAccount = async () => {
  const response = await axios.delete(`${FRONTEND_URL}/api/web/proxy/entry/delete-account`, { withCredentials: true });
  console.log("🚀 ~ file: api.ts:103 ~ response:", response);
  return response;
}

const deleteProgressData = async () => {
  const response = await axios.delete(`${FRONTEND_URL}/api/web/proxy/data/delete-progress-data`, { withCredentials: true });
  console.log("🚀 ~ file: api.ts:103 ~ response:", response);
  return response;
}

const getWordResources = async (
  wordsLanguage: string, 
  languageArray: string[], 
  newWordsLanguage?: string | null
) => {
  console.time('Waiting Language: ')

  const promises = languageArray.map(language => axios.get(`${FRONTEND_URL}/words/${wordsLanguage}/${language}.json.gz`,  { responseType: 'arraybuffer' }));

  let requestedWords: Word[] | null = null;
  if (newWordsLanguage) {
    const response = await axios.get(`${FRONTEND_URL}/words/${newWordsLanguage}/${newWordsLanguage}-words.json.gz`,  { responseType: 'arraybuffer' });
    const decompressedData = pako.ungzip(response.data, { to: 'string' });
    requestedWords = JSON.parse(decompressedData);
  }

  const responses = await Promise.all(promises);
  const requestedWordResources: WordResources = {};
  responses.forEach((response, index) => {
    const currentLanguage = languageArray[index];
    const decompressedData = pako.ungzip(response.data, { to: 'string' });
    requestedWordResources[currentLanguage] = JSON.parse(decompressedData)
  });

  console.timeEnd('Waiting Language: ')

  return { requestedWords, requestedWordResources };
}

export { getUserData, sendMagicLink, sendFeedbackData, logout, deleteAccount, verifySignIn, syncUserData, getWordResources, deleteProgressData };