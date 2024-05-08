'use client'

import Link from 'next/link'

import ImageBox from '@/components/atoms/ImageBox'
import TierBox from '@/components/atoms/TierBox'
import Icon from '@/components/atoms/Icon'

import { GuessTime, MatchYourTier, PlacementTest } from '@/types/content'

type Props = PlacementTestProps | MatchYourTierProps | GuessTimeProps

type PlacementTestProps = {
  type: '배치고사'
  architectures: PlacementTest['participants']
}

type MatchYourTierProps = {
  type: '티어 맞추기'
  architectures: MatchYourTier['participants']
}

type GuessTimeProps = {
  type: '시간 맞추기'
  architectures: GuessTime['participants']
}

export default function ArchitectureList({ type, architectures }: Props) {
  switch (type) {
    case '배치고사':
      return (
        <div className="mt-16 grid grid-cols-1 gap-6 gap-y-12 md:grid-cols-2 2xl:w-[1400px] 2xl:grid-cols-3">
          {architectures
            .sort((a, b) => a.order - b.order)
            .map((architecture) => (
              <div key={architecture.minecraft_id} className="relative">
                <ImageBox imageUrl={architecture.image_url}>
                  <p
                    onClick={(e) => e.stopPropagation()}
                    className="peer absolute bottom-4 left-0 bg-[rgba(0,0,0,0.6)] py-1 pl-3 pr-2 text-base text-[white] hover:bg-[rgba(0,0,0,0.8)]"
                  >
                    <Link href={`/architect/${architecture.minecraft_id}`}>{architecture.minecraft_id}</Link>
                  </p>
                </ImageBox>
                <div className="absolute left-2 top-2 flex flex-col gap-16 md:left-3 md:top-3 [&>span]:text-base [&>div]:w-[68px] [&>div]:h-[75px]">
                  <TierBox tier={architecture.placement_result} />
                </div>
              </div>
            ))}
        </div>
      )

    case '티어 맞추기':
      return (
        <div className="mt-16 grid grid-cols-1 gap-6 gap-y-12 md:grid-cols-2 2xl:w-[1400px] 2xl:grid-cols-3">
          {architectures
            .sort((a, b) => a.order - b.order)
            .map((architecture) => (
              <div key={architecture.minecraft_id} className="relative">
                <ImageBox imageUrl={architecture.image_url} minecraft_id={architecture.minecraft_id}>
                  <div
                    className="group/youtube peer absolute right-2 top-2 z-10 w-8 rounded-lg bg-[#121212] fill-[#fff] p-[3px] text-left opacity-90 hover:cursor-pointer hover:rounded-l-none hover:opacity-100"
                    onClick={(e) => {
                      e.stopPropagation()
                      window.open(architecture.youtube_url)
                    }}
                  >
                    <Icon type="link" width="26px" height="26px" />
                    <p className="invisible absolute right-8 top-0 flex h-8 w-max items-center bg-[#121212] pb-[1px] pl-[10px] pr-[6px] text-sm text-[white] group-hover/youtube:visible group-hover/youtube:rounded-l-lg">
                      유튜브로 이동
                    </p>
                  </div>
                </ImageBox>
                <div className="absolute left-2 top-2 flex flex-col gap-[6px] md:left-3 md:top-3 [&>span]:text-base">
                  <p className=" px-2 py-1 text-[white]" style={{ textShadow: '1px 1px 1px #222' }}>
                    <span className="text-[#aaa]">예상 : </span> {architecture.expectedTier}
                  </p>
                  <p className=" px-2 py-1 text-[white]" style={{ textShadow: '1px 1px 1px #222' }}>
                    <span className="text-[#aaa]">정답 : </span> {architecture.currentTier}
                  </p>
                </div>
              </div>
            ))}
        </div>
      )

    case '시간 맞추기':
      return (
        <div className="mt-16 grid grid-cols-1 gap-6 gap-y-12 md:grid-cols-2 2xl:w-[1400px] 2xl:grid-cols-3">
          {architectures
            .sort((a, b) => a.order - b.order)
            .map((architecture) => (
              <div key={architecture.minecraft_id} className="relative">
                <ImageBox imageUrl={architecture.image_url} minecraft_id={architecture.minecraft_id}>
                  <div
                    className="group/youtube peer absolute right-2 top-2 z-10 w-8 rounded-lg bg-[#121212] fill-[#fff] p-[3px] text-left opacity-90 hover:cursor-pointer hover:rounded-l-none hover:opacity-100"
                    onClick={(e) => {
                      e.stopPropagation()
                      window.open(architecture.youtube_url)
                    }}
                  >
                    <Icon type="link" width="26px" height="26px" />
                    <p className="invisible absolute right-8 top-0 flex h-8 w-max items-center bg-[#121212] pb-[1px] pl-[10px] pr-[6px] text-sm text-[white] group-hover/youtube:visible group-hover/youtube:rounded-l-lg">
                      유튜브로 이동
                    </p>
                  </div>
                </ImageBox>
                <div className="absolute left-2 top-2 flex flex-col gap-[6px] md:left-3 md:top-3 [&>span]:text-base">
                  <p className=" px-2 py-1 text-[white]" style={{ textShadow: '1px 1px 1px #222' }}>
                    <span className="text-[#aaa]">예상 : </span> {architecture.expectedTime}시간
                  </p>
                  <p className=" px-2 py-1 text-[white]" style={{ textShadow: '1px 1px 1px #222' }}>
                    <span className="text-[#aaa]">정답 : </span> {architecture.time}시간
                  </p>
                </div>
              </div>
            ))}
        </div>
      )
  }
}
