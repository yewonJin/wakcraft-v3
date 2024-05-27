import { DAYS_PER_MONTH } from '@/constants/calendar'

/** 기준 년도와 현재 년도의 요일 차이  */
// 1년은 365일이니 1월 1일은 년마다 요일이 증가한다.  ex) 2023년 1월 1일 : 일요일 -> 2024년 1월 1일 : 월요일
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

/** 1월 1일 ~ 해당 년,월 1일의 요일 차이를 반환 */
// ex) 2024년 1월 1일 ~ 2024년 5월 1일 -> 31일 + (28 + 1)일 + 31일 + 30일
export const getMonthAcc = (curYear: number, curMonth: number) => {
  let result = DAYS_PER_MONTH.slice(0, curMonth - 1).reduce((acc, cur) => acc + cur, 0)

  // 윤년이고 현재 월이 3월 이상이면 +1
  if (curYear % 4 === 0 && curMonth > 2) {
    result++
  }

  return result
}
