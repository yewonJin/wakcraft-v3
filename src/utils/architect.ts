import { TIER_LIST } from '@/constants/architect'
import { INFINITE_TIME_ARCHITECTURE_CONTEST, INFINITE_TIME_EVENT_NOOBPROHACKER } from '@/constants/content'
import { Architect } from '@/types/architect'

/** 티어별 건축가 수를 반환하는 함수 */
export const getNumberOfArchitectsByTier = (architects: Architect[]) => {
  return {
    해커: architects.filter((item) => TIER_LIST['해커'].includes(item.curTier)).length,
    국밥: architects.filter((item) => TIER_LIST['국밥'].includes(item.curTier)).length,
    프로: architects.filter((item) => TIER_LIST['프로'].includes(item.curTier)).length,
    계륵: architects.filter((item) => TIER_LIST['계륵'].includes(item.curTier)).length,
    눕: architects.filter((item) => TIER_LIST['눕'].includes(item.curTier)).length,
    언랭: architects.filter((item) => TIER_LIST['언랭'].includes(item.curTier)).length,
  }
}

/** 이벤트 눕프핵에서 몇명이서 건축했는지를 반환하는 함수 */
export const getNumberOfArchitectsInContent = (item: Architect['portfolio']['eventNoobProHacker'][0]) => {
  if (item.episode === 3 && item.line === '프로') return 2

  if (item.episode === 3 && item.line === '눕') return 10

  const numberOfPeople = item.line?.split('x')[1]

  if (!numberOfPeople) return 1

  if (item.episode === 5 && numberOfPeople) return parseInt(numberOfPeople)

  return 1
}

export const isInfiniteTimeContent = (type: '이벤트 눕프핵' | '건축 콘테스트', episode: number) => {
  switch (type) {
    case '건축 콘테스트':
      return INFINITE_TIME_ARCHITECTURE_CONTEST.includes(episode)

    case '이벤트 눕프핵':
      return INFINITE_TIME_EVENT_NOOBPROHACKER.includes(episode)
  }
}
