import { UserData, FeedbackData } from '@/types';
import { AuthConfig } from '@/apiTypes';
import axios from 'axios';

const getUserData = async (authToken: string): Promise<UserData | null> => {
  const config: AuthConfig = {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  }

  try {
    const response = await axios.get(`http://localhost:3000/api/proxy/data/get-data`, config);
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

const sendMagicLink = async (email: string) => {
  const response = await axios.post(`/api/proxy/entry/send-magic-link`, { email });
  return response;
}

const sendFeedbackData = async (feedbackData: FeedbackData) => {
  const response = await axios.post(`http://localhost:3000/api/proxy/feedback/send-feedback`, { feedbackData }, { withCredentials: true })
  return response;
}

const logout = async () => {
  const response = await axios.get('http://localhost:3000/api/logout', { withCredentials: true });
  return response
}

const deleteAccount = async () => {
  const response = await axios.delete('http://localhost:3000/api/proxy/entry/delete-account', { withCredentials: true });
  return response;
}

export { getUserData, sendMagicLink, sendFeedbackData, logout, deleteAccount };