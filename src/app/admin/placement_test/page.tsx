'use client'

import Image from 'next/image'

import { InputForm } from '@/components/molecules/Form'
import Button from '@/components/atoms/Button'
import SelectBox from '@/components/atoms/SelectBox'

import { usePlacementTest } from '@/hooks/Admin/usePlacementTest'
import { PlacementTest } from '@/types/content'
import { renameToWebp } from '@/utils/shared'
import { All_TIER_LIST } from '@/constants/architect'

export default function Page() {
  const {
    placementTest,
    handleContentInputChange,
    handleParticipantInputChange,
    handleParticipantSelectChange,
    handleSubmit,
    imagesName,
  } = usePlacementTest()

  return (
    <div className="">
      <h2 className={`text-3xl text-text-primary`}>배치고사</h2>
      <Content placementTest={placementTest} handleInputChange={handleContentInputChange} handleSubmit={handleSubmit} />
      {Array.isArray(imagesName) ? (
        <Participants
          placementTest={placementTest}
          handleParticipantInputChange={handleParticipantInputChange}
          handleParticipantSelectChange={handleParticipantSelectChange}
        />
      ) : (
        <div className="mt-8 text-lg text-text-primary">시즌 이미지를 모두 업로드해주세요</div>
      )}
    </div>
  )
}

type ContentProps = {
  placementTest: PlacementTest
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: () => void
}

const Content = ({ placementTest, handleInputChange, handleSubmit }: ContentProps) => {
  return (
    <div className="mt-8 flex gap-8 ">
      <div className="flex flex-col gap-4">
        <p className="text-text-secondary">시즌</p>
        <span className="rounded-md text-center text-xl text-text-primary">{placementTest.season}</span>
      </div>
      <InputForm
        label="날짜"
        type="date"
        name="date"
        handleInputChange={handleInputChange}
        value={placementTest.date}
      />
      <InputForm
        label="유튜브 링크"
        type="text"
        name="youtube_url"
        handleInputChange={handleInputChange}
        value={placementTest.youtube_url}
      />
      <Button text="추가" handleButtonClick={handleSubmit} />
    </div>
  )
}

type ParticipantsProps = {
  placementTest: PlacementTest
  handleParticipantInputChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void
  handleParticipantSelectChange: (e: React.ChangeEvent<HTMLSelectElement>, index: number) => void
}

const Participants = ({
  placementTest,
  handleParticipantInputChange,
  handleParticipantSelectChange,
}: ParticipantsProps) => {
  return (
    <div className="mt-12 grid grid-cols-3 gap-8">
      {placementTest.participants.map((participant, index) => (
        <div key={participant.minecraft_id}>
          <div className="relative aspect-video">
            <Image alt="배치고사 이미지" fill src={renameToWebp(participant.image_url)} sizes="400px" />
            <span className="absolute left-2 top-2 z-10 bg-[rgba(0,0,0,0.8)] px-2 py-1 text-[white]">
              {participant.minecraft_id}
            </span>
          </div>
          <div className="mt-4 flex gap-8">
            <InputForm
              label="순서"
              name="order"
              type="number"
              value={participant.order}
              handleInputChange={(e) => handleParticipantInputChange(e, index)}
            />
            <div className="flex flex-col gap-2 [&>select]:h-[40px]">
              <label className="text-text-secondary">배치 티어</label>
              <SelectBox
                options={All_TIER_LIST}
                value={participant.placement_result}
                handleSelectChange={(e) => handleParticipantSelectChange(e, index)}
              />
            </div>
            <InputForm
              label="랭킹"
              name="ranking"
              type="number"
              value={participant.ranking}
              handleInputChange={(e) => handleParticipantInputChange(e, index)}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
