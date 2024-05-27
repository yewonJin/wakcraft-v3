'use client'

import { useEffect, useRef } from 'react'

import { BASE_START_DATE, BASE_YEAR, DAYS_PER_MONTH, KR_CUR_DATE } from '@/constants/calendar'
import { useCalendarStore } from '@/store/calendar'
import { getMonthAcc, getYearAcc } from '@/utils/calendar'

export const useCalendar = (schedules: any[]) => {
  const { curMonth, curYear, setCurMonth, setCurYear, incCurMonth, decCurMonth, incCurYear, decCurYear } =
    useCalendarStore()

  const ref = useRef<HTMLDivElement>(null)

  // 오늘에 해당하는 블록 테두리 표시
  useEffect(() => {
    if (!ref.current) return

    Array.from(ref.current.children).map((item) => {
      item.removeAttribute('style')
    })

    if (curMonth !== KR_CUR_DATE.getMonth() + 1 || curYear !== KR_CUR_DATE.getFullYear()) {
      return
    }

    ref.current.children[KR_CUR_DATE.getDate() + getStartDate() - 1].setAttribute('style', 'border: 1px solid')
  }, [curMonth, curYear])

  const curMonthContent =
    schedules
      .filter((item) => parseInt(item.date.split('-')[0]) === curYear)
      .filter((item) => parseInt(item.date.split('-')[1]) === curMonth) || []

  /** 컨텐츠가 처음 시작된 날짜로 변경 */
  const setDateToStart = () => {
    setCurYear(2020)
    setCurMonth(8)
  }

  const incMonth = () => {
    if (curMonth === 12) {
      incCurYear()
      setCurMonth(1)
      return
    }

    incCurMonth()
  }

  const decMonth = () => {
    if (curMonth === 1) {
      decCurYear()
      setCurMonth(12)
      return
    }

    decCurMonth()
  }

  const setToday = () => {
    setCurMonth(new Date().getMonth() + 1)
    setCurYear(new Date().getFullYear())
  }

  /** 해당 년, 월의 첫 날의 요일을 반환  */
  const getStartDate = () => {
    return (BASE_START_DATE + getYearAcc(BASE_YEAR, curYear) + getMonthAcc(curYear, curMonth)) % 7
  }

  /** 해당 년, 월의 마지막 날의 요일을 반환  */
  const getEndDate = () => {
    let result = getStartDate() + DAYS_PER_MONTH[curMonth - 1]

    if (curYear % 4 === 0 && curMonth === 2) {
      return result + 1
    }

    return result
  }

  return {
    ref,
    curMonth,
    curYear,
    setToday,
    incMonth,
    decMonth,
    setDateToStart,
    incCurYear,
    decCurYear,
    getStartDate,
    getEndDate,
    curMonthContent,
  }
}
