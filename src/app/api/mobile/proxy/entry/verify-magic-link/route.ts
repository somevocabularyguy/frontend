import { NextResponse } from 'next/server';
import axios from 'axios';

import { AuthConfig } from '@/apiTypes';
const SERVER_URL = process.env.SERVER_URL;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const signInToken = searchParams.get('signInToken'); 

  if (!signInToken || typeof signInToken !== 'string') {
    NextResponse.json({ message: "Invalid URL" }, { status: 400 });
  }

  const config: AuthConfig ={
    headers: {
      Authorization: `Bearer ${signInToken}`
    }
  }

  const response = await axios.get(`${SERVER_URL}/entry/verify-magic-link`, config);
  const { authToken } = response.data as { authToken: string };

  return NextResponse.json({ authToken }, { status: 200 });
}