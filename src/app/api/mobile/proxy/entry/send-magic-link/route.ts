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

    return NextResponse.json(response.data);
  } catch (error) {
    console.error(error)
  }
}