import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { setWinner } from '@/apis/client/worldcup'
import { useWorldCupStore } from '@/store/worldcup'
import { RoundOfNumber } from '@/types/worldcup'
import { renameTo1080Webp } from '@/utils/shared'

type Props = {
  roundOfNumber: RoundOfNumber
}

export default function GameWorldCupWinner({ roundOfNumber }: Props) {
  const { winner } = useWorldCupStore()

  useEffect(() => {
    if (!winner) return

    if (roundOfNumber !== 128) return

    setWinner(winner.workInfo.subject)
  }, [])

  if (!winner) return

  return (
    <div className="mx-auto px-4 pt-32 2xl:max-w-[1500px] ">
      <h2 className={'text-center text-4xl text-text-primary'}>우승</h2>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
        <h3 className="text-2xl text-text-primary">{`눕프핵 ${winner.workInfo.episode}회 :  ${winner.workInfo.subject}`}</h3>
        <Link href={`/architect/${winner.workInfo.minecraft_id}`}>
          <h4 className="text-xl text-text-secondary hover:text-text-primary">{`${winner.workInfo.minecraft_id}`}</h4>
        </Link>
      </div>
      <div className="mt-6 flex justify-center gap-4">
        <button
          className="rounded-md bg-background-secondary px-3 py-2 text-text-secondary hover:bg-background-tertiary"
          onClick={() => location.reload()}
        >
          다시하기
        </button>
        <Link href={'/game/worldcup/ranking'}>
          <button className="rounded-md bg-background-secondary px-3 py-2 text-text-secondary hover:bg-background-tertiary">
            랭킹보기
          </button>
        </Link>
      </div>
      <div className="relative mx-auto mt-4 aspect-video xl:max-w-[1000px] 2xl:max-w-[1200px]">
        <Image alt="우승 작품" sizes="1400px" fill src={renameTo1080Webp(winner.workInfo.image_url)} />
      </div>
    </div>
  )
}
