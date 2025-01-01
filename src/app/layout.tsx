import './index.css';
import './fonts.css';

import { ReduxProvider, RootLayoutChildWrapper } from '@/components/wrappers';
import { cookies } from 'next/headers';

import { getUserData } from '@/lib/api';
import { UserData } from '@/types';

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

const RootLayout = async ({children}: {children: React.ReactNode}) => {

  const cookieStore = await cookies();
  const authToken = cookieStore.get('authCookie')?.value;
  let serverUserData: UserData | null = null;
  let signedInFlag = false;
  if (authToken) {
    signedInFlag = true;
    serverUserData = await getUserData(authToken);
  }

  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <RootLayoutChildWrapper serverUserData={serverUserData} signedInFlag={signedInFlag}>
            {children}
          </RootLayoutChildWrapper>
        </ReduxProvider>
      </body>
    </html>
  )
}

export default RootLayout;