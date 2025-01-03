import axios from 'axios';
import { AuthConfig } from '@/apiTypes';
import { NextResponse } from 'next/server';
import { BACKEND_URL } from '@/constants';

export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization');
  const tempVerifyToken = authHeader?.split(' ')[1];

  if (!tempVerifyToken) {
    return NextResponse.json({ message: 'No Token.' }, { status: 400 });
  }

  const config: AuthConfig = {
    headers: {
      Authorization: `Bearer ${tempVerifyToken}`
    }
  }

  try {
    const response = await axios.get(`${BACKEND_URL}/entry/verify-sign-in`, config)

    if (response.status === 200) {
      const { authToken } = response.data;

      return NextResponse.json({ authToken }, { status: 200 });
    }

    return NextResponse.json(null, { status: response.status });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNREFUSED') {
        console.log('Error: Could not connect to the server. Please check if the server is running.');
      } else if (error.code === 'ETIMEDOUT') {
        console.log('Error: Request timed out. Server may be slow or unreachable.');
      } else {
        console.log(`Axios Error: ${error.message}`);
      }
      return NextResponse.json(null, { status: error.status });
    } else {
      console.log('Unexpected error:', error);
    }
    return NextResponse.json(null, { status: 500 });
  }
}