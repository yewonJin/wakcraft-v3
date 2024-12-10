'use client'

import Button from '@/components/atoms/Button'
import ContentSetting from '@/components/organisms/Admin/ContentSetting'
import GridSetting from '@/components/organisms/Admin/GridSetting'

import { useGridEventNoobProHacker } from '@/hooks/Admin/useGridEventNoobProHacker'

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
            <GridSetting
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
