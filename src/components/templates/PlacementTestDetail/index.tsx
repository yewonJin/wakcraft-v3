import Link from 'next/link'

import { PlacementTest } from '@/types/content'
import Icon from '@/components/atoms/Icon'
import ArchitectureList from '@/components/organisms/ArchitectureList'

type Props = {
  placementTest: PlacementTest
}

export default async function PlacementTestDetail({ placementTest }: Props) {
  return (
    <div className="mx-auto max-w-[1200px] px-4 xl:px-0">
      <title>{`왁크래프트 | 배치고사 시즌${placementTest.season}`}</title>
      <div className="mt-4 flex items-end gap-6">
        <h1 className={`text-3xl text-text-primary md:text-4xl`}>{`시즌 ${placementTest.season} 배치고사`}</h1>
        {placementTest.youtube_url !== 'null' && (
          <Link href={placementTest.youtube_url}>
            <span className="[&>div>svg]:h-8 [&>div>svg]:w-8 [&>div>svg]:fill-text-tertiary hover:[&>div>svg]:fill-text-primary">
              <Icon type="link" />
            </span>
          </Link>
        )}
      </div>
      <ArchitectureList type="배치고사" architectures={placementTest.participants} />
    </div>
  )
}
