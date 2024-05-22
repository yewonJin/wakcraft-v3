'use client'

import Image from 'next/image'
import Link from 'next/link'

import Icon from '@/components/atoms/Icon'
import Typography from '@/components/atoms/Typography'

import { getHackerWinnerLine, getProWinnerLine } from '@/utils/noobprohacker'
import { renameTo1080Webp, renameToWebp } from '@/utils/shared'
import { NoobProHacker } from '@/types/content'

type Props = {
  noobprohackers: NoobProHacker[]
}

export default function HomeRecentWinner(props: Props) {
  const { noobprohackers } = props

  return (
    <div className="">
      <Typography variants="h2" style={{ fontSize: '30px', lineHeight: '40px' }}>
        최근 우승 작품
      </Typography>
      <div className={`relative mt-10 flex flex-wrap gap-5 gap-y-8 md:[&>div:nth-child(2)]:flex-row-reverse`}>
        {noobprohackers.map((noobprohacker) => (
          <div key={noobprohacker.contentInfo.episode} className="flex w-full flex-col gap-5 md:flex-row">
            <RecentWinnerItem type="hacker" noobprohacker={noobprohacker} getWinnerLine={getHackerWinnerLine} />
            <RecentWinnerItem type="pro" noobprohacker={noobprohacker} getWinnerLine={getProWinnerLine} />
          </div>
        ))}
      </div>
    </div>
  )
}

type RecentWinnerProps = {
  type: 'hacker' | 'pro'
  noobprohacker: NoobProHacker
  getWinnerLine: typeof getHackerWinnerLine | typeof getProWinnerLine
}

const RecentWinnerItem = ({ type, noobprohacker, getWinnerLine }: RecentWinnerProps) => {
  return (
    <div
      style={{
        boxShadow: '1px 1px 5px #222',
      }}
      className={`relative aspect-video w-full rounded-3xl hover:cursor-pointer ${
        type === 'hacker' ? 'md:w-3/5' : 'md:w-2/5'
      } [&>img]:rounded-3xl`}
      onClick={() =>
        window.open(renameTo1080Webp(getWinnerLine(noobprohacker).line_details[type === 'hacker' ? 2 : 1].image_url))
      }
    >
      <Image
        alt={`${type} 우승 작품`}
        sizes={`${type === 'hacker' ? '800px' : '500px'}`}
        fill
        style={{ objectFit: 'cover' }}
        src={renameToWebp(getWinnerLine(noobprohacker).line_details[type === 'hacker' ? 2 : 1].image_url)}
      />
      <div
        className="absolute bottom-4 left-[50%] z-10 flex w-max translate-x-[-50%] items-center gap-4 rounded-lg bg-[rgba(0,0,0,0.7)] px-4 py-2 text-[white] hover:cursor-auto"
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        {getWinnerLine(noobprohacker).line_details[2].youtube_url !== 'null' && (
          <span
            className="hidden pt-[2px] hover:cursor-pointer sm:block [&>svg]:h-6 [&>svg]:w-6 [&>svg]:fill-[#aaa] [&>svg]:hover:fill-[white]"
            onClick={() =>
              window.open(getWinnerLine(noobprohacker).line_details[type === 'hacker' ? 2 : 1].youtube_url)
            }
          >
            <Icon type="link" />
          </span>
        )}
        <p className="text-base sm:text-lg">
          <span className="text-[#ddd]">{`${noobprohacker.contentInfo.episode}회 : `}</span>
          {getWinnerLine(noobprohacker).subject}
        </p>
        <Link href={`/architect/${getWinnerLine(noobprohacker).line_details[type === 'hacker' ? 2 : 1].minecraft_id}`}>
          <p className="text-sm text-[#aaa] hover:text-[white] sm:text-base">
            {getWinnerLine(noobprohacker).line_details[type === 'hacker' ? 2 : 1].minecraft_id}
          </p>
        </Link>
      </div>
    </div>
  )
}
