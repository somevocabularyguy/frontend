import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import axios from 'axios';

import { AuthConfig } from '@/apiTypes';
const SERVER_URL = process.env.SERVER_URL;

export async function DELETE() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get('authCookie')?.value;

  if (authToken) {
    const config: AuthConfig ={
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }
    try {
      const response = await axios.delete(`${SERVER_URL}/entry/delete-account`, config);
      if (response.status === 202) {
        const response =  NextResponse.json({ message: 'Account Deleted Successfully'}, { status: 202 });
        response.cookies.set('authCookie', '', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          path: '/',
          expires: new Date(0),
        });

        return response;
      }
    } catch (error) {
      console.error(error);
    }
  }

}