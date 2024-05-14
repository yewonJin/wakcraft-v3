import { TierColor } from '@/components/atoms/Button'
import { DetailedTier, Tier } from '@/types/architect'

export const TIER_LIST: {
  [key in Tier]: DetailedTier[]
} = {
  해커: ['마카게', '오마카세', '해커'],
  국밥: ['해장국', '국밥', '미지근한 국밥'],
  프로: ['프로'],
  계륵: ['계추', '계륵'],
  눕: ['가짜 눕', '퓨어 눕'],
  언랭: ['언랭'],
}

export const All_TIER_LIST = Object.values(TIER_LIST).flat()

export const DESCRIPTION_TIER: { [key in DetailedTier]: string } = {
  마카게: `실력은 말 할 것도 없고 여러가지 새로운 도전으로 감동까지 주는사람`,
  오마카세: `실력은 거의 마카게에 근접해서 열심히 하면 마카게 갈수도 있는데 우승할 주제 고르기보다 자기가 만들고 싶은거 무조건 만들어야 되서 결국 자기가 만들고 싶은거 자주 만들다보니 평균 점수가 마카게에 닿지 않아서 결국 마카게로 못올라가고 있는 사람 (실력은 진짜 주제잘고르고 포텐 터지면 마카게급 만들어내는 사람이긴 함) 혹은 해커와 마카게 사이인 사람`,
  해커: `크기와 디테일이 모두 좋고 색감 혹은 연출 까지 다 잘하는 진짜 고수`,
  해장국: `이 사람 그냥 해커나 마찬가지인데 왠지 해커들 사이에 놓으면 또 해커는 아니라서 미치겠는 사람 (프로로 가면 눕프핵 밸런스 개망치고 해커로 가면 감동을 망쳐서 결국 컨텐츠를 시원하게 말아먹게 되는)`,
  국밥: `프로와 해커 사이 정도의 실력을 갖춘 사람 `,
  '미지근한 국밥': `노력도는 국밥인데 느낌스는 프로인 사람`,
  프로: `잘 만드는 사람`,
  계추: `계륵들 중 프로로 추천할 만한 사람`,
  계륵: `눕도 아니고 프로도 아닌 그 중간 어딘가인 사람`,
  '가짜 눕': `페이스를 조절한 눕`,
  '퓨어 눕': `진짜 개 못해서 진짜 눕 구하기 어려운 요즘시대에 꼭 필요한 눕`,
  언랭: `현재 티어가 없는 사람`,
}

export const TIER_BACKGROUND_COLOR: { [key in DetailedTier]: TierColor } = {
  마카게: 'pink',
  오마카세: 'pink',
  해커: 'violet',
  해장국: 'cyan',
  국밥: 'cyan',
  '미지근한 국밥': 'cyan',
  프로: 'amber',
  계추: 'slate',
  계륵: 'slate',
  '가짜 눕': 'yellow',
  '퓨어 눕': 'yellow',
  언랭: 'yellow',
}
