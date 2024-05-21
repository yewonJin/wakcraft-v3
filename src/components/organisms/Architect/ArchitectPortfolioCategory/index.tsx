import Button from '@/components/atoms/Button'

type Props = {
  category: string
  handleCategoryClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export default function ArchitectPortfolioCategory({ category, handleCategoryClick }: Props) {
  return (
    <div className={'overflow-x-scroll md:overflow-x-auto ' + 'category-scrollbar'}>
      <div className="flex w-max items-center gap-3 pb-4 text-sm text-text-primary md:flex-wrap md:gap-4 md:overflow-x-hidden md:text-base">
        <Button text="전체보기" name="" handleButtonClick={handleCategoryClick} isClicked={category === ''} />
        <Button
          text="눕프로해커"
          name="noobprohacker"
          handleButtonClick={handleCategoryClick}
          isClicked={category === 'noobprohacker'}
        />
        <Button
          text="배치고사"
          name="placementTest"
          handleButtonClick={handleCategoryClick}
          isClicked={category === 'placementTest'}
        />
        <Button
          text="이벤트 눕프핵"
          name="eventNoobProHacker"
          handleButtonClick={handleCategoryClick}
          isClicked={category === 'eventNoobProHacker'}
        />
      </div>
    </div>
  )
}
