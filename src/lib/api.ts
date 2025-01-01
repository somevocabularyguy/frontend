import { UserData, FeedbackData, Word, WordResources } from '@/types';
import { AuthConfig } from '@/apiTypes';
import axios from 'axios';

const getUserData = async (authToken: string): Promise<UserData | null> => {
  const config: AuthConfig = {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  }

  try {
    const response = await axios.get(`http://localhost:3000/api/web/proxy/data/get-user-data`, config);
    return response.data;
  } catch (error) {
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
    const response = await axios.post(`http://localhost:3000/api/web/proxy/data/sync-user-data`, { userDataToSync }, { withCredentials: true });
    return response.data as { serverUserData: UserData } | null;
  } catch (error) {
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
    const response = await axios.get(`http://localhost:3000/api/web/proxy/entry/verify-sign-in`, { withCredentials: true });
    if (response.status === 200) {
      return 'verified';
    }
    return null;
  } catch (error) {
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
  const response = await axios.post(`/api/web/proxy/entry/send-magic-link`, { email });
  return response;
}

const sendFeedbackData = async (feedbackData: FeedbackData) => {
  const response = await axios.post(`http://localhost:3000/api/web/proxy/feedback/send-feedback`, { feedbackData }, { withCredentials: true })
  return response;
}

const logout = async () => {
  const response = await axios.get('http://localhost:3000/api/web/logout', { withCredentials: true });
  return response
}

const deleteAccount = async () => {
  const response = await axios.delete('http://localhost:3000/api/web/proxy/entry/delete-account', { withCredentials: true });
  return response;
}

const getLanguageResources = async (
  wordsLanguage: string, 
  languageArray: string[], 
  newWordsLanguage?: string | null
) => {
  const response = await axios.post('http://localhost:3000/api/web/get-language-resources', { wordsLanguage, languageArray, newWordsLanguage });

  const { 
    requestedWords, 
    requestedWordResources 
    } = response.data as { 
    requestedWords: Word[] | null, 
    requestedWordResources: WordResources | null 
  };

  return { requestedWords, requestedWordResources };
}

export { getUserData, sendMagicLink, sendFeedbackData, logout, deleteAccount, verifySignIn, syncUserData, getLanguageResources };