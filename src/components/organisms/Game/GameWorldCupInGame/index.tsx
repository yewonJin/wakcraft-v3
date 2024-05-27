import ReactPlayer from 'react-player'
import Image from 'next/image'

import Icon from '@/components/atoms/Icon'

import useWorldCupGame from '@/hooks/useWorldCupGame'
import { RoundOfNumber } from '@/types/worldcup'
import { renameTo1080Webp } from '@/utils/shared'

type Props = {
  roundOfNumber: RoundOfNumber
  endGame: () => void
}

export default function GameWorldCupInGame({ roundOfNumber, endGame }: Props) {
  const { isMounted, index, selectedPos, onQuestionClick, curRoundQuestions, player, togglePlayer } = useWorldCupGame(
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
          onClick={() => onQuestionClick('left', curRoundQuestions[index])}
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
