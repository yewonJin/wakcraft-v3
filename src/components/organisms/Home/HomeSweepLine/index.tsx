'use client'

import { Dispatch, SetStateAction, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import Icon from '@/components/atoms/Icon'

import { SweepLine } from '@/types/content'
import { getKORTierName } from '@/utils/architect'
import { renameToWebp } from '@/utils/shared'

type Props = {
  sweepLines: SweepLine[]
}

export default function HomeSweepLine({ sweepLines }: Props) {
  const [page, setPage] = useState(sweepLines.length - 1)

  return (
    <div className="w-full md:mx-auto md:max-w-[1200px] xl:px-0 md:flex flex-col hidden">
      <div className="flex items-end gap-4">
        <h3 className={`text-2xl text-text-primary sm:text-3xl`}>싹쓸이 라인</h3>
        <p className="text-text-secondary">(프로 1등, 해커 1등, 라인 1등)</p>
      </div>
      <div className="relative mt-8">
        <SweepLinePageButton type="prev" setPage={setPage} sweepLines={sweepLines} page={page} />
        <SweepLinePageButton type="next" setPage={setPage} sweepLines={sweepLines} page={page} />
        <div className="absolute flex items-center gap-1 text-lg text-text-secondary">
          <p className="">{`EP${sweepLines[page].episode} : `}</p>
          <span className="text-xl text-text-primary">{sweepLines[page].subject}</span>
        </div>
        <div className="overflow-hidden pb-5">
          <div
            className="mt-1 flex gap-8 duration-300"
            style={{ transform: `translateX(calc(${-page} * (100% + 32px)))` }}
          >
            {sweepLines.map((sweepLine) => (
              <div key={sweepLine.subject} className="mt-8 flex w-full flex-col gap-8 md:flex-row">
                <SweepLineItem type="noob" sweepLine={sweepLine} />
                <SweepLineItem type="pro" sweepLine={sweepLine} />
                <SweepLineItem type="hacker" sweepLine={sweepLine} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

type SweepLinePageButtonProps = {
  type: 'prev' | 'next'
  sweepLines: SweepLine[]
  page: number
  setPage: Dispatch<SetStateAction<number>>
}

const SweepLinePageButton = ({ type, sweepLines, page, setPage }: SweepLinePageButtonProps) => {
  return (
    <span
      className={`${
        type === 'prev'
          ? 'right-28 xl:-left-20 xl:right-auto xl:top-[50%]'
          : 'right-5  xl:-right-20 xl:top-[50%] [&>div>svg]:rotate-180'
      } absolute -top-3 rounded-full bg-background-secondary p-3 hover:cursor-pointer hover:bg-background-tertiary [&>svg]:fill-text-tertiary `}
      onClick={() => setPage((prev) => (type === 'next' ? prev + 1 : prev - 1))}
      style={{
        display: (type === 'prev' && page === 0) || (type === 'next' && page === sweepLines.length - 1) ? 'none' : '',
      }}
    >
      <Icon type="arrow_back" />
    </span>
  )
}

type SweepLineItemProps = {
  type: 'noob' | 'pro' | 'hacker'
  sweepLine: SweepLine
}

const SweepLineItem = ({ type, sweepLine }: SweepLineItemProps) => {
  const getIndex = () => {
    switch (type) {
      case 'noob':
        return 0

      case 'pro':
        return 1

      case 'hacker':
        return 2
    }
  }

  return (
    <div
      className="group relative h-[60vw] max-h-[480px] w-[calc(100vw-32px)] overflow-hidden rounded-2xl md:h-[40vh] md:w-[30vw] [&>img]:rounded-2xl [&>img]:duration-300 hover:[&>img]:scale-105"
      style={{
        boxShadow: '1px 1px 5px #222',
      }}
    >
      <Image
        alt="싹쓸이 라인 이미지"
        sizes="900px"
        style={{ objectFit: 'cover' }}
        fill
        src={renameToWebp(sweepLine.line_details[getIndex()].image_url)}
      />
      <div className="invisible absolute bottom-2 z-10 flex w-full justify-center text-lg text-[white] hover:cursor-default group-hover:visible">
        <div className="flex w-fit gap-4 rounded-2xl bg-[#121212] px-6 py-2 group-hover:animate-fadeIn">
          <Link href={`/architect/${sweepLine.line_details[getIndex()].minecraft_id}`}>
            <p className="text-[#aaa] hover:cursor-pointer hover:text-[white]">
              {sweepLine.line_details[getIndex()].minecraft_id}
            </p>
          </Link>
          <p>{getKORTierName(type)}</p>
        </div>
      </div>
    </div>
  )
}
