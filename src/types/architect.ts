// TODO: noobprohackerInfo 이름 변경해야 할듯?

export type Architect = {
  minecraft_id: string
  wakzoo_id: string
  tier: DetailedTier[]
  curTier: DetailedTier
  placementTest_link: string
  noobprohackerInfo: {
    win: number
    hackerWin: number
    proWin: number
    participation: number
  }
  portfolio: {
    noobprohacker: NoobProHackerPortfolioItem[]
    architectureNoobProHacker: NoobProHackerPortfolioItem[]
    placementTest: PlacementTestPortfolioItem[]
    eventNoobProHacker: EventNoobProHackerPortfolioItem[]
    architectureContest: EventNoobProHackerPortfolioItem[]
  }
}

export type NoobProHackerPortfolioItem = {
  episode: number
  subject: string
  line: string
  image_url: string
  youtube_url: string
  ranking: number
  date: Date
}

export type PlacementTestPortfolioItem = {
  season: number
  image_url: string
  placement_result: DetailedTier
  date: Date
  ranking: number
}

export interface EventNoobProHackerPortfolioItem extends NoobProHackerPortfolioItem {
  contentName: string
}

export type Tier = '해커' | '국밥' | '프로' | '계륵' | '눕' | '언랭'

export type DetailedTier =
  | '마카게'
  | '오마카세'
  | '해커'
  | '해장국'
  | '국밥'
  | '미지근한 국밥'
  | '프로'
  | '계추'
  | '계륵'
  | '가짜 눕'
  | '퓨어 눕'
  | '언랭'

export interface SearchedArchitect extends Architect {
  minecraftIdIndexArr: number[]
  wakzooIdIndexArr: number[]
}
