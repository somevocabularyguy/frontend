import axios from 'axios';
import { cookies } from 'next/headers';
import { UserData } from '@/types';
import { AuthConfig } from '@/apiTypes';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const authToken = cookieStore.get('authCookie')?.value;
  const { userDataToSync } = (await req.json()) as { userDataToSync: UserData | null }

  if (!authToken) {
    return NextResponse.json({ message: 'No Token.' }, { status: 400 });
  }

  const config: AuthConfig = {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  }

  try {
    const response = await axios.post('http://localhost:5000/data/sync-user-data', { clientUserData: userDataToSync }, config)

    if (response?.data) {
      return NextResponse.json(response.data, { status: 200 });
    }
    return NextResponse.json(null, { status: 200 });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNREFUSED') {
        console.log('Error: Could not connect to the server. Please check if the server is running.');
      } else if (error.code === 'ETIMEDOUT') {
        console.log('Error: Request timed out. Server may be slow or unreachable.');
      } else {
        console.log(`Axios Error: ${error.message}`);
      }
    } else {
      console.log('Unexpected error:', error);
    }
    return NextResponse.json(null, { status: 500 });
  }
}