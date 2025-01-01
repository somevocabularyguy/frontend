import { NextResponse } from 'next/server';
import axios from 'axios';
 
import { EmailBody } from '@/apiTypes';

export async function POST(req: Request) {
  const { email } = (await req.json()) as { email: string }

  const body: EmailBody = {
    email
  };

  try {
    const response = await axios.post('http://localhost:5000/entry/send-magic-link', body)
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
    console.error(error)
  }
}