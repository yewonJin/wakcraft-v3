'use client'

import { ForwardedRef, forwardRef } from 'react'
import Link from 'next/link'

import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'

import { useCalendar } from '@/hooks/useCalendar'
import { Schedule } from '@/types/schedule'
import {
  getContentName,
  getContentTitle,
  getEpisode,
  getURL,
  isEventNoobProHacker,
  isPostedContent,
} from '@/utils/schedule'
import Typography from '@/components/atoms/Typography'

type Props = {
  schedules: Schedule[]
}

export default function HomeCalendar({ schedules }: Props) {
  const {
    ref,
    curMonth,
    curYear,
    setToday,
    incMonth,
    decMonth,
    setDateToStart,
    getStartDate,
    getEndDate,
    curMonthContent,
  } = useCalendar(schedules)

  return (
    <div className="hidden md:flex flex-col">
      <h2 className={`text-3xl text-text-primary sm:text-4xl`}>캘린더</h2>
      <div className="relative mt-12 flex items-center justify-between">
        <div className="relative flex items-center gap-4">
          <CalendarChangeMonth type="prev" curMonth={curMonth} curYear={curYear} changeMonth={decMonth} />
          <CalendarChangeMonth type="next" curMonth={curMonth} curYear={curYear} changeMonth={incMonth} />
          <div className="ml-2 flex items-end gap-2">
            <Typography variants="p" color="primary" style={{ fontSize: '24px', lineHeight: '32px' }}>
              {curYear + '년'}
            </Typography>
            <Typography variants="p" color="primary" style={{ fontSize: '24px', lineHeight: '32px' }}>
              {curMonth + '월'}
            </Typography>
          </div>
        </div>
        <div className="flex gap-2 [&>button]:text-sm">
          <Button text="오늘" handleButtonClick={setToday} style={{ padding: '8px 14px' }} />
          <Button text="처음" handleButtonClick={setDateToStart} style={{ padding: '8px 14px' }} />
        </div>
      </div>
      <CalendarTableHead />
      <CalendarTableBody
        ref={ref}
        curMonth={curMonth}
        curMonthContent={curMonthContent}
        getStartDate={getStartDate}
        getEndDate={getEndDate}
      />
    </div>
  )
}

type CalendarChangeMonthProps = {
  type: 'prev' | 'next'
  curMonth: number
  curYear: number
  changeMonth: () => void
}

const CalendarChangeMonth = (props: CalendarChangeMonthProps) => {
  const { type, curMonth, curYear, changeMonth } = props

  return (
    <span
      className={`${type === 'prev' && curMonth === 8 && curYear === 2020 ? 'invisible' : ''} ${
        type === 'next' ? '[&>div>svg]:rotate-180' : ''
      } select-none hover:cursor-pointer [&>div>svg]:h-[22px] [&>div>svg]:w-[22px] [&>div>svg]:fill-text-tertiary hover:[&>div>svg]:fill-text-primary`}
      onClick={changeMonth}
    >
      <Icon type="arrow_back" />
    </span>
  )
}

const CalendarTableHead = () => {
  return (
    <ul
      className={`mt-6 grid grid-cols-7 gap-1 py-3 text-center text-lg text-text-primary border-2 border-background-secondary`}
    >
      <li className="text-[#b91c1c]">SUN</li>
      <li>MON</li>
      <li>TUE</li>
      <li>WED</li>
      <li>THU</li>
      <li>FRI</li>
      <li className="text-[#1d4ed8]">SAT</li>
    </ul>
  )
}

type CalendarTableBodyProps = {
  curMonth: number
  getStartDate: () => number
  getEndDate: () => number
  curMonthContent: any[]
}

const CalendarTableBody = forwardRef(
  (
    { curMonth, getStartDate, getEndDate, curMonthContent }: CalendarTableBodyProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const renderCalendar = () => {
      const arr = new Array(7 * 6).fill(0).map((_, index) => {
        if (index < getStartDate() || index >= getEndDate()) {
          return <InvisibleBlock key={index} />
        }

        return <Block key={index} isToday={false} index={index} startDate={getStartDate()} />
      })

      curMonthContent.forEach((item) => {
        arr[parseInt(item.date.split('-')[2]) + getStartDate() - 1] = (
          <ContentBlock
            key={item.date}
            isToday={false}
            curMonth={curMonth}
            startDate={getStartDate()}
            index={parseInt(item.date.split('-')[2]) + getStartDate() - 1}
            item={item}
          />
        )
      })

      return arr
    }

    return (
      <div className="grid grid-cols-7 gap-1" ref={ref}>
        {renderCalendar()}
      </div>
    )
  },
)

