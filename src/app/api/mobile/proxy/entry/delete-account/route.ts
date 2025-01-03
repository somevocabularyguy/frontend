import { NextResponse } from 'next/server';
import axios from 'axios';

import { AuthConfig } from '@/apiTypes';
import { BACKEND_URL } from '@/constants';

export async function DELETE(req: Request) {
  const authHeader = req.headers.get('authorization');
  const authToken = authHeader?.split(' ')[1];

  if (authToken) {
    const config: AuthConfig ={
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }
    try {
      const response = await axios.delete(`${BACKEND_URL}/entry/delete-account`, config);
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