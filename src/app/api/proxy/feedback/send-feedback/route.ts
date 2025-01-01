import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import axios from 'axios';

import { FeedbackData } from '@/types'; 
import { AuthConfig, FeedbackBody } from '@/apiTypes';
 
export async function POST(req: Request) {
  const { feedbackData } = await req.json() as { feedbackData: FeedbackData }

  const body: FeedbackBody = {
    feedbackData
  };

  const cookieStore = await cookies();
  const authToken = cookieStore.get('authCookie')?.value;

  let config: AuthConfig | {} = {};

  if (authToken) {
    config = {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }
  }

  try {
    const response = await axios.post('http://localhost:5000/feedback/send-feedback', body, config)

    return NextResponse.json(response.data, { status: 201 });
  } catch (error) {
    console.error(error)
  }
}