CalendarTableBody.displayName = 'CalendarTableBody'

const InvisibleBlock = () => {
  return <div className="h-[70px] p-2 text-base text-text-secondary md:h-[110px] xl:h-[130px] xl:p-3 xl:text-lg"></div>
}

type BlockProps = {
  index: number
  startDate: number
  isToday: boolean
}

const Block = ({ index, startDate, isToday }: BlockProps) => {
  return (
    <div
      className={`h-[70px] border-text-secondary bg-background-secondary p-2 text-lg text-text-secondary md:h-[110px] xl:h-[130px] xl:p-3`}
      style={{ border: isToday ? '1px solid' : '' }}
    >
      <p className="text-center text-base md:text-start xl:text-lg">{index + 1 - startDate}</p>
    </div>
  )
}

type ContentBlockProps = {
  curMonth: number
  index: number
  startDate: number
  item: Schedule
  isToday: boolean
}

const ContentBlock = ({ curMonth, index, startDate, item, isToday }: ContentBlockProps) => {
  return (
    <div
      className={`${
        backgroundColorVariants[item.content]
      } group relative flex h-[70px] flex-col items-center border-text-secondary p-2  text-text-secondary duration-300 md:h-[110px] md:items-start xl:h-[130px] xl:p-3 [&>div]:hidden md:[&>div]:flex [&>li:marker]:mr-0`}
      key={curMonth + index}
      style={{ border: isToday ? '1px solid' : '' }}
    >
      <p className="text-center text-base md:text-start xl:text-lg">{index + 1 - startDate}</p>
      {isPostedContent(item) && (
        <Link href={getURL(item)}>
          <span className="absolute bottom-2 right-2 z-10 hidden rounded-full bg-background-primary p-1 hover:cursor-pointer md:inline-block [&>div>svg]:rotate-90 [&>div>svg]:fill-text-tertiary hover:[&>div>svg]:fill-text-secondary">
            <Icon type="add" />
          </span>
        </Link>
      )}
      {!isPostedContent(item) && item.youtube_link && (
        <Link href={item.youtube_link}>
          <span className="absolute bottom-2 right-2 z-10 hidden rounded-full bg-background-primary p-1 hover:cursor-pointer md:inline-block [&>div>svg]:h-6 [&>div>svg]:w-6 [&>div>svg]:fill-text-tertiary hover:[&>div>svg]:fill-text-secondary">
            <Icon type="link" />
          </span>
        </Link>
      )}
      {item.isTributeContent && (
        <span className="absolute right-3 top-4 hidden text-sm xl:inline-block">조공 컨텐츠</span>
      )}
      {isEventNoobProHacker(item) && (
        <span className="absolute right-3 top-4 hidden text-sm xl:inline-block">예능 눕프핵</span>
      )}
      <div key={curMonth + index} className="mt-1 text-sm xl:text-base">
        <div className={`${item.title === '해커의 손길' ? 'flex-col-reverse' : ''} flex flex-wrap items-center gap-1`}>
          {getContentName(item) && <p className="">{getContentName(item)}</p>}
          {getEpisode(item) && <p className="mb-[1px] text-xs xl:text-base">{getEpisode(item)}</p>}
          {getContentTitle(item) && <p className="w-full">{getContentTitle(item)}</p>}
        </div>
      </div>
    </div>
  )
}

const backgroundColorVariants: { [key: string]: string } = {
  눕프로해커: 'bg-green-200 dark:bg-green-800',
  '건축 눕프핵': 'bg-green-200 dark:bg-green-800',
  '건축 콘테스트': 'bg-blue-200 dark:bg-blue-800',
  '배틀 건축 콘테스트': 'bg-blue-200 dark:bg-blue-800',
  배치고사: 'bg-yellow-200 dark:bg-yellow-800',
  '이벤트 눕프핵': 'bg-rose-200 dark:bg-rose-800',
  '시간 맞추기': 'bg-rose-200 dark:bg-rose-800',
  '티어 맞추기': 'bg-rose-200 dark:bg-rose-800',
  '진짜 눕프핵 마을': 'bg-neutral-300 dark:bg-neutral-700',
  '눕프핵 마을': 'bg-neutral-300 dark:bg-neutral-700',
  '고멤 마을': 'bg-neutral-300 dark:bg-neutral-700',
  '그 외': 'bg-neutral-300 dark:bg-neutral-700',
}
