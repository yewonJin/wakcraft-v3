'use client'

import Button from '@/components/atoms/Button'
import SelectBox from '@/components/atoms/SelectBox'
import Typography from '@/components/atoms/Typography'
import { InputForm } from '@/components/molecules/Form'

import { useSchedule } from '@/hooks/Admin/useSchedule'
import { SCHEDULES_CONTENT } from '@/constants/schedule'

export default function Page() {
  const { isEdit, schedule, schedules, handleInputChange, handleSelectChange, handleEditClick, handleSubmit } =
    useSchedule()

  return (
    <div>
      <h2 className={`text-3xl text-text-primary`}>스케쥴</h2>
      <div className="mt-16 flex justify-between">
        <div className="">
          <div className="flex justify-between">
            <h3 className={`text-2xl text-text-primary`}>{`스케쥴 ${isEdit ? '수정' : '추가'}`}</h3>
            <Button handleButtonClick={handleSubmit} text={isEdit ? '수정' : '추가'} />
          </div>
          <div className="mt-8 flex gap-4 text-text-secondary">
            <div className="flex flex-col gap-2">
              <Typography variants="p" color="secondary">
                공지
              </Typography>
              <select
                name="status"
                value={schedule.status}
                className="h-[40px] w-[100px] rounded-md border-2 border-background-tertiary bg-background-primary pl-2 text-text-secondary outline-none"
                onChange={handleSelectChange}
              >
                <option value="before_announcement">공지 전</option>
                <option value="after_announcement">공지 후</option>
                <option value="after_content">컨텐츠 후</option>
              </select>
            </div>
            <InputForm
              label="날짜"
              type="date"
              value={schedule.date}
              name="date"
              handleInputChange={handleInputChange}
            />
            <div className="flex flex-col gap-2">
              <Typography variants="p" color="secondary">
                조공 컨텐츠?
              </Typography>
              <select
                value={schedule.isTributeContent ? 'true' : 'false'}
                name="isTributeContent"
                className="h-[40px] w-[80px] rounded-md border-2 border-background-tertiary bg-background-primary pl-2 text-text-secondary outline-none"
                onChange={handleSelectChange}
              >
                <option value={'true'}>예</option>
                <option value={'false'}>아니오</option>
              </select>
            </div>
          </div>
          <div className="mt-8 flex gap-4 text-text-secondary">
            <div className="flex flex-col gap-2">
              <Typography variants="p" color="secondary">
                컨텐츠
              </Typography>
              <SelectBox
                value={schedule.content}
                name="content"
                handleSelectChange={handleSelectChange}
                options={SCHEDULES_CONTENT}
                style={{ width: '160px', height: '40px' }}
              />
            </div>
            <InputForm
              label="회차"
              name="episode"
              value={schedule.episode}
              type="number"
              handleInputChange={handleInputChange}
              width="48px"
            />
            <InputForm
              label="컨텐츠 제목 (e.g. 자유, VR챗)"
              type="text"
              name="title"
              value={schedule.title}
              handleInputChange={handleInputChange}
            />
          </div>
          <div className="mt-8 flex gap-4 text-text-secondary">
            <InputForm
              label="공지 링크"
              type="text"
              name="announcement_link"
              value={schedule.announcement_link}
              handleInputChange={handleInputChange}
            />
            <InputForm
              label="유튜브 링크"
              type="text"
              name="youtube_link"
              value={schedule.youtube_link}
              handleInputChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <h3 className={`text-2xl text-text-primary`}>스케쥴 리스트</h3>
          <ul className="mt-4 flex flex-col gap-2">
            {schedules?.map((schedule, index) => (
              <li
                key={schedule.date}
                className="flex items-center gap-2 bg-background-secondary px-2 py-2 text-text-secondary"
              >
                <p>{schedule.status}</p>
                <p>{schedule.date}</p>
                <p>{schedule.content}</p>
                <p>{schedule.episode}</p>
                <Button handleButtonClick={() => handleEditClick(index)} text="수정" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
