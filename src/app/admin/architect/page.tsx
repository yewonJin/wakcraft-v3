'use client'

import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import SelectBox from '@/components/atoms/SelectBox'
import { InputForm } from '@/components/molecules/Form'
import SearchResult from '@/components/molecules/SearchResult'

import { useAddArchitect } from '@/hooks/Admin/useAddArchitect'
import { useEditArchitect } from '@/hooks/Admin/useEditArchitect'
import { All_TIER_LIST } from '@/constants/architect'

export default function Page() {
  return (
    <div className="flex gap-8">
      <AddArchitect />
      <EditArchitect />
    </div>
  )
}

const AddArchitect = () => {
  const { input, handleInputChange, handleButtonClick } = useAddArchitect()

  return (
    <div className="">
      <h2 className={`text-3xl text-text-primary`}>건축가 추가</h2>
      <div className="flex flex-col gap-6 pt-8">
        <InputForm
          label="마인크래프트 아이디"
          name="minecraft_id"
          value={input.minecraft_id}
          handleInputChange={handleInputChange}
        />
        <InputForm
          label="왁물원 아이디"
          name="wakzoo_id"
          value={input.wakzoo_id}
          handleInputChange={handleInputChange}
        />
        <Button handleButtonClick={handleButtonClick} text="건축가 추가" />
      </div>
    </div>
  )
}

const EditArchitect = () => {
  const {
    searchInput,
    setSearchInput,
    highlightedArchitects,
    input,
    architect,
    handleInputChange,
    handleSelectChange,
    mutation,
  } = useEditArchitect()

  if (!highlightedArchitects) return <div>loading...</div>

  return (
    <div>
      <h2 className={`text-3xl text-text-primary`}>건축가 수정</h2>
      <div className="flex flex-col gap-8 pt-8 md:flex-row">
        <div className="">
          <p className="mb-2 text-text-secondary">아이디 검색</p>
          <Input
            name="searchArchitect"
            type="text"
            handleInputChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value)}
            value={searchInput}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Tab') {
                setSearchInput(highlightedArchitects[0].wakzoo_id)
              }
            }}
          />
          <div className="relative w-[250px]">
            <SearchResult input={searchInput} setInput={setSearchInput} highlightedArchitects={highlightedArchitects} />
          </div>
        </div>
        {input && (
          <div className="">
            <div className="flex flex-col gap-2 text-text-secondary">
              <p>이전 마인크래프트 아이디</p>
              <p className="flex h-[40px] w-[200px] items-center rounded-md border-2 border-background-tertiary bg-background-secondary pl-3">
                {architect?.minecraft_id}
              </p>
            </div>
            <div className="mb-4 mt-8 flex flex-col gap-4">
              <InputForm
                label="바꿀 마인크래프트 아이디"
                name="minecraft_id"
                value={input.minecraft_id}
                type="text"
                handleInputChange={handleInputChange}
              />
              <InputForm
                label="바꿀 왁물원 아이디"
                name="wakzoo_id"
                value={input.wakzoo_id}
                type="text"
                handleInputChange={handleInputChange}
              />
              <SelectBox
                value={input.tier}
                options={All_TIER_LIST}
                handleSelectChange={handleSelectChange}
                height="40px"
              ></SelectBox>
            </div>
            <Button
              handleButtonClick={() => {
                if (!architect) return

                mutation.mutate()
              }}
              text="변경"
            />
          </div>
        )}
      </div>
    </div>
  )
}
