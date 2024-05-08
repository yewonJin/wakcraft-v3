import { DetailedTier } from './architect'

export type Content =
  | '눕프로해커'
  | '건축 눕프핵'
  | '이벤트 눕프핵'
  | '배치고사'
  | '티어 맞추기'
  | '시간 맞추기'
  | '건축 콘테스트'

export type NoobProHacker = {
  contentInfo: {
    episode: number
    main_subject: string
    date: string
    youtube_url: string
  }
  lineInfo: {
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
}

export type SweepLine = {
  episode: number
  line_details: NoobProHacker['lineInfo'][0]['line_details']
  line_ranking: number
  subject: string
}

export type ArchitectureContest = {
  contentInfo: {
    subject: string
    episode: number
    date: string
    youtube_url: string
  }
  lineInfo: {
    line: string
    youtube_url: string
    line_details: {
      topText: string
      bottomText: string
      minecraft_id: string
      image_url: string
      youtube_url: string
      ranking: number
    }[]
  }[]
}

export type ArchitectureNoobProHacker = {
  contentInfo: {
    episode: number
    main_subject: string
    date: string
    youtube_url: string
  }
  lineInfo: {
    subject: string
    youtube_url: string
    line_ranking: number
    line_details: {
      line: string
      minecraft_id: string
      image_url: string
      youtube_url: string
      ranking: number
    }[]
  }[]
}

export type EventNoobProHacker = {
  contentInfo: {
    contentName: string
    episode: number
    date: string
    youtube_url: string
    isInFiniteTime: boolean
  }
  lineInfo: {
    subject: string
    youtube_url: string
    line_ranking: number
    line_details: {
      line: string
      minecraft_id: string[]
      image_url: string
      youtube_url: string
      ranking: number
    }[]
  }[]
}

export type GuessTime = {
  contentInfo: {
    contentName: string
    episode: number
    date: string
    youtube_url: string
  }
  participants: {
    order: number
    expectedTime: 2 | 4 | 6 | 8 | 10
    time: 2 | 4 | 6 | 8 | 10
    minecraft_id: string
    image_url: string
    youtube_url: string
  }[]
}

export type MatchYourTier = {
  contentInfo: {
    contentName: string
    episode: number
    date: string
    youtube_url: string
  }
  participants: {
    order: number
    expectedTier: DetailedTier
    currentTier: DetailedTier
    minecraft_id: string
    image_url: string
    youtube_url: string
    ranking: number
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
