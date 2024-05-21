import { Noto_Sans_KR } from 'next/font/google'

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
