import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import axios from 'axios';

import { AuthConfig } from '@/apiTypes';

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
      const response = await axios.delete('http://localhost:5000/entry/delete-account', config);
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