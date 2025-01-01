import { FeedbackData } from '@/types';

interface FeedbackBody {
  feedbackData: FeedbackData;
}

interface AuthConfig {
  headers: {
    Authorization: string;
  };
}

interface EmailBody {
  email: string;
}

export type { FeedbackBody, AuthConfig, EmailBody }