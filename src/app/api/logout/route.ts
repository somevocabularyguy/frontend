import { NextResponse } from 'next/server';

export async function GET() {
  const response = NextResponse.json(null, { status: 200 });

  response.cookies.set('authCookie', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    expires: new Date(0),
  });

  return response; 
}


