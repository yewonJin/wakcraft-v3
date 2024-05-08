'use client'

import { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'

import Icon from '@/components/atoms/Icon'

import { getWorldCups } from '@/apis/client/worldcup'
import { Worldcup } from '@/types/worldcup'
import { renameTo1080Webp, renameToWebp } from '@/utils/shared'
import { getWinRatio } from '@/utils/worldcup'

export default function GameWorldCupRanking() {
  return (
    <div className="mx-auto max-w-[1200px] px-2 pb-8 pt-24 xl:px-0 xl:pt-32">
      <h1 className={`px-2 text-3xl text-text-primary xl:px-0`}>랭킹</h1>
      <div className="mt-8 flex h-[70px] w-full items-center gap-4 rounded-md bg-background-secondary px-3 text-sm text-text-secondary sm:gap-10 sm:px-6 sm:text-base">
        <p className="w-[30px] text-center">순위</p>
        <p className="w-[90px] sm:w-[150px]">이미지</p>
        <p className="flex-[2]">주제</p>
        <p className="flex-1 md:flex-[2]">우승 비율</p>
        <p className="hidden flex-1 md:flex">링크</p>
      </div>
      <ArchitectureList />
    </div>
  )
}

const ArchitectureList = () => {
  const [worldCups, setWorldCups] = useState<Worldcup[]>()
  const [page, setPage] = useState(1)

  const { data } = useQuery<Worldcup[]>({ queryKey: ['getWorldCups'], queryFn: getWorldCups })

  useEffect(() => {
    if (!data) return

    setWorldCups(
      data
        .sort(
          (a, b) =>
            Math.floor((b.numberOfWin / b.numberOfParticipation) * 10000) -
            Math.floor((a.numberOfWin / a.numberOfParticipation) * 10000),
        )
        .filter((item) => item.numberOfParticipation !== 0)
        .concat(data.filter((item) => item.numberOfParticipation === 0)),
    )
  }, [data])

  if (!worldCups)
    return (
      <div className="h-auto w-full">
        {new Array(10).fill(0).map((item, index) => (
          <div
            key={index}
            className="h-[90px] w-full animate-pulse border-b-[1px] border-background-secondary bg-background-primary"
          ></div>
        ))}
      </div>
    )

  return (
    <Fragment>
      <div>
        {worldCups.slice((page - 1) * 10, page * 10).map((worldCup, index) => (
          <div
            key={worldCup.workInfo.subject}
            className="flex h-[90px] items-center gap-4 border-b-[1px] border-background-secondary px-3 text-text-secondary sm:gap-10 sm:px-6"
          >
            <p className="w-[30px] text-center text-text-primary">{index + 1 + (page - 1) * 10}</p>
            <div
              className="relative h-full w-[90px] hover:cursor-pointer sm:w-[150px]"
              onClick={() => window.open(renameTo1080Webp(worldCup.workInfo.image_url))}
            >
              <Image
                alt="랭킹 이미지"
                style={{ objectFit: 'cover' }}
                src={renameToWebp(worldCup.workInfo.image_url)}
                fill
              />
            </div>
            <div className="flex flex-[2] flex-col gap-[6px]">
              <p className="text-base text-text-primary sm:text-lg">{worldCup.workInfo.subject}</p>
              <Link href={`/architect/${worldCup.workInfo.minecraft_id}`}>
                <p className="text-sm sm:text-base">{worldCup.workInfo.minecraft_id}</p>
              </Link>
            </div>
            <p className="flex-1 text-sm sm:text-base md:flex-[2]">{getWinRatio(worldCup)}</p>
            <div className="hidden flex-1 md:flex">
              {worldCup.workInfo.youtube_url !== 'null' && (
                <span
                  className="[&>div>svg]:h-6 [&>div>svg]:w-6 [&>div>svg]:fill-text-tertiary [&>div>svg]:hover:cursor-pointer [&>div>svg]:hover:fill-text-primary"
                  onClick={() => window.open(worldCup.workInfo.youtube_url)}
                >
                  <Icon type="link" />
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      <ul className="relative mx-auto mt-8 flex w-[350px] justify-center gap-4 sm:mt-12 md:w-[370px]">
        <span
          className={`${
            page === 1 ? 'hidden' : ''
          } absolute left-0 top-2 hover:cursor-pointer [&>div>svg]:fill-text-tertiary`}
          onClick={() => setPage((prev) => prev - 1)}
        >
          <Icon type="arrow_back" />
        </span>
        {new Array(13)
          .fill(0)
          .map((item, index) => (
            <li
              key={index}
              className={`flex h-[40px] w-[40px] items-center justify-center rounded-full border-[1px] border-background-secondary px-2 text-text-secondary hover:cursor-pointer hover:bg-background-secondary ${
                page === index + 1 ? 'bg-background-secondary' : ''
              }`}
              onClick={() => setPage(index + 1)}
            >
              {index + 1}
            </li>
          ))
          .slice(Math.floor((page - 1) / 5) * 5, Math.floor((page - 1) / 5 + 1) * 5)}
        <span
          className={`absolute right-0 top-2 hover:cursor-pointer [&>div>svg]:rotate-180 [&>div>svg]:fill-text-tertiary ${
            page === 13 ? 'hidden' : ''
          }`}
          onClick={() => setPage((prev) => prev + 1)}
        >
          <Icon type="arrow_back" />
        </span>
      </ul>
    </Fragment>
  )
}
