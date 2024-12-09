'use client'

import Link from 'next/link'

import ImageBox from '@/components/atoms/ImageBox'
import TierBox from '@/components/atoms/TierBox'

import { GridEventNoobProHacker, PlacementTest } from '@/types/content'

type Props = PlacementTestProps | GridEventNoobProHackerProps

type PlacementTestProps = {
  type: '배치고사'
  architectures: PlacementTest['participants']
}

type GridEventNoobProHackerProps = {
  type: '그리드 이벤트 눕프핵'
  architectures: GridEventNoobProHacker['participants']
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

    case '그리드 이벤트 눕프핵':
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
                <div className="absolute left-2 top-2 flex flex-col gap-[6px] md:left-3 md:top-3 [&>span]:text-base">
                  <p className=" px-2 py-1 text-[white]" style={{ textShadow: '1px 1px 1px #222' }}>
                    {architecture.topText && <span className="text-[#aaa]"> {architecture.topText}</span>}
                  </p>
                  <p className=" px-2 py-1 text-[white]" style={{ textShadow: '1px 1px 1px #222' }}>
                    {architecture.bottomText && <span className="text-[#aaa]"> {architecture.bottomText}</span>}
                  </p>
                </div>
              </div>
            ))}
        </div>
      )
  }
}
