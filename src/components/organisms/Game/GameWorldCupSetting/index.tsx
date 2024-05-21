import Link from 'next/link'

import Button from '@/components/atoms/Button'
import SelectBox from '@/components/atoms/SelectBox'

import { RoundOfNumber } from '@/types/worldcup'

type Props = {
  roundOfNumber: RoundOfNumber
  setRoundOfNumber: React.Dispatch<React.SetStateAction<RoundOfNumber>>
  startGame: () => void
}

export default function GameWorldCupSetting({ roundOfNumber, setRoundOfNumber, startGame }: Props) {
  return (
    <div className="mx-auto max-w-[1200px] px-4 pb-8 pt-24 xl:px-0 xl:pt-32">
      <h1 className={`text-3xl text-text-primary`}>눕프핵 해커 월드컵</h1>
      <div className="mt-6 flex items-end gap-4">
        <SelectBox
          width="80px"
          height="40px"
          value={roundOfNumber}
          options={[128, 64, 32, 16]}
          optionSuffix="강"
          handleSelectChange={(e) => setRoundOfNumber(parseInt(e.target.value) as RoundOfNumber)}
        />
        <Button handleButtonClick={() => startGame()} text="시작" />
        <Link href={'/game/worldcup/ranking'}>
          <Button text="랭킹 보기" />
        </Link>
      </div>
      <ul className="mt-12 list-disc text-text-secondary">
        <h3 className="text-xl text-text-primary">읽어주세요</h3>
        <li className="ml-5 mt-4">최근 눕프핵 작품을 우선으로 합니다.</li>
        <li className="ml-5 mt-4">정확한 데이터를 위해 128강 외에는 투표 결과를 반영하지 않습니다.</li>
      </ul>
    </div>
  )
}
