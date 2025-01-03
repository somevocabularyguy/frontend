import axios from 'axios';
import { cookies } from 'next/headers';
import { AuthConfig } from '@/apiTypes';
import { NextResponse } from 'next/server';
const BACKEND_URL = process.env.BACKEND_URL;

export async function GET(req: Request) {
  const cookieStore = await cookies();
  const tempVerifyToken = cookieStore.get('tempVerifyCookie')?.value;
  console.log("🚀 ~ file: route.ts:10 ~ tempVerifyToken:", tempVerifyToken);

  if (!tempVerifyToken) {
    return NextResponse.json({ message: 'No Token.' }, { status: 400 });
  }

  const config: AuthConfig = {
    headers: {
      Authorization: `Bearer ${tempVerifyToken}`
    }
  }

  try {
    const response = await axios.get(`${BACKEND_URL}/entry/verify-sign-in`, config)
      console.log("🚀 ~ file: route.ts:24 ~ response.status:", response.status);

    if (response.status === 200) {
      const { authToken } = response.data;
      console.log("🚀 ~ file: route.ts:28 ~ authToken:", authToken);

      const nextResponse = NextResponse.json(null, { status: 200 });
      nextResponse.cookies.set('authCookie', authToken, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/'
      });
      nextResponse.cookies.set('tempVerifyCookie', '', {
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        expires: new Date(0)
      });

      return nextResponse;
    }

    return NextResponse.json(null, { status: response.status });
  } catch (error) {
    console.log("🚀 ~ file: route.ts:50 ~ error:", error);
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNREFUSED') {
        console.log('Error: Could not connect to the server. Please check if the server is running.');
      } else if (error.code === 'ETIMEDOUT') {
        console.log('Error: Request timed out. Server may be slow or unreachable.');
      } else {
        // console.log(`Axios Error: ${error.message}`);
      }
      if (error.status === 401) {
        const nextResponse = NextResponse.json(null, { status: 401 });
        nextResponse.cookies.set('tempVerifyCookie', '', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          path: '/',
          expires: new Date(0)
        });
        return nextResponse;
      }
      return NextResponse.json(null, { status: error.status });
    } else {
      console.log('Unexpected error:', error);
    }
  }
  return NextResponse.json(null, { status: 500 });
}