import { NextResponse } from 'next/server';
import axios from 'axios';

import { AuthConfig } from '@/apiTypes';

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

  const response = await axios.get('http://localhost:5000/entry/verify', config);
  const { authToken } = response.data as { authToken: string };

  const nextResponse = NextResponse.redirect(new URL('/', req.url));
  nextResponse.cookies.set('authCookie', authToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/'
  });

  return nextResponse;
};