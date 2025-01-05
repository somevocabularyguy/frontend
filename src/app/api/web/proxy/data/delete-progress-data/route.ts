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
      const response = await axios.delete(`${BACKEND_URL}/entry/delete-progress-data`, config);
        console.log("🚀 ~ file: route.ts:22 ~ response.status:", response.status);
      if (response.status === 202) {
        return NextResponse.json({ message: 'Progress data deleted successfully.'}, { status: 202 });
      }
      return NextResponse.json({ message: 'Unexpected response.'}, { status: response.status });
    } catch (error) {
      NextResponse.json({ message: 'Error deleting data'}, { status: 500 });
      console.error(error);
    }
  }

}