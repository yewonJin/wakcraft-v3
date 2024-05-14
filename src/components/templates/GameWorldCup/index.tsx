'use client'

import { Dispatch, SetStateAction, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ReactPlayer from 'react-player'

import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'
import SelectBox from '@/components/atoms/SelectBox'

import { setWinner } from '@/apis/client/worldcup'

import useWorldCupGame from '@/hooks/useWorldCupGame'
import useWorldCupSetting from '@/hooks/useWorldCupSetting'
import { RoundOfNumber } from '@/types/worldcup'
import { renameTo1080Webp } from '@/utils/shared'
import { useWorldCupStore } from '@/store/worldcup'

export default function GameWorldCup() {
  const { page, roundOfNumber, setRoundOfNumber, startGame, endGame } = useWorldCupSetting()

  if (page === 0) {
    return <GameSetting roundOfNumber={roundOfNumber} setRoundOfNumber={setRoundOfNumber} startGame={startGame} />
  } else if (page === 1) {
    return <InGame roundOfNumber={roundOfNumber} endGame={endGame} />
  } else if (page === 2) {
    return <Winner roundOfNumber={roundOfNumber} />
  }
}

type GameSettingProps = {
  roundOfNumber: RoundOfNumber
  setRoundOfNumber: Dispatch<SetStateAction<RoundOfNumber>>
  startGame: () => void
}

const GameSetting = ({ roundOfNumber, setRoundOfNumber, startGame }: GameSettingProps) => {
  return (
    <div className="mx-auto max-w-[1200px] px-4 pb-8 pt-24 xl:px-0 xl:pt-32">
      <h1 className={`text-3xl text-text-primary`}>눕프핵 해커 월드컵</h1>
      <div className="mt-6 flex items-end gap-4">
        <SelectBox
          width="80px"
          height="40px"
          value={roundOfNumber}
          options={[128, 64, 32, 16]}
          optionSuffix="강"
          handleSelectChange={(e) => setRoundOfNumber(parseInt(e.target.value) as RoundOfNumber)}
        />
        <Button handleButtonClick={() => startGame()} text="시작" />
        <Link href={'/game/worldcup/ranking'}>
          <Button text="랭킹 보기" />
        </Link>
      </div>
      <ul className="mt-12 list-disc text-text-secondary">
        <h3 className="text-xl text-text-primary">읽어주세요</h3>
        <li className="ml-5 mt-4">최근 눕프핵 작품을 우선으로 합니다.</li>
        <li className="ml-5 mt-4">정확한 데이터를 위해 128강 외에는 투표 결과를 반영하지 않습니다.</li>
      </ul>
    </div>
  )
}

type InGameProps = {
  roundOfNumber: RoundOfNumber
  endGame: () => void
}

const InGame = ({ roundOfNumber, endGame }: InGameProps) => {
  const { isMounted, index, selectedPos, onQustionClick, curRoundQuestions, player, togglePlayer } = useWorldCupGame(
    roundOfNumber,
    endGame,
  )

  if (curRoundQuestions.length === 0) return

  return (
    <div className="relative mx-auto flex h-[100vh] flex-col justify-center md:max-w-[1200px] 2xl:max-w-[1500px]">
      <div className="flex items-end gap-4 px-2 sm:px-0">
        <h2 className="text-3xl text-text-primary sm:px-0">{curRoundQuestions.length + '강'}</h2>
        <p className="text-2xl text-text-secondary">{`(${index / 2 + 1}/${curRoundQuestions.length / 2})`}</p>
      </div>
      <div className={`relative mt-4 flex ${selectedPos !== '' ? 'gap-0' : 'gap-2 md:gap-4'}`}>
        <div
          className={`relative flex-1 overflow-hidden hover:cursor-pointer [&>img]:duration-300 ${
            selectedPos !== 'left' ? 'aspect-[1/1.3] md:aspect-square' : 'aspect-video'
          } ${selectedPos === 'right' ? 'flex-none' : 'flex-1'} ${
            selectedPos !== '' ? 'duration-500' : '[&>img]:hover:scale-105'
          }
            }`}
          onClick={() => onQustionClick('left', curRoundQuestions[index])}
        >
          <Image
            alt="왼쪽 월드컵 이미지"
            priority
            fill
            sizes="1400px"
            style={{ objectFit: 'cover' }}
            src={renameTo1080Webp(curRoundQuestions[index].workInfo.image_url)}
          />

          {curRoundQuestions[index + 2] && (
            <Image
              fill
              style={{ display: 'none' }}
              alt="preload 이미지"
              priority
              sizes="1400px"
              src={renameTo1080Webp(curRoundQuestions[index + 2].workInfo.image_url)}
            />
          )}
          <div
            className="absolute bottom-4 left-[50%] hidden w-max translate-x-[-50%] items-center gap-4 rounded-lg bg-[rgba(0,0,0,0.8)] px-4 py-2 text-[white] hover:cursor-auto md:flex"
            onClick={(e) => e.stopPropagation()}
          >
            {curRoundQuestions[index].workInfo.youtube_url !== 'null' && (
              <span
                className="peer hover:scale-105 hover:cursor-pointer [&>div]:h-7 [&>div]:w-7 [&>div]:fill-[#ccc] hover:[&>div]:fill-[white]"
                onClick={() => togglePlayer('left')}
              >
                {player.left ? <Icon type="pause" /> : <Icon type="play_arrow" />}
              </span>
            )}
            <div className="invisible absolute -top-12 left-1 w-max rounded-md bg-[rgba(0,0,0,0.9)] px-2 py-2 text-sm peer-hover:visible [&>div]:absolute [&>div]:left-[3px] [&>div]:top-4 [&>div]:h-11 [&>div]:w-11 [&>div]:rotate-180 [&>div]:fill-[rgba(0,0,0,0.9)]">
              <Icon type="arrow_drop_up" /> {player.left ? '영상 숨기기' : '영상 재생하기'}
            </div>
            <p className="text-lg text-[#ccc]">{`${curRoundQuestions[index].workInfo.episode}회 : ${curRoundQuestions[index].workInfo.subject}`}</p>
            <p className="pb-[2px] text-lg">{curRoundQuestions[index].workInfo.minecraft_id}</p>
          </div>
          {isMounted && (
            <div className={`${player.left ? 'block' : 'hidden'} absolute bottom-32 aspect-video w-full`}>
              <ReactPlayer
                playing={player.left}
                width="100%"
                height="100%"
                controls
                url={curRoundQuestions[index].workInfo.youtube_url}
              />
            </div>
          )}
        </div>
        <div
          className={`relative ${selectedPos === 'left' ? 'flex-none' : 'flex-1'} ${
            selectedPos !== '' ? 'duration-500' : '[&>img]:hover:scale-105'
          }
             overflow-hidden hover:cursor-pointer [&>img]:duration-500 [&>img]:hover:scale-105`}
          style={{
            aspectRatio: selectedPos !== 'right' ? '1/1' : '16/9',
          }}
          onClick={() => onQustionClick('right', curRoundQuestions[index + 1])}
        >
          <Image
            alt="오른쪽 월드컵 이미지"
            priority
            sizes="1400px"
            fill
            src={renameTo1080Webp(curRoundQuestions[index + 1].workInfo.image_url)}
            style={{ objectFit: 'cover' }}
          />

          {curRoundQuestions[index + 3] && (
            <Image
              fill
              alt="preload 이미지"
              priority
              sizes="1400px"
              style={{ display: 'none' }}
              src={renameTo1080Webp(curRoundQuestions[index + 3].workInfo.image_url)}
            />
          )}
          <div
            className="absolute bottom-4 left-[50%] hidden w-max translate-x-[-50%] items-center gap-4 rounded-lg bg-[rgba(0,0,0,0.8)] px-4 py-2 text-[white] hover:cursor-auto md:flex"
            onClick={(e) => e.stopPropagation()}
          >
            {curRoundQuestions[index + 1].workInfo.youtube_url !== 'null' && (
              <span
                className="peer hover:scale-105 hover:cursor-pointer [&>div>svg]:h-7 [&>div>svg]:w-7 [&>div>svg]:fill-[#ccc] hover:[&>div>svg]:fill-[white]"
                onClick={() => togglePlayer('right')}
              >
                {player.right ? <Icon type="pause" /> : <Icon type="play_arrow" />}
              </span>
            )}
            <div className="invisible absolute -top-12 left-1 w-max rounded-md bg-[rgba(0,0,0,0.9)] px-2 py-2 text-sm peer-hover:visible [&>div]:absolute [&>div]:left-[3px] [&>div]:top-4 [&>div]:h-11 [&>div]:w-11 [&>div]:rotate-180 [&>div]:fill-[rgba(0,0,0,0.9)]">
              <Icon type="arrow_drop_up" />
              {player.right ? '영상 숨기기' : '영상 재생하기'}
            </div>
            <p className="text-lg text-[#ccc]">{`${curRoundQuestions[index + 1].workInfo.episode}회 : ${
              curRoundQuestions[index + 1].workInfo.subject
            }`}</p>
            <p className="pb-[2px] text-lg">{curRoundQuestions[index + 1].workInfo.minecraft_id}</p>
          </div>
          {isMounted && (
            <div className={`${player.right ? 'block' : 'hidden'} absolute bottom-32 aspect-video w-full`}>
              <ReactPlayer
                playing={player.right}
                width="100%"
                height="100%"
                controls
                url={curRoundQuestions[index + 1].workInfo.youtube_url}
              />
            </div>
          )}
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 md:hidden">
        <div
          className={`bg-rgba(0,0,0,0.6) flex flex-col items-center justify-center text-text-primary ${
            selectedPos === 'right' ? 'hidden' : ''
          } ${selectedPos === 'left' ? 'col-span-2' : ''}`}
          onClick={(e) => e.stopPropagation()}
        >
          <p className="text-sm text-[#ccc]">{`${curRoundQuestions[index].workInfo.episode}회 : ${curRoundQuestions[index].workInfo.subject}`}</p>
          <p className="pb-[2px] text-base">{curRoundQuestions[index].workInfo.minecraft_id}</p>
        </div>
        <div
          className={`bg-rgba(0,0,0,0.6) flex flex-col  items-center justify-center text-text-primary  ${
            selectedPos === 'left' ? 'hidden' : ''
          } ${selectedPos === 'right' ? 'col-span-2' : ''}`}
          onClick={(e) => e.stopPropagation()}
        >
          <p className="text-sm text-[#ccc]">{`${curRoundQuestions[index + 1].workInfo.episode}회 : ${
            curRoundQuestions[index + 1].workInfo.subject
          }`}</p>
          <p className="pb-[2px] text-base">{curRoundQuestions[index + 1].workInfo.minecraft_id}</p>
        </div>
      </div>
    </div>
  )
}

type WinnerProps = {
  roundOfNumber: RoundOfNumber
}

const Winner = ({ roundOfNumber }: WinnerProps) => {
  const { winner } = useWorldCupStore()

  useEffect(() => {
    if (!winner) return

    if (roundOfNumber !== 128) return

    setWinner(winner.workInfo.subject)
  }, [])

  if (!winner) return

  return (
    <div className="mx-auto px-4 pt-32 2xl:max-w-[1500px] ">
      <h2 className={'text-center text-4xl text-text-primary'}>우승</h2>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
        <h3 className="text-2xl text-text-primary">{`눕프핵 ${winner.workInfo.episode}회 :  ${winner.workInfo.subject}`}</h3>
        <Link href={`/architect/${winner.workInfo.minecraft_id}`}>
          <h4 className="text-xl text-text-secondary hover:text-text-primary">{`${winner.workInfo.minecraft_id}`}</h4>
        </Link>
      </div>
      <div className="mt-6 flex justify-center gap-4">
        <button
          className="rounded-md bg-background-secondary px-3 py-2 text-text-secondary hover:bg-background-tertiary"
          onClick={() => location.reload()}
        >
          다시하기
        </button>
        <Link href={'/game/worldcup/ranking'}>
          <button className="rounded-md bg-background-secondary px-3 py-2 text-text-secondary hover:bg-background-tertiary">
            랭킹보기
          </button>
        </Link>
      </div>
      <div className="relative mx-auto mt-4 aspect-video xl:max-w-[1000px] 2xl:max-w-[1200px]">
        <Image alt="우승 작품" sizes="1400px" fill src={renameTo1080Webp(winner.workInfo.image_url)} />
      </div>
    </div>
  )
}
