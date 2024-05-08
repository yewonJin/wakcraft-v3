import { Fragment } from 'react'
import Link from 'next/link'
import { headers } from 'next/headers'

import ContentCarousel from '@/components/molecules/ContentCarousel'
import Icon from '@/components/atoms/Icon'

import { ArchitectureContest } from '@/types/content'
import { isMobile } from '@/utils/shared'

type Props = {
  architectureContest: ArchitectureContest
}

export default async function ArchitectureContestDetail({ architectureContest }: Props) {
  const userAgent = headers().get('user-agent') as string

  return (
    <Fragment>
      <title>{`왁크래프트 | 건축 콘테스트 - ${architectureContest.contentInfo.subject}`}</title>
      <div className="mx-auto max-w-[1200px] px-4 xl:px-0">
        <div className="mt-4 flex items-end gap-6">
          <h1 className={`text-3xl text-text-primary md:text-4xl`}>건축 콘테스트</h1>
          {architectureContest.contentInfo.youtube_url !== 'null' && (
            <Link href={architectureContest.contentInfo.youtube_url}>
              <span className="[&>div>svg]:h-8 [&>div>svg]:w-8 [&>div>svg]:fill-text-tertiary hover:[&>div>svg]:fill-text-primary">
                <Icon type="link" />
              </span>
            </Link>
          )}
        </div>
      </div>
      <ContentCarousel
        type="건축 콘테스트"
        content={JSON.parse(JSON.stringify(architectureContest))}
        isMobile={isMobile(userAgent)}
      />
    </Fragment>
  )
}
