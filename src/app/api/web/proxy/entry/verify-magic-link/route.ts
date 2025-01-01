import { NextResponse } from 'next/server';
import { AuthConfig } from '@/apiTypes';
import axios from 'axios';

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
  try {
    await axios.get('http://localhost:5000/entry/verify-magic-link', config);
    return NextResponse.json('Verified', { status: 200 });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.status === 401) {
        return NextResponse.json('No Entry.', { status: 401 });
      } else if (error.status === 403) {
        return NextResponse.json('Not Verified.', { status: 403 });
      }
    }
  }

  return NextResponse.json(null, { status: 500 });
}