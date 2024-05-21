'use client'

import { Fragment, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'

import Icon from '@/components/atoms/Icon'

import { getWorldCups } from '@/apis/client/worldcup'
import { Worldcup } from '@/types/worldcup'
import { renameTo1080Webp, renameToWebp } from '@/utils/shared'
import { getRankingTableData, getWinRate } from '@/utils/worldcup'

export default function GameWorldCupArchitectureList() {
  const [page, setPage] = useState(1)

  const { data } = useQuery<Worldcup[]>({ queryKey: ['getWorldCups'], queryFn: getWorldCups })

  if (!data)
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
        {getRankingTableData(data)
          .slice((page - 1) * 10, page * 10)
          .map((worldCup, index) => (
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
                <span className="text-sm sm:text-base text-text-tertiary [&>a:hover]:text-text-secondary">
                  <Link href={`/architect/${worldCup.workInfo.minecraft_id}`}>{worldCup.workInfo.minecraft_id}</Link>
                </span>
              </div>
              <p className="flex-1 text-sm sm:text-base md:flex-[2]">{getWinRate(worldCup)}</p>
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
