const curr = new Date()
const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000
const KR_TIME_DIFF = 9 * 60 * 60 * 1000

export const KR_CUR_DATE = new Date(utc + KR_TIME_DIFF)

export const BASE_YEAR = 2020
export const BASE_MONTH = 1
export const BASE_START_DATE = 3
export const DAYS_PER_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
