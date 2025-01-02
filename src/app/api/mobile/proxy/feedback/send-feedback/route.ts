import { NextResponse } from 'next/server';
import axios from 'axios';

import { FeedbackData } from '@/types'; 
import { AuthConfig, FeedbackBody } from '@/apiTypes';
const SERVER_URL = process.env.SERVER_URL;
 
export async function POST(req: Request) {
  const { feedbackData } = await req.json() as { feedbackData: FeedbackData }

  const body: FeedbackBody = {
    feedbackData
  };

  const authHeader = req.headers.get('authorization');
  const authToken = authHeader?.split(' ')[1];

  let config: AuthConfig | object = {};

  if (authToken) {
    config = {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }
  }

  try {
    const response = await axios.post(`${SERVER_URL}/feedback/send-feedback`, body, config)

    return NextResponse.json(response.data, { status: 201 });
  } catch (error) {
    console.error(error)
  }
}