import { Noto_Sans_KR } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import Script from 'next/script'
import { SpeedInsights } from '@vercel/speed-insights/next'

import './globals.css'
import TopNav from '@/components/organisms/TopNav'
import QueryProvider from '@/providers/QueryClientProvider'

export const normal = Noto_Sans_KR({
  weight: '400',
  display: 'fallback',
  style: 'normal',
  subsets: ['cyrillic'],
  variable: '--noto-sans_KR-normal',
  fallback: ['system-ui'],
})

export const medium = Noto_Sans_KR({
  weight: '500',
  display: 'fallback',
  style: 'normal',
  subsets: ['cyrillic'],
  variable: '--noto-sans_KR-medium',
  fallback: ['system-ui'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="kr" suppressHydrationWarning={true}>
      <head>
        <title>왁크래프트 | 홈</title>
        <meta title="wakcraft" name="description" content="유튜버 우왁굳의 마인크래프트 컨텐츠 웹사이트" />
        <script dangerouslySetInnerHTML={{ __html: setInitialThemeMode }} />
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_TRACKING_ID}`}
        ></Script>
        <script
          dangerouslySetInnerHTML={{
            __html: ` 
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${process.env.GA_TRACKING_ID}' , {
    page_path: window.location.pathname,
  });
`,
          }}
        />
      </head>
      <body className={medium.className}>
        <QueryProvider>
          <TopNav />
          <SpeedInsights />
          {children}
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  )
}

const setInitialThemeMode = `
  const getIntialThemeMode = () => {
    const storageTheme = localStorage.getItem("theme");
    const hasStorageTheme = typeof storageTheme === "string";

    if (hasStorageTheme) {
      return storageTheme;
    }

    const preference = window.matchMedia("(prefers-color-scheme: dark)");
    const hasMediaQueryPreference = typeof preference.matches === "boolean";

    if (hasMediaQueryPreference) {
      return preference.matches ? "dark" : "light";
    }

    return "light";
  };

  const currentMode = getIntialThemeMode();

  if(currentMode === 'dark') {
    document.documentElement.classList.add(currentMode);
  }

  localStorage.setItem("theme", currentMode);
`
