import { NextResponse } from 'next/server';
import axios from 'axios';
 
import { EmailBody } from '@/apiTypes';
import { BACKEND_URL } from '@/constants';

export async function POST(req: Request) {
  const { email } = (await req.json()) as { email: string }
  console.log("🚀 ~ file: route.ts:8 ~ email:", email);

  const body: EmailBody = {
    email
  };

  try {
  console.log("🚀 ~ file: route.ts:8 ~ email:", email);
    const response = await axios.post(`${BACKEND_URL}/entry/send-magic-link`, body)
    console.log("🚀 ~ file: route.ts:15 ~ response.status:", response.status);
    if (response.status === 200) {

      const { tempVerifyToken } = response.data;

      const nextResponse = NextResponse.json(null, { status: 200 });
      nextResponse.cookies.set('tempVerifyCookie', tempVerifyToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 24 * 60 * 60,
      });

      return nextResponse;
    }

    return NextResponse.json(null, { status: response.status });
  } catch (error) {
    console.log("🚀 ~ file: route.ts:37 ~ error:", error);
    if (axios.isAxiosError(error)) {
      console.error(error)
      return NextResponse.json(null, { status: error.status });
    }
    else {
      return NextResponse.json(null, { status: 500 });
    }
  }
}