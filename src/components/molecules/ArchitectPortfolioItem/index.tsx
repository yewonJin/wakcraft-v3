'use client'

import { useMemo } from 'react'

import Icon from '@/components/atoms/Icon'
import ImageBox from '@/components/atoms/ImageBox'
import Typography from '@/components/atoms/Typography'

type Props = {
  imageUrl: string
  youtubeUrl?: string
  architectNumber?: number
  isUnlimitedTime?: boolean
  contentName: string
  subject: string
  tier?: string
  ranking?: number
}

export default function ArchitectPortfolioItem({
  imageUrl,
  youtubeUrl,
  isUnlimitedTime,
  architectNumber,
  contentName,
  subject,
  tier,
  ranking,
}: Props) {
  const getSummary = useMemo(() => {
    if (isUnlimitedTime && architectNumber && architectNumber > 1) {
      return `무제한급 + ${architectNumber}명 작품`
    }

    return (isUnlimitedTime && '무제한급') || (architectNumber && architectNumber > 1 && architectNumber + '명 작품')
  }, [isUnlimitedTime, architectNumber])

  const getBackgroundColor = useMemo(() => {
    switch (tier) {
      case '해커':
        return 'bg-[#881337]'

      case '프로':
        return 'bg-[#0c4a6e]'

      case '눕':
        return 'bg-[#713f12]'

      default:
        return 'bg-[#333]'
    }
  }, [tier])

  return (
    <div className="flex flex-col gap-4">
      <ImageBox imageUrl={imageUrl}>
        {youtubeUrl && (
          <div
            className="group/youtube peer absolute right-2 top-2 z-10 w-8 rounded-lg bg-[#121212] fill-[#fff] p-[3px] text-left opacity-90 hover:cursor-pointer hover:rounded-l-none hover:opacity-100"
            onClick={(e) => {
              e.stopPropagation()
              window.open(youtubeUrl)
            }}
          >
            <Icon type="link" width="26px" height="26px" />
            <p className="invisible absolute right-8 top-0 flex h-8 w-max items-center bg-[#121212] pb-[1px] pl-[10px] pr-[6px] text-sm text-[white] group-hover/youtube:visible group-hover/youtube:rounded-l-lg">
              유튜브로 이동
            </p>
          </div>
        )}
        {(isUnlimitedTime === true || architectNumber) && (
          <div className="absolute left-[6px] top-[6px] rounded-lg bg-[#121212] px-[10px] py-1 text-sm text-[white] group-hover/image:visible peer-hover:invisible">
            {getSummary}
          </div>
        )}
      </ImageBox>
      <div className={`flex ${tier || ranking !== undefined ? 'justify-between' : 'justify-center'} `}>
        {!tier && ranking !== undefined && <span className="min-w-[85px]"></span>}
        {tier && (
          <div
            className={`flex min-w-[85px] items-center justify-center rounded-lg ${getBackgroundColor} text-[white]`}
          >
            {tier}
          </div>
        )}
        <div className="flex flex-col gap-1 items-center">
          <Typography variants="p" color="tertiary">
            {contentName}
          </Typography>
          <Typography variants="p" color="primary">
            {subject}
          </Typography>
        </div>
        {ranking !== undefined && (
          <div className="flex min-w-[85px] flex-col items-center gap-1">
            <Typography variants="p" color="tertiary">
              순위
            </Typography>
            <Typography variants="p" color="primary">
              {ranking + '위'}
            </Typography>
          </div>
        )}
      </div>
    </div>
  )
}
