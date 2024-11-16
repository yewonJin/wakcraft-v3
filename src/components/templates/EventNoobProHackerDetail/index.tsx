import { Fragment } from 'react'
import Link from 'next/link'
import { headers } from 'next/headers'

import ContentCarousel from '@/components/molecules/ContentCarousel'
import Icon from '@/components/atoms/Icon'
import ArchitectureList from '@/components/organisms/ArchitectureList'

import { EventNoobProHacker } from '@/types/content'
import { isMobile } from '@/utils/shared'

type Props = {
  eventNoobProHacker: EventNoobProHacker
}

export default async function EventNoobProHackerDetail({ eventNoobProHacker }: Props) {
  const userAgent = headers().get('user-agent') as string

  if (eventNoobProHacker.type === 'grid') {
    return (
      <div className="mx-auto max-w-[1200px] px-4 xl:px-0">
        <title>{`왁크래프트 | 이벤트 눕프핵 - ${eventNoobProHacker.contentInfo.subject}`}</title>
        <div className="mx-auto max-w-[1200px]">
          <div className="mt-4 flex items-end gap-6 px-4 xl:px-0">
            <h1 className={`text-3xl text-text-primary md:text-4xl`}>{eventNoobProHacker.contentInfo.subject}</h1>
            {eventNoobProHacker.contentInfo.youtube_url !== 'null' && (
              <Link href={eventNoobProHacker.contentInfo.youtube_url}>
                <span className="[&>div>svg]:h-8 [&>div>svg]:w-8 [&>div>svg]:fill-text-tertiary hover:[&>div>svg]:fill-text-primary">
                  <Icon type="link" />
                </span>
              </Link>
            )}
          </div>
        </div>
        <ArchitectureList type="그리드 이벤트 눕프핵" architectures={eventNoobProHacker.participants} />
      </div>
    )
  }

  return (
    <Fragment>
      <title>{`왁크래프트 | 이벤트 눕프핵 - ${eventNoobProHacker.contentInfo.subject}`}</title>
      <div className="mx-auto max-w-[1200px]">
        <div className="mt-4 flex items-end gap-6 px-4 xl:px-0">
          <h1 className={`text-3xl text-text-primary md:text-4xl`}>{eventNoobProHacker.contentInfo.subject}</h1>
          {eventNoobProHacker.contentInfo.youtube_url !== 'null' && (
            <Link href={eventNoobProHacker.contentInfo.youtube_url}>
              <span className="[&>div>svg]:h-8 [&>div>svg]:w-8 [&>div>svg]:fill-text-tertiary hover:[&>div>svg]:fill-text-primary">
                <Icon type="link" />
              </span>
            </Link>
          )}
        </div>
      </div>
      <ContentCarousel type="이벤트 눕프핵" content={eventNoobProHacker} isMobile={isMobile(userAgent)} />
    </Fragment>
  )
}
