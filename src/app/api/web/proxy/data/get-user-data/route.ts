import { NextResponse } from 'next/server';
import { AuthConfig } from '@/apiTypes';
import axios from 'axios';

const BACKEND_URL = process.env.BACKEND_URL;

export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization');
  const authToken = authHeader?.split(' ')[1];
  console.log("🚀 ~ file: route.ts:10 ~ authToken:", authToken);

  if (!authToken) {
    return NextResponse.json({ message: 'No Token.' }, { status: 400 });
  }

  const config: AuthConfig = {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  }

  try {
    const response = await axios.get(`${BACKEND_URL}/data/get-user-data`, config)
    console.log("🚀 ~ file: route.ts:25 ~ response.status:", response.status);

    if (response?.data) {
      return NextResponse.json(response.data, { status: 200 });
    }
    return NextResponse.json(null, { status: 500 });
  } catch (error) {
    console.log("🚀 ~ file: route.ts:30 ~ error:", error);
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNREFUSED') {
        console.log('Error: Could not connect to the server. Please check if the server is running.');
      } else if (error.code === 'ETIMEDOUT') {
        console.log('Error: Request timed out. Server may be slow or unreachable.');
      } else {
        console.log(`Axios Error: ${error.message}`);
      }
    } else {
      console.log('Unexpected error:', error);
    }
    return NextResponse.json(null, { status: 500 });
  }
}