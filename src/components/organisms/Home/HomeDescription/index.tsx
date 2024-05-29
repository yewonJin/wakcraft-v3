import { Fragment } from 'react'

import TierBox from '@/components/atoms/TierBox'

import { DESCRIPTION_TIER, TIER_LIST } from '@/constants/architect'
import { Tier } from '@/types/architect'

type Props = {
  numberOfArchitectsByTier: {
    [key: string]: number
  }
}

export default function HomeDescription(props: Props) {
  const { numberOfArchitectsByTier } = props

  return (
    <div className="mx-auto max-w-[1200px]">
      <Fragment>
        <h2 className={`text-3xl text-text-primary sm:text-4xl`}>눕프로해커</h2>
        <p className="mt-8  text-base text-text-secondary sm:text-lg">
          유튜버 우왁굳의 마인크래프트 치즐 모드 컨텐츠이다.
        </p>
        <p className="mt-3 text-base text-text-secondary sm:text-lg">
          눕, 프로, 해커가 한 라인이 되어 주제를 선정해 작품을 건축하면 우왁굳이 감상하고 평가한다.
        </p>
      </Fragment>
      <div className="mt-12 sm:mt-24">
        <div className="flex flex-wrap gap-6 sm:gap-16 sm:gap-y-20">
          {Object.keys(TIER_LIST).map((tier) => (
            <div
              key={tier}
              className="relative flex items-center gap-4 rounded-xl sm:gap-8 md:border-2 md:border-background-secondary md:p-4 md:px-6"
            >
              <div
                className={`-top-12 left-0 flex w-max items-center gap-3 text-xl text-text-primary sm:absolute md:text-2xl`}
              >
                {tier}
                <span className="rounded-md bg-background-secondary p-1 px-2 text-base text-text-secondary md:text-lg">
                  {numberOfArchitectsByTier[tier]}명
                </span>
              </div>
              {TIER_LIST[tier as Tier].map((tier) => (
                <div
                  key={tier}
                  className="group relative hidden sm:block [&>span]:h-[78px] [&>span]:w-[70px]  [&>span]:select-none [&>span]:duration-100 [&>span]:hover:scale-105 md:[&>span]:h-[94px] md:[&>span]:w-[85px] [&>div:first-of-type]:hover:scale-105"
                >
                  <TierBox tier={tier} />
                  <div className="-bottom-18 absolute z-10 hidden w-max max-w-[300px] animate-fadeIn rounded-lg bg-background-secondary px-4 py-3 text-text-secondary duration-300 md:group-hover:block">
                    {DESCRIPTION_TIER[tier]}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
