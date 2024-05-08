'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import Icon from '@/components/atoms/Icon'

import useTheme from '@/hooks/useTheme'

export default function TopNav() {
  const { scrollY, isScrolled, handleModeClick } = useTheme()
  const [showMenu, setShowMenu] = useState(false)

  const pathname = usePathname()

  return (
    <nav
      className={`fixed z-20 h-20 w-full ${!isScrolled && scrollY >= 100 ? 'invisible' : 'visible'} ${
        scrollY <= 100 ? 'bg-none' : 'bg-background-primary'
      } px-4 xl:px-0`}
    >
      <div className="mx-auto flex h-full w-full max-w-[1200px] items-center justify-between">
        <div className="flex gap-32">
          <h1
            onClick={() => setShowMenu(false)}
            className={`text-2xl font-semibold ${
              scrollY <= 100 && pathname === '/' ? 'text-text-primary md:text-[white]' : 'text-text-primary'
            }`}
          >
            <Link href={'/'}>WAKCRAFT</Link>
          </h1>
          <div className="hidden items-center gap-20 md:flex">
            <h2 className={`${scrollY <= 100 && pathname === '/' ? 'text-[white]' : 'text-text-primary'}`}>
              <Link href={'/architect'}>건축가</Link>
            </h2>
            <h2 className={`${scrollY <= 100 && pathname === '/' ? 'text-[white]' : 'text-text-primary'}`}>
              <Link href={'/noobprohacker'}>눕프로해커</Link>
            </h2>
            <h2 className={`${scrollY <= 100 && pathname === '/' ? 'text-[white]' : 'text-text-primary'}`}>
              <Link href={'/content'}>컨텐츠</Link>
            </h2>
            <h2 className={`${scrollY <= 100 && pathname === '/' ? 'text-[white]' : 'text-text-primary'}`}>
              <Link href={'/game'}>게임</Link>
            </h2>
          </div>
        </div>
        {showMenu && (
          <div
            className="fixed right-0 top-[80px] h-[calc(100vh-80px)] w-full bg-[rgba(0,0,0,0.8)] md:hidden"
            onClick={() => {
              setShowMenu(false)
              allowScroll()
            }}
          >
            <ul
              className={`flex flex-col gap-2 rounded-b-3xl bg-background-primary pb-2 text-center text-xl text-text-primary [&>a]:w-full [&>a]:p-4 `}
            >
              <Link
                href={'/architect'}
                onClick={() => {
                  setShowMenu(false)
                  allowScroll()
                }}
              >
                <li>건축가</li>
              </Link>
              <Link
                href={'/noobprohacker'}
                onClick={() => {
                  setShowMenu(false)
                  allowScroll()
                }}
              >
                <li>눕프로해커</li>
              </Link>
              <Link
                href={'/content'}
                onClick={() => {
                  setShowMenu(false)
                  allowScroll()
                }}
              >
                <li>컨텐츠</li>
              </Link>
              <Link
                href={'/game'}
                onClick={() => {
                  setShowMenu(false)
                  allowScroll()
                }}
              >
                <li>게임</li>
              </Link>
            </ul>
          </div>
        )}
        <div className="flex items-center gap-4">
          <span
            className={`flex ${
              scrollY <= 100 && pathname === '/'
                ? 'fill-text-primary md:[&>div>svg]:fill-[#ccc] md:hover:[&>div>svg]:fill-[white]'
                : 'fill-text-primary hover:fill-text-primary'
            } hover:cursor-pointer [&>*:first-child]:dark:hidden [&>*:last-child]:hidden [&>*:last-child]:dark:block`}
            onClick={handleModeClick}
          >
            <Icon type="sun" />
            <Icon type="moon" />
          </span>
          <span
            className="md:hidden [&>svg]:z-10 [&>svg]:h-7 [&>svg]:w-7 [&>svg]:fill-text-primary [&>svg]:hover:scale-105"
            onClick={() => {
              setShowMenu((prev) => !prev)

              if (showMenu) {
                allowScroll()
              } else {
                preventScroll()
              }
            }}
          >
            {showMenu ? <Icon type="close" /> : <Icon type="menu" />}
          </span>
        </div>
      </div>
    </nav>
  )
}

const preventScroll = () => {
  document.body.style.position = 'fixed'
  document.body.style.width = '100%'
  document.body.style.overflowY = 'scroll'
}

const allowScroll = () => {
  document.body.style.position = ''
  document.body.style.width = ''
  document.body.style.top = ''
  document.body.style.overflowY = ''
}
