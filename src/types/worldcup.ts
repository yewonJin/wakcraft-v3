export type Worldcup = {
  game: string
  workInfo: {
    minecraft_id: string
    episode: number
    subject: string
    image_url: string
    youtube_url: string
  }
  numberOfWin: number
  numberOfParticipation: number
}

export type RoundOfNumber = 128 | 64 | 32 | 16
