'use client'

import Image from 'next/image'

import { InputForm } from '@/components/molecules/Form'
import ContentSetting from '@/components/organisms/Admin/ContentSetting'

import { GridEventNoobProHacker } from '@/types/content'
import { renameToWebp } from '@/utils/shared'
import { useGridEventNoobProHacker } from '@/hooks/Admin/useGridEventNoobProHacker'
import Button from '@/components/atoms/Button'

type ParticipantsProps = {
  eventNoobProHacker: GridEventNoobProHacker
  handleParticipantInputChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void
}

const Participants = ({ eventNoobProHacker, handleParticipantInputChange }: ParticipantsProps) => {
  return (
    <div className="mt-12 grid grid-cols-3 gap-8">
      {eventNoobProHacker.participants.map((participant, index) => (
        <div key={participant.minecraft_id}>
          <div className="relative aspect-video">
            <Image alt="작품 이미지" fill src={renameToWebp(participant.image_url)} sizes="400px" />
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
            <InputForm
              label="위 텍스트"
              name="topText"
              type="text"
              value={participant.topText}
              handleInputChange={(e) => handleParticipantInputChange(e, index)}
            />
            <InputForm
              label="아래 텍스트"
              name="bottomText"
              type="text"
              value={participant.bottomText}
              handleInputChange={(e) => handleParticipantInputChange(e, index)}
            />
            <InputForm
              label="유튜브 링크"
              name="youtube_url"
              type="text"
              value={participant.youtube_url}
              handleInputChange={(e) => handleParticipantInputChange(e, index)}
            />
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

export default function Page() {
  const {
    page,
    imagesName,
    moveToNextPage,
    eventNoobProHacker,
    handleContentInfoChange,
    handleParticipantInputChange,
    addSubmit,
  } = useGridEventNoobProHacker()

  switch (page) {
    case 0:
      return (
        <ContentSetting
          type="기본"
          moveToNextPage={moveToNextPage}
          contentInfo={eventNoobProHacker.contentInfo}
          handleInputChange={handleContentInfoChange}
        />
      )

    case 1:
      return (
        <div className="">
          <h2 className={`text-3xl text-text-primary`}>이벤트 눕프핵</h2>
          <Button onClick={addSubmit} text="추가" />
          {Array.isArray(imagesName) ? (
            <Participants
              eventNoobProHacker={eventNoobProHacker}
              handleParticipantInputChange={handleParticipantInputChange}
            />
          ) : (
            <div className="mt-8 text-lg text-text-primary">시즌 이미지를 모두 업로드해주세요</div>
          )}
        </div>
      )
  }
}
