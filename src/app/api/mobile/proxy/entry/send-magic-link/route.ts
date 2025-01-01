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

      return NextResponse.json({ tempVerifyToken }, { status: 200 });
    }

    return NextResponse.json(null, { status: response.status });
  } catch (error) {
    console.error(error)
  }
}