import { SCHEDULES_CONTENT } from '@/constants/schedule'
import { Schedule } from '@/types/schedule'

export const getURL = (schedule: Schedule) => {
  switch (schedule.content) {
    case '눕프로해커':
      return `/noobprohacker/${schedule.episode}`

    case '건축 눕프핵':
      return `/content/architecture_noobprohacker/${schedule.episode}`

    case '건축 콘테스트':
      return `/content/architecture_contest/${schedule.episode}`

    case '배치고사':
      return `/content/placement_test/${schedule.episode}`

    case '이벤트 눕프핵':
      return `/content/event_noobprohacker/${schedule.episode}`

    default:
      return ''
  }
}

/** 조공 컨텐츠가 아닌 예능 눕프핵인가? */
export const isEventNoobProHacker = (schedule: Schedule) => {
  return !schedule.isTributeContent && (schedule.content === '이벤트 눕프핵' || schedule.content === '티어 맞추기')
}

/** 웹에 등록되어 있는 컨텐츠인가? */
export const isPostedContent = (schedule: Schedule) => {
  return (
    SCHEDULES_CONTENT.slice(0, 7).includes(schedule.content) &&
    schedule.status === 'after_content' &&
    schedule.episode !== 0
  )
}

export const getContentName = (schedule: Schedule) => {
  if (schedule.content === '그 외' || schedule.content === '이벤트 눕프핵' || schedule.content === '조공 컨텐츠') {
    return null
  }

  return schedule.content
}

export const getContentTitle = (schedule: Schedule) => {
  if (
    schedule.content === '이벤트 눕프핵' ||
    schedule.content === '건축 콘테스트' ||
    schedule.content === '배틀 건축 콘테스트' ||
    schedule.content === '조공 컨텐츠' ||
    schedule.content === '진짜 눕프핵 마을' ||
    schedule.content === '그 외'
  ) {
    return schedule.title
  }

  if (schedule.content === '눕프로해커') {
    return `${schedule.title} 편`
  }

  return null
}

export const getEpisode = (schedule: Schedule) => {
  if (
    schedule.content === '조공 컨텐츠' ||
    schedule.content === '이벤트 눕프핵' ||
    schedule.content === '건축 콘테스트' ||
    schedule.content === '배틀 건축 콘테스트' ||
    schedule.content === '진짜 눕프핵 마을'
  ) {
    return null
  }

  if (schedule.content === '그 외') {
    return schedule.episode === 0 ? null : `${schedule.episode}화`
  }

  if (schedule.content === '눕프핵 마을' || schedule.content === '고멤 마을') {
    return `${schedule.episode}일차`
  }

  return `${schedule.episode}회`
}
