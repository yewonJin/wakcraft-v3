import Button from '@/components/atoms/Button'
import Search from '@/components/molecules/Search'
import SortButton from '@/components/molecules/SortButton'

import { All_TIER_LIST, TIER_BACKGROUND_COLOR } from '@/constants/architect'
import { SortBy } from '@/store/architect'

type Props = {
  input: string
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  isDescending: boolean
  sortBy: SortBy
  handleSortClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  curCategory: string
  handleCategoryClick: (tier: string) => void
}

export default function ArchitectCategory({
  input,
  handleCategoryClick,
  isDescending,
  sortBy,
  handleSortClick,
  curCategory,
  handleInputChange,
}: Props) {
  return (
    <div className="flex flex-col gap-4 mt-6">
      <div className="flex w-full flex-wrap justify-between gap-4 lg:h-[40px] lg:flex-nowrap [&>div]:first-of-type:w-full md:[&>div]:first-of-type:w-auto">
        <Search name="search" value={input} handleInputChange={handleInputChange} />
        <div className="flex flex-wrap items-center gap-3">
          <SortButton
            handleButtonClick={handleSortClick}
            text="티어"
            isClicked={sortBy === 'tier'}
            isDescending={isDescending}
            data-value="tier"
          />
          <SortButton
            text="참여 횟수"
            isClicked={sortBy === 'participation'}
            isDescending={isDescending}
            handleButtonClick={handleSortClick}
            data-value="participation"
          />
          <SortButton
            text="우승 횟수"
            isClicked={sortBy === 'win'}
            isDescending={isDescending}
            handleButtonClick={handleSortClick}
            data-value="win"
          />
          <SortButton
            text="해커 우승"
            isClicked={sortBy === 'hackerWin'}
            isDescending={isDescending}
            handleButtonClick={handleSortClick}
            data-value="hackerWin"
          />
          <SortButton
            text="프로 우승"
            isClicked={sortBy === 'proWin'}
            isDescending={isDescending}
            handleButtonClick={handleSortClick}
            data-value="proWin"
          />
        </div>
      </div>
      <div
        className={
          'flex w-full overflow-hidden overflow-x-scroll rounded-lg bg-background-secondary md:overflow-x-auto ' +
          'category-scrollbar'
        }
      >
        <div className="flex items-center gap-3 px-2 py-3 text-sm text-text-primary md:flex-wrap md:gap-4 md:overflow-x-hidden md:text-base [&>button]:w-max">
          {All_TIER_LIST.map((tier) => (
            <Button
              text={tier}
              key={tier}
              color={TIER_BACKGROUND_COLOR[tier]}
              handleButtonClick={() => handleCategoryClick(tier)}
              isClicked={curCategory === tier}
              style={{ padding: '8px 14px' }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
