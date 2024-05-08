'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import Icon from '@/components/atoms/Icon'
import Typography from '@/components/atoms/Typography'
import { getDateString } from '@/utils/shared'
import { Content } from '@/types/content'

type Props = {
  type: Content
  episode: number
  subject: string
  youtube_url: string
  linesSubject?: string[]
  date: Date
}

const getYoutubeThumbnailImageUrl = (youtube_url: string) => {
  return `https://i.ytimg.com/vi/${youtube_url.split('/')[3]}/hq720.jpg`
}

export default function CardViewItem({ type, episode, subject, youtube_url, linesSubject, date }: Props) {
  const router = useRouter()

  const getContentLinkUrl = (type: Content, episode: number) => {
    switch (type) {
      case '눕프로해커':
        return `/noobprohacker/${episode}`

      case '건축 눕프핵':
        return `/content/architecture_noobprohacker/${episode}`

      case '이벤트 눕프핵':
        return `/content/event_noobprohacker/${episode}`

      case '배치고사':
        return `/content/placement_test/${episode}`

      case '티어 맞추기':
        return `/content/match_your_tier/${episode}`

      case '건축 콘테스트':
        return `/content/architecture_contest/${episode}`

      case '시간 맞추기':
        return `/content/guess_time/${episode}`
    }
  }

  const getContentTitle = (type: Content, subject: string, episode: number) => {
    switch (type) {
      case '눕프로해커':
        return `눕프로해커 ${episode}회 : ${subject}`

      case '건축 눕프핵':
        return `건축 눕프로해커 ${episode}회`

      case '배치고사':
        return `제 ${episode}회 배치고사`

      case '건축 콘테스트':
        return `건축 콘테스트 : ${subject}`

      default:
        return `${subject}`
    }
  }

  return (
    <Link href={getContentLinkUrl(type, episode)}>
      <div className="group h-min rounded-xl bg-background-secondary duration-300 hover:-translate-y-2 hover:cursor-pointer">
        <div className="relative aspect-video w-full overflow-hidden rounded-t-xl bg-background-tertiary [&>img]:brightness-[60%] [&>img]:duration-300 group-hover:[&>img]:scale-105 group-hover:[&>img]:filter-none">
          {youtube_url !== 'null' ? (
            <Image src={getYoutubeThumbnailImageUrl(youtube_url)} alt="유튜브 썸네일" fill sizes="400px" />
          ) : (
            <div></div>
          )}
        </div>
        <div className="px-4 pb-4 pt-6 [&>p]:text-end flex flex-col gap-4">
          <div className="flex items-center gap-3 ">
            <Typography variants="h2">{getContentTitle(type, subject, episode)}</Typography>
            {youtube_url !== 'null' && (
              <div
                onClick={(e) => {
                  e.preventDefault()
                  window.open(youtube_url)
                }}
                className="[&>div>svg]:fill-text-secondary [&>div>svg]:rotate-[135deg] [&>div>svg]:hover:fill-text-primary"
              >
                <Icon type="link" width="24px" height="24px" pointerOnHover />
              </div>
            )}
          </div>
          {linesSubject && (
            <div className="flex flex-wrap gap-2 text-sm text-text-tertiary">
              {linesSubject.map((lineSubject) => (
                <span
                  key={lineSubject}
                  className=" bg-background-primary rounded-md px-2 py-1 duration-300 hover:bg-background-tertiary hover:cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault()
                    router.push(`${getContentLinkUrl(type, episode)}#${lineSubject}`)
                  }}
                >{`#${lineSubject}`}</span>
              ))}
            </div>
          )}
          <Typography variants="p" fontSize="14px" color="tertiary">
            {getDateString(date)}
          </Typography>
        </div>
      </div>
    </Link>
  )
}
