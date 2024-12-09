'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import Icon from '@/components/atoms/Icon'
import Typography from '@/components/atoms/Typography'
import { Content } from '@/types/content'
import { getDateString } from '@/utils/shared'

type Props = {
  type: Content
  episode: number
  subject: string
  youtube_url: string
  linesSubject?: string[]
  isContributedContent?: boolean
  date: Date
}

export default function CardViewItem({
  type,
  episode,
  subject,
  youtube_url,
  linesSubject,
  date,
  isContributedContent,
}: Props) {
  const router = useRouter()

  const getYoutubeThumbnailImageUrl = (youtube_url: string) => {
    return `https://i.ytimg.com/vi/${youtube_url.split('/')[3]}/hq720.jpg`
  }

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

      case '건축 콘테스트':
        return `/content/architecture_contest/${episode}`
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

  const generateContentBadge = () => {
    if (isContributedContent) {
      return (
        <span className=" bg-lime-900 text-[#ddd] text-sm px-2 py-1 rounded-md top-2 left-2 absolute">조공 컨텐츠</span>
      )
    }

    if (type === '이벤트 눕프핵') {
      return (
        <span className=" bg-rose-900  text-[#ddd] text-sm px-2 py-1 rounded-md top-2 left-2 absolute">
          이벤트 눕프핵
        </span>
      )
    }

    if (type === '배치고사') {
      return (
        <span className=" bg-amber-900 text-[#ddd] text-sm px-2 py-1 rounded-md top-2 left-2 absolute">배치고사</span>
      )
    }

    if (type === '건축 콘테스트') {
      return (
        <span className=" bg-sky-900 text-[#ddd] text-sm px-2 py-1 rounded-md top-2 left-2 absolute">
          건축 콘테스트
        </span>
      )
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
          {generateContentBadge()}
        </div>
        <div className="px-4 pb-4 pt-6 [&>p]:text-end flex flex-col gap-4">
          <div className="flex items-center gap-3 ">
            <Typography variants="h2" style={{ fontSize: '20px', lineHeight: '24px' }}>
              {getContentTitle(type, subject, episode)}
            </Typography>
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
          <div className="flex justify-between items-center border-t-[1px] pt-3 border-background-tertiary">
            <div className="flex rounded-md items-center gap-1">
              {youtube_url !== 'null' && (
                <div
                  className="flex items-center text-text-tertiary text-sm bg-background-primary px-2 py-1 gap-1 rounded-md [&>div>svg]:fill-text-tertiary hover:bg-background-tertiary"
                  onClick={(e) => {
                    e.preventDefault()
                    window.open(youtube_url)
                  }}
                >
                  <Icon type="link" width="20px" height="20px" />
                  <span>유튜브</span>
                </div>
              )}
            </div>
            <Typography variants="p" color="tertiary" style={{ fontSize: '14px' }}>
              {getDateString(date)}
            </Typography>
          </div>
        </div>
      </div>
    </Link>
  )
}
