import GameWorldCupArchitectureList from '@/components/organisms/Game/GameWorldCupArchitectureList'

export default function GameWorldCupRanking() {
  return (
    <div className="mx-auto max-w-[1200px] px-2 pb-8 pt-24 xl:px-0 xl:pt-32">
      <h1 className={`px-2 text-3xl text-text-primary xl:px-0`}>랭킹</h1>
      <div className="mt-8 flex h-[70px] w-full items-center gap-4 rounded-md bg-background-secondary px-3 text-sm text-text-secondary sm:gap-10 sm:px-6 sm:text-base">
        <p className="w-[30px] text-center">순위</p>
        <p className="w-[90px] sm:w-[150px]">이미지</p>
        <p className="flex-[2]">주제</p>
        <p className="flex-1 md:flex-[2]">우승 비율</p>
        <p className="hidden flex-1 md:flex">링크</p>
      </div>
      <GameWorldCupArchitectureList />
    </div>
  )
}
