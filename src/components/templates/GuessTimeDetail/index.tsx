import Link from 'next/link'

import ArchitectureList from '@/components/organisms/ArchitectureList'
import Icon from '@/components/atoms/Icon'

import { GuessTime } from '@/types/content'

type Props = {
  guessTime: GuessTime
}

export default function GuessTimeDetail({ guessTime }: Props) {
  return (
    <div className="mx-auto max-w-[1200px] px-4 xl:px-0">
      <title>{`왁크래프트 | 시간 맞추기`}</title>
      <div className="mt-4 flex items-end gap-6">
        <h1 className={`text-3xl text-text-primary xl:text-4xl`}>{guessTime.contentInfo.subject}</h1>
        {guessTime.contentInfo.youtube_url !== 'null' && (
          <Link href={guessTime.contentInfo.youtube_url}>
            <span className="[&>div>svg]:h-8 [&>div>svg]:w-8 [&>div>svg]:fill-text-tertiary hover:[&>div>svg]:fill-text-primary">
              <Icon type="link" />
            </span>
          </Link>
        )}
      </div>
      <ArchitectureList type="시간 맞추기" architectures={guessTime.participants} />
    </div>
  )
}
