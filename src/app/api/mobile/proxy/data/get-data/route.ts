import { NextResponse } from 'next/server';
import { AuthConfig } from '@/apiTypes';
import axios from 'axios';

export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization');
  const authToken = authHeader?.split(' ')[1];

  if (!authToken) {
    return NextResponse.json({ message: 'No Token.' }, { status: 400 });
  }

  const config: AuthConfig = {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  }

  try {
    const response = await axios.get('http://localhost:5000/data/get-data', config)

    if (response?.data) {
      return NextResponse.json(response.data, { status: 200 });
    }
    return NextResponse.json(null, { status: 500 });
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