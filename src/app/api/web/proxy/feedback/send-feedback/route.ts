import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import axios from 'axios';

import { FeedbackData } from '@/types'; 
import { AuthConfig, FeedbackBody } from '@/apiTypes';
import { BACKEND_URL } from '@/constants';
 
export async function POST(req: Request) {
  const { feedbackData } = await req.json() as { feedbackData: FeedbackData }
  console.log("🚀 ~ file: route.ts:11 ~ feedbackData:", feedbackData);

  const body: FeedbackBody = {
    feedbackData
  };

  const cookieStore = await cookies();
  const authToken = cookieStore.get('authCookie')?.value;
  console.log("🚀 ~ file: route.ts:19 ~ authToken:", authToken);

  let config: AuthConfig | object = {};

  if (authToken) {
    config = {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }
  }

  try {
    const response = await axios.post(`${BACKEND_URL}/feedback/send-feedback`, body, config)
    console.log("🚀 ~ file: route.ts:34 ~ response.status:", response.status);

    return NextResponse.json(response.data, { status: 201 });
  } catch (error) {
    console.error(error)
    console.log("🚀 ~ file: route.ts:40 ~ error:", error);
    return NextResponse.json({ status: 500 });
  }
}