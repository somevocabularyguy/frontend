import './index.css';
import './fonts.css';

import { ReduxProvider, RootLayoutChildWrapper, TranslationsProvider } from '@/components/wrappers';

import { cookies } from 'next/headers';
import i18nConfig from '@/i18nConfig';
import { dir } from 'i18next';
import initTranslation from '@/app/i18n';

import { getUserData } from '@/lib/api';
import { UserData } from '@/types';

export const metadata = {
  title: 'Learn Some Vocabulary',
  description: 'Practice Page of somevocabulary.com',
}

export function generateStaticParams() {
  return i18nConfig.locales.map(locale => ({ locale }));
}

type AsyncParams<T> = Promise<T>;

interface RootLayoutProps {
  children: React.ReactNode;
  params: AsyncParams<{
    locale: string;
  }>;
}

const RootLayout: React.FC<RootLayoutProps> = async ({ children, params }) => {

  const { locale } = await params;
  const cookieStore = await cookies();
  const authToken = cookieStore.get('authCookie')?.value;
  const tempVerifyToken = cookieStore.get('tempVerifyCookie')?.value;
  const cookieArrayString = cookieStore.get('languageArray')?.value;
  const cookieArray = cookieArrayString ? JSON.parse(cookieArrayString) : null;

  let serverUserData: UserData | null = null;
  let signedInFlag: string | boolean = tempVerifyToken ? 'waiting' : false;
  if (authToken) {
    signedInFlag = true;
    serverUserData = await getUserData(authToken);
  }

  const languageArray = cookieArray || serverUserData?.languageArray || ['en', 'ja'];

  const { resources } =  await initTranslation(locale);

  return (
    <html lang={locale} dir={dir(locale)}>
      {/* <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </head> */}
      <body>
        <TranslationsProvider 
          locale={locale} 
          resources={resources}
        >
          <ReduxProvider>
            <RootLayoutChildWrapper 
              serverUserData={serverUserData} 
              signedInFlag={signedInFlag}
              languageArray={languageArray}
            >
              {children}
            </RootLayoutChildWrapper>
          </ReduxProvider>
        </TranslationsProvider>
      </body>
    </html>
  )
}

export default RootLayout;