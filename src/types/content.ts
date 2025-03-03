import { DetailedTier } from './architect'

export type Content = '눕프로해커' | '건축 눕프핵' | '이벤트 눕프핵' | '배치고사' | '건축 콘테스트'

export type ContentInfo = {
  episode: number
  subject: string
  date: string
  youtube_url: string
}

export interface ExtendedContentInfo extends ContentInfo {
  isContributedContent: boolean
}

export type LineInfo = {
  subject: string
  line_ranking: number
  line_details: {
    line: string
    minecraft_id: string
    image_url: string
    youtube_url: string
    ranking: number
  }[]
}[]

export type NoobProHacker = {
  contentInfo: ContentInfo
  lineInfo: LineInfo
}

export type SweepLine = {
  episode: number
  line_details: NoobProHacker['lineInfo'][0]['line_details']
  line_ranking: number
  subject: string
}

export type ArchitectureContest = {
  contentInfo: ExtendedContentInfo
  lineInfo: {
    line: string
    line_details: {
      topText: string
      bottomText: string
      minecraft_id: string
      image_url: string
      youtube_url: string
      ranking: number
      constructionTime: number
    }[]
  }[]
}

export type EventNoobProHacker = LineEventNoobProHacker | GridEventNoobProHacker

export type LineEventNoobProHacker = {
  type: 'line'
  contentInfo: ExtendedContentInfo
  lineInfo: {
    subject: string
    line_ranking: number
    line_details: {
      line: string
      minecraft_id: string[]
      image_url: string
      youtube_url: string
      ranking: number
      constructionTime: number
    }[]
  }[]
}

export type GridEventNoobProHacker = {
  type: 'grid'
  contentInfo: ExtendedContentInfo
  participants: {
    order: number
    topText: string
    bottomText: string
    minecraft_id: string
    image_url: string
    youtube_url: string
    ranking: number
    constructionTime: number
  }[]
}

export type PlacementTest = {
  season: number
  date: string
  youtube_url: string
  participants: {
    minecraft_id: string
    image_url: string
    order: number
    placement_result: DetailedTier
    ranking: number
  }[]
}
