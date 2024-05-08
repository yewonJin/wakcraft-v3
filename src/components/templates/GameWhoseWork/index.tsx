'use client'

import { useCallback } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import Image from 'next/image'

import PageTitle from '@/components/organisms/Common/PageTitle'
import SearchResult from '@/components/molecules/SearchResult'
import Icon from '@/components/atoms/Icon'
import Input from '@/components/atoms/Input'
import Button from '@/components/atoms/Button'

import useWhoseWorkSetting from '@/hooks/useWhoseWorkSetting'
import useWhoseWorkGame from '@/hooks/useWhoseWorkGame'
import { Architect } from '@/types/architect'
import { Question, WhoseWork } from '@/types/whoseWork'
import { renameTo1080Webp } from '@/utils/shared'
import { useWhoseWorkStore } from '@/store/whoseWork'

type Props = {
  architects: Architect[]
}

export default function GameWhoseWork(props: Props) {
  const { architects } = props

  const { page, startGame, questions, endGame, restartGame, whoseWork } = useWhoseWorkSetting()

  const gameProgression = () => {
    switch (page) {
      case 0:
        return <StartSetting startGame={startGame} />

      case 1:
        return <InGame architects={architects} questions={questions} endGame={endGame} />

      case 2:
        return <Score whoseWork={whoseWork as WhoseWork} restartGame={restartGame} />
    }
  }

  return <div className="mx-auto max-w-[1200px]">{gameProgression()}</div>
}

type StartSettingProps = {
  startGame: () => void
}

const StartSetting = ({ startGame }: StartSettingProps) => {
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

type InGameProps = {
  architects: Architect[]
  questions: Question[]
  endGame: () => void
}

const InGame = ({ architects, questions, endGame }: InGameProps) => {
  const {
    input,
    setInput,
    index,
    highlightedArchitects,
    showAnswer,
    handleInputChange,
    nextButtonRef,
    inputRef,
    handleKeyDown,
    moveToNextAnswer,
    onSubmit,
  } = useWhoseWorkGame(architects, questions, endGame)

  return (
    <div className="mt-0 sm:mt-8">
      {index < questions.length && (
        <div
          className={`relative mx-auto aspect-square h-full max-h-[60vh] max-w-[1200px] md:aspect-video xl:w-[60vw]`}
        >
          <Image
            alt="작품 이미지"
            priority
            style={{ objectFit: 'cover' }}
            sizes="1200px"
            fill
            src={renameTo1080Webp(questions[index]?.image_url)}
          />
          {questions[index + 1] && (
            <Image
              style={{ display: 'none' }}
              alt="작품 이미지"
              priority
              sizes="1200px"
              fill
              src={renameTo1080Webp(questions[index + 1]?.image_url)}
            />
          )}
        </div>
      )}
      {showAnswer ? (
        <div className="mx-auto flex h-[70px] w-full items-center justify-center gap-2 pt-8 text-lg text-text-secondary sm:w-[400px]">
          <p className="text-base">정답 :</p>
          <p className="text-text-primary">
            {architects.filter((architect) => architect.minecraft_id === questions[index].minecraft_id)[0].wakzoo_id}
          </p>
          <p className="text-base">
            {architects.filter((architect) => architect.minecraft_id === questions[index].minecraft_id)[0].minecraft_id}
          </p>
          <button
            ref={nextButtonRef}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                moveToNextAnswer()
              }
            }}
            onClick={() => moveToNextAnswer()}
            className={`ml-5 h-[48px] rounded-md border-2 border-background-secondary bg-background-secondary px-3 text-text-primary outline-none hover:bg-background-secondary [&>div]:rotate-180 [&>div>svg]:fill-text-secondary`}
          >
            <Icon type="arrow_back" />
          </button>
        </div>
      ) : (
        <div className="mx-auto mt-8 flex max-w-[900px] justify-center gap-4">
          <div className="relative">
            <Input
              name="search"
              type="text"
              ref={inputRef}
              onKeyDown={handleKeyDown}
              handleInputChange={handleInputChange}
              value={input}
              width="280px"
              height="48px"
            />
            <SearchResult input={input} setInput={setInput} highlightedArchitects={highlightedArchitects} />
          </div>
          <button
            onClick={() => {
              if (highlightedArchitects.length > 1) return

              onSubmit()
            }}
            className={`rounded-md border-2 border-background-secondary px-3 ${
              input.toLowerCase() === highlightedArchitects[0]?.wakzoo_id.toLowerCase() ||
              input.toLowerCase() === highlightedArchitects[0]?.minecraft_id.toLowerCase() ||
              input === '?'
                ? 'bg-background-secondary text-text-primary [&>div>svg]:fill-text-secondary'
                : 'text-background-tertiary  hover:cursor-default [&>div>svg]:fill-background-secondary'
            } outline-none [&>div]:rotate-180 `}
          >
            <Icon type="arrow_back" />
          </button>
        </div>
      )}
    </div>
  )
}

type ScoreProps = {
  whoseWork: WhoseWork
  restartGame: () => void
}

const Score = ({ whoseWork, restartGame }: ScoreProps) => {
  const { correctCount } = useWhoseWorkStore()

  const getTopPercentage = useCallback(() => {
    const sample_size = whoseWork.correctAnswerCountDistribution.reduce((acc, cur) => acc + cur, 0)

    const my_rank = whoseWork.correctAnswerCountDistribution
      .slice(correctCount, whoseWork.correctAnswerCountDistribution.length - 1)
      .reduce((acc, cur) => acc + cur, 0)

    return ((my_rank / sample_size) * 100).toFixed(0)
  }, [whoseWork, correctCount])

  return (
    <div className="relative">
      <div className="relative flex h-[90px] justify-between">
        <div className="absolute left-[50%] flex translate-x-[-50%] flex-col items-center gap-4">
          <p className="text-lg text-text-primary">{'맞힌 문제 : ' + correctCount + '개'}</p>
          <p className="text-2xl text-text-primary">{'상위 ' + getTopPercentage() + '%'}</p>
        </div>
      </div>
      <Chart whoseWork={whoseWork} />
      <div className="mt-14 flex justify-center">
        <Button handleButtonClick={restartGame} text="다시하기" />
      </div>
    </div>
  )
}

type ChartProps = {
  whoseWork: WhoseWork
}

const Chart = ({ whoseWork }: ChartProps) => {
  const maxIndex = Math.max(...whoseWork.correctAnswerCountDistribution)

  const getData = useCallback((whoseWork: WhoseWork) => {
    return whoseWork.correctAnswerCountDistribution.map((item, index) => ({
      name: `${index}개`,
      '인원 수': item,
    }))
  }, [])

  return (
    <div className="mx-auto hidden h-[600px] max-w-[1200px] pt-4 md:block">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={getData(whoseWork)}
          margin={{
            top: 10,
            right: 20,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="5 5" id="CartesianGrid" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, maxIndex]} allowDecimals={false} />
          <Tooltip />
          <Line type="monotone" dataKey="인원 수" activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
      <span className="mt-2 flex justify-center text-xl text-text-secondary">맞힌 개수</span>
    </div>
  )
}
