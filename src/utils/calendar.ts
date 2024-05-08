import { DAYS_PER_MONTH } from '@/constants/calendar'

export const getYearAcc = (BASE_YEAR: number, curYear: number) => {
  let result = 0

  for (let i = BASE_YEAR; i < curYear; i++) {
    if (i % 4 === 0) {
      result++
    }

    result++
  }

  return result
}

export const getMonthAcc = (curYear: number, curMonth: number) => {
  let result = DAYS_PER_MONTH.slice(0, curMonth - 1).reduce((acc, cur) => acc + cur, 0)

  if (curYear % 4 === 0 && curMonth > 2) {
    result++
  }

  return result
}
