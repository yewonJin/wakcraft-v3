import PageTitle from '@/components/organisms/Common/PageTitle'
import Icon from '@/components/atoms/Icon'

import { useWhoseWorkStore } from '@/store/whoseWork'

type Props = {
  startGame: () => void
}

export default function GameWhoseWorkSetting({ startGame }: Props) {
  const { difficulty, setDifficulty, numberOfArchitecture, setNumberOfArchitecture } = useWhoseWorkStore()

  return (
    <div className="mx-auto flex flex-col xl:max-w-[1200px]">
      <PageTitle title="건축가 맞추기" summary="작품 이미지를 보고 누가 건축했는지 맞추는 게임" />
      <div className="mt-12 flex flex-wrap gap-6  sm:gap-16">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl text-text-primary">난이도</h2>
          <div className="relative flex gap-6">
            <div className="relative">
              <button
                onClick={() => setDifficulty('LOW')}
                className={`peer/low ${
                  difficulty === 'LOW' ? 'bg-text-secondary  text-background-secondary' : ' text-text-secondary'
                } rounded-md border-2 border-background-secondary  p-2 px-5`}
              >
                하
              </button>
              <div className="invisible absolute top-16 rounded-lg bg-text-secondary p-2 px-3 text-background-secondary peer-hover/low:visible [&>div]:absolute [&>div]:-top-6 [&>div]:left-[6px] [&>div]:h-11 [&>div]:w-11 [&>div>svg]:fill-text-secondary">
                <Icon type="arrow_drop_up" />
                <p className="w-max">마카게 ~ 식은 국밥</p>
              </div>
            </div>
            <div className="relative">
              <button
                onClick={() => setDifficulty('MEDIUM')}
                className={`peer/medium ${
                  difficulty === 'MEDIUM' ? 'bg-text-secondary  text-background-secondary' : ' text-text-secondary'
                } rounded-md border-2 border-background-secondary  p-2 px-5`}
              >
                중
              </button>
              <div className="invisible absolute top-16 rounded-lg bg-text-secondary p-2 px-3 text-background-secondary peer-hover/medium:visible [&>div]:absolute [&>div]:-top-6 [&>div]:left-[6px] [&>div]:h-11 [&>div]:w-11 [&>div>svg]:fill-text-secondary">
                <Icon type="arrow_drop_up" />
                <p className="w-max">해장국 ~ 계륵</p>
              </div>
            </div>
            <div className="relative">
              <button
                onClick={() => setDifficulty('HIGH')}
                className={`peer/high ${
                  difficulty === 'HIGH' ? 'bg-text-secondary  text-background-secondary' : ' text-text-secondary'
                } rounded-md border-2 border-background-secondary  p-2 px-5`}
              >
                상
              </button>
              <div className="invisible absolute top-16 rounded-lg bg-text-secondary p-2 px-3 text-background-secondary peer-hover/high:visible [&>div]:absolute [&>div]:-top-6 [&>div]:left-[6px] [&>div]:h-11 [&>div]:w-11 [&>div>svg]:fill-text-secondary">
                <Icon type="arrow_drop_up" />
                <p className="w-max">모든 티어</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl text-text-primary">작품 수</h2>
          <div className="flex gap-6">
            <button
              onClick={() => setNumberOfArchitecture(20)}
              className={`rounded-md border-2 border-background-secondary p-2 px-3 ${
                numberOfArchitecture === 20 ? 'bg-text-secondary  text-background-secondary' : ' text-text-secondary'
              }`}
            >
              20개
            </button>
            <button
              onClick={() => setNumberOfArchitecture(30)}
              className={`rounded-md border-2 border-background-secondary p-2 px-3 ${
                numberOfArchitecture === 30 ? 'bg-text-secondary  text-background-secondary' : ' text-text-secondary'
              }`}
            >
              30개
            </button>
            <button
              onClick={() => setNumberOfArchitecture(50)}
              className={`rounded-md border-2 border-background-secondary p-2 px-3 ${
                numberOfArchitecture === 50 ? 'bg-text-secondary  text-background-secondary' : ' text-text-secondary'
              }`}
            >
              50개
            </button>
          </div>
        </div>
        <button
          className="mt-4 w-full rounded-lg border-2 border-background-secondary bg-background-primary px-8 py-4 text-text-primary hover:bg-text-secondary hover:text-background-secondary sm:w-[230px] md:mt-0"
          onClick={() => startGame()}
        >
          시작하기
        </button>
      </div>

      <ul className="mt-12 list-disc text-text-secondary">
        <h3 className="text-xl text-text-primary">읽어주세요</h3>
        <li className="ml-5 mt-4">
          <span className="mr-1 rounded-md bg-background-tertiary px-2 py-[2px]">Tab</span>
          키를 누르면 가장 일치도가 높은 건축가로 입력 창이 자동 완성됩니다.
        </li>
        <li className="ml-5 mt-4">
          정답을 모르면
          <span className="ml-1 mr-1 rounded-md bg-background-tertiary px-2 py-[2px]">?</span>
          혹은 아무 건축가 이름을 입력해 주세요.
        </li>
      </ul>
    </div>
  )
}
