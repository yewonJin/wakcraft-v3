import Link from 'next/link'

import ArchitectureList from '@/components/organisms/ArchitectureList'
import Icon from '@/components/atoms/Icon'

import { MatchYourTier } from '@/types/content'

type Props = {
  matchYourTier: MatchYourTier
}

export default function MatchYourTierDetail({ matchYourTier }: Props) {
  return (
    <div className="mx-auto max-w-[1200px] px-4 xl:px-0">
      <title>{`왁크래프트 | 티어 맞추기`}</title>
      <div className="mt-4 flex items-end gap-6">
        <h1 className={`text-3xl text-text-primary md:text-4xl`}>{matchYourTier.contentInfo.subject}</h1>
        {matchYourTier.contentInfo.youtube_url !== 'null' && (
          <Link href={matchYourTier.contentInfo.youtube_url}>
            <span className="[&>div>svg]:h-8 [&>div>svg]:w-8 [&>div>svg]:fill-text-tertiary hover:[&>div>svg]:fill-text-primary">
              <Icon type="link" />
            </span>
          </Link>
        )}
      </div>
      <ArchitectureList type="티어 맞추기" architectures={matchYourTier.participants} />
    </div>
  )
}
