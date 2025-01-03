import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import axios from 'axios';

import { AuthConfig } from '@/apiTypes';
const BACKEND_URL = process.env.BACKEND_URL;

export async function DELETE() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get('authCookie')?.value;
  console.log("🚀 ~ file: route.ts:11 ~ authToken:", authToken);

  if (authToken) {
    const config: AuthConfig ={
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }
    try {
      const response = await axios.delete(`${BACKEND_URL}/entry/delete-account`, config);
        console.log("🚀 ~ file: route.ts:22 ~ response.status:", response.status);
      if (response.status === 202) {
        const response =  NextResponse.json({ message: 'Account Deleted Successfully'}, { status: 202 });
        response.cookies.set('authCookie', '', {
          httpOnly: true,
          // secure: process.env.NODE_ENV === 'production',
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