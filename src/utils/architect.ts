import { TIER_LIST } from '@/constants/architect'
import { INFINITE_TIME_ARCHITECTURE_CONTEST, INFINITE_TIME_EVENT_NOOBPROHACKER } from '@/constants/content'
import { Architect, Tier } from '@/types/architect'

/** 영어 티어 이름을 한국 티어 이름으로 변역하는 함수 */
export const getKORTierName = (tier: 'hacker' | 'gukbap' | 'pro' | 'gyeruik' | 'noob' | 'unranked'): Tier => {
  switch (tier) {
    case 'hacker':
      return '해커'
    case 'gukbap':
      return '국밥'
    case 'pro':
      return '프로'
    case 'gyeruik':
      return '계륵'
    case 'noob':
      return '눕'
    case 'unranked':
      return '언랭'
  }
}

/** 한국 티어 이름을 영어 티어 이름으로 변역하는 함수 */
export const getENGTierName = (tier: '해커' | '국밥' | '프로' | '계륵' | '눕' | '언랭') => {
  switch (tier) {
    case '해커':
      return 'hacker'
    case '국밥':
      return 'gukbap'
    case '프로':
      return 'pro'
    case '계륵':
      return 'gyeruik'
    case '눕':
      return 'noob'
    case '언랭':
      return 'unranked'
  }
}

/** 티어별 건축가 수를 반환하는 함수 */
export const getNumberOfArchitectsByTier = (architects: Architect[]) => {
  return {
    hacker: architects.filter((item) => TIER_LIST['해커'].includes(item.curTier)).length,
    gukbap: architects.filter((item) => TIER_LIST['국밥'].includes(item.curTier)).length,
    pro: architects.filter((item) => TIER_LIST['프로'].includes(item.curTier)).length,
    gyeruik: architects.filter((item) => TIER_LIST['계륵'].includes(item.curTier)).length,
    noob: architects.filter((item) => TIER_LIST['눕'].includes(item.curTier)).length,
    unranked: architects.filter((item) => TIER_LIST['언랭'].includes(item.curTier)).length,
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
