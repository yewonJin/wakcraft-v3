import { Fragment } from 'react'
import Link from 'next/link'
import { headers } from 'next/headers'

import ContentCarousel from '@/components/molecules/ContentCarousel'
import Icon from '@/components/atoms/Icon'

import { NoobProHacker } from '@/types/content'
import { isMobile } from '@/utils/shared'

type Props = {
  noobprohacker: NoobProHacker
}

export default function NoobProHackerDetail({ noobprohacker }: Props) {
  const headersList = headers()
  const userAgent = headersList.get('user-agent') as string

  return (
    <Fragment>
      <title>{`왁크래프트 | 눕프로해커 ${noobprohacker.contentInfo.episode}회`}</title>
      <div className="mx-auto max-w-[1200px]">
        <h2 className="px-4 text-xl text-text-secondary md:text-2xl xl:px-0">
          제 {noobprohacker.contentInfo.episode}회
        </h2>
        <div className="mt-4 flex items-end gap-6 px-4 xl:px-0">
          <h1 className={`text-2xl text-text-primary md:text-4xl`}>
            {'눕프로해커 : ' + noobprohacker.contentInfo.main_subject + '편'}
          </h1>
          {noobprohacker.contentInfo.youtube_url !== 'null' && (
            <Link href={noobprohacker.contentInfo.youtube_url}>
              <span className="[&>div>svg]:h-8 [&>div>svg]:w-8 [&>div>svg]:fill-text-tertiary hover:[&>div>svg]:fill-text-primary">
                <Icon type="link" />
              </span>
            </Link>
          )}
        </div>
      </div>
      <ContentCarousel type="눕프로해커" isMobile={isMobile(userAgent)} content={noobprohacker} />
    </Fragment>
  )
}
