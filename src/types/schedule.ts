type Status = 'before_announcement' | 'after_announcement' | 'after_content'

export type Schedule = {
  status: Status
  isTributeContent: boolean
  date: string
  content: string
  title: string
  episode: number
  participants: string[]
  announcement_link: string
  youtube_link: string
}
