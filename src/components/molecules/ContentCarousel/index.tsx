'use client'

import { Dispatch, Fragment, SetStateAction, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { produce } from 'immer'

import Icon from '@/components/atoms/Icon'

import { useSlider } from '@/hooks/useSlider'
import { renameTo1080Webp } from '@/utils/shared'
import { ArchitectureContest, EventNoobProHacker, LineEventNoobProHacker, NoobProHacker } from '@/types/content'

type Props = {
  type: '눕프로해커' | '건축 콘테스트' | '이벤트 눕프핵'
  content: NoobProHacker | ArchitectureContest | LineEventNoobProHacker
  isMobile: boolean
}

export default function ContentCarousel({ type, content, isMobile }: Props) {
  const [page, setPage] = useState(new Array(content.lineInfo.length).fill(0))
  const [isOpenPopOver, setIsOpenPopOver] = useState<boolean[][]>(
    Array.from(Array(content.lineInfo.length), () => Array(content.lineInfo[0].line_details.length || 0).fill(false)),
  )

  return (
    <main className="mb-24 flex flex-col gap-12 overflow-x-hidden md:gap-24 xl:gap-36">
      {content.lineInfo.map((item, index) => {
        let subject, line_ranking

        if (type === '눕프로해커') {
          const content = item as NoobProHacker['lineInfo'][0]
          subject = content.subject
          line_ranking = content.line_ranking
        } else if (type === '건축 콘테스트') {
          const content = item as ArchitectureContest['lineInfo'][0]
          subject = content.line
          line_ranking = null
        } else {
          const content = item as LineEventNoobProHacker['lineInfo'][0]
          subject = content.subject
          line_ranking = content.line_ranking
        }

        return (
          <section key={subject}>
            <div className="mx-auto mt-12 flex max-w-[1200px] items-center justify-between px-4 xl:mt-24 xl:px-0">
              <div className="flex justify-between xl:w-[45vw]">
                <h2 id={subject} className="flex scroll-mt-[20vh] items-center gap-3">
                  <p className="text-text-secondary">{index + 1 + '라인'}</p>
                  <p className="text-xl text-text-primary md:text-2xl">{subject}</p>
                  {line_ranking !== null && (
                    <Fragment>
                      <div className="mx-2 h-8 w-[1px] bg-background-tertiary"></div>
                      <p className="text-lg text-text-primary md:text-xl">{line_ranking + '위'}</p>
                    </Fragment>
                  )}
                </h2>
              </div>
            </div>
            {isMobile ? (
              <CarouselMobileContainer length={content.lineInfo[index].line_details.length}>
                {item.line_details.map((line, detailIndex) => {
                  switch (type) {
                    case '건축 콘테스트':
                      const architectureContest = line as ArchitectureContest['lineInfo'][0]['line_details'][0]

                      return (
                        <div
                          key={line.image_url}
                          className="relative mt-4 aspect-video min-w-[100%] [&>div>img]:rounded-none"
                        >
                          <ContentCarouselItem
                            type="건축 콘테스트"
                            image_url={architectureContest.image_url}
                            youtube_url={architectureContest.youtube_url}
                            minecraft_id={architectureContest.minecraft_id}
                            ranking={architectureContest.ranking}
                            topText={architectureContest.topText}
                            bottomText={architectureContest.bottomText}
                          />
                        </div>
                      )

                    case '눕프로해커':
                      const noobprohacker = line as NoobProHacker['lineInfo'][0]['line_details'][0]

                      return (
                        <div
                          key={line.image_url}
                          className="relative mt-4 aspect-video min-w-[100%] [&>div>img]:rounded-none"
                        >
                          <ContentCarouselItem
                            type="눕프로해커"
                            image_url={noobprohacker.image_url}
                            youtube_url={noobprohacker.youtube_url}
                            minecraft_id={noobprohacker.minecraft_id}
                            ranking={noobprohacker.ranking}
                            line={noobprohacker.line}
                          />
                        </div>
                      )

                    case '이벤트 눕프핵':
                      const eventNoobProHacker = line as LineEventNoobProHacker['lineInfo'][0]['line_details'][0]

                      return (
                        <div
                          key={line.image_url}
                          className="relative mt-4 aspect-video min-w-[100%] [&>div>img]:rounded-none"
                        >
                          <ContentCarouselItem
                            type="이벤트 눕프핵"
                            image_url={eventNoobProHacker.image_url}
                            youtube_url={eventNoobProHacker.youtube_url}
                            minecraft_id={eventNoobProHacker.minecraft_id}
                            ranking={eventNoobProHacker.ranking}
                            line={eventNoobProHacker.line}
                            isOpenPopOver={isOpenPopOver}
                            setIsOpenPopOver={setIsOpenPopOver}
                            index={index}
                            detailIndex={detailIndex}
                          />
                        </div>
                      )
                  }
                })}
              </CarouselMobileContainer>
            ) : (
              <CarouselContainer page={page} index={index}>
                {item.line_details.map((line, detailIndex) => {
                  switch (type) {
                    case '건축 콘테스트':
                      const architectureContest = line as ArchitectureContest['lineInfo'][0]['line_details'][0]

                      return (
                        <ContentCarouselItem
                          key={line.image_url}
                          type="건축 콘테스트"
                          image_url={architectureContest.image_url}
                          youtube_url={architectureContest.youtube_url}
                          minecraft_id={architectureContest.minecraft_id}
                          ranking={architectureContest.ranking}
                          topText={architectureContest.topText}
                          bottomText={architectureContest.bottomText}
                        />
                      )

                    case '눕프로해커':
                      const noobprohacker = line as NoobProHacker['lineInfo'][0]['line_details'][0]

                      return (
                        <ContentCarouselItem
                          key={line.image_url}
                          type="눕프로해커"
                          image_url={noobprohacker.image_url}
                          youtube_url={noobprohacker.youtube_url}
                          minecraft_id={noobprohacker.minecraft_id}
                          ranking={noobprohacker.ranking}
                          line={noobprohacker.line}
                        />
                      )

                    case '이벤트 눕프핵':
                      const eventNoobProHacker = line as LineEventNoobProHacker['lineInfo'][0]['line_details'][0]

                      return (
                        <ContentCarouselItem
                          key={line.image_url}
                          type="이벤트 눕프핵"
                          image_url={eventNoobProHacker.image_url}
                          youtube_url={eventNoobProHacker.youtube_url}
                          minecraft_id={eventNoobProHacker.minecraft_id}
                          ranking={eventNoobProHacker.ranking}
                          line={eventNoobProHacker.line}
                          isOpenPopOver={isOpenPopOver}
                          setIsOpenPopOver={setIsOpenPopOver}
                          index={index}
                          detailIndex={detailIndex}
                        />
                      )
                  }
                })}
              </CarouselContainer>
            )}
            <CarouselSlider
              page={page}
              index={index}
              setPage={setPage}
              length={content.lineInfo[index].line_details.length}
            />
          </section>
        )
      })}
    </main>
  )
}

type CarouselContainerProps = {
  page: number[]
  index: number
  children: React.ReactNode
}

const CarouselContainer = ({ page, index, children }: CarouselContainerProps) => {
  return (
    <div
      className={
        'relative mt-8 flex aspect-video overflow-x-scroll xl:aspect-auto xl:h-[50vh] xl:overflow-x-hidden ' +
        'category-scrollbar'
      }
    >
      <div
        className="relative mx-auto flex w-full gap-14 duration-1000 ease-in-out md:max-w-[1200px]"
        style={{
          transform: `translateX(calc(${-page[index] * 50 * (16 / 9)}vh - ${page[index] * 56}px))`,
        }}
      >
        {children}
      </div>
    </div>
  )
}

type CarouselMobileContainerProps = {
  length: number
  children: React.ReactNode
}

const CarouselMobileContainer = ({ length, children }: CarouselMobileContainerProps) => {
  const { scrollX, isOnScroll, ref, onTouchStart, onTouchMove, onTouchEnd } = useSlider(length)

  return (
    <div
      className="flex "
      ref={ref}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={{
        transform: `translateX(${scrollX}px)`,
        transitionDuration: isOnScroll ? '0ms' : '400ms',
      }}
    >
      {children};
    </div>
  )
}

type ContentCarouselItemProps = NoobProHackerProps | ArchitectureContestProps | EventNoobProHackerProps

type NoobProHackerProps = {
  type: '눕프로해커'
  minecraft_id: string
  image_url: string
  youtube_url: string
  ranking: number
  line: string
}

type ArchitectureContestProps = {
  type: '건축 콘테스트'
  minecraft_id: string
  image_url: string
  youtube_url: string
  ranking: number
  topText: string
  bottomText: string
}

type EventNoobProHackerProps = {
  type: '이벤트 눕프핵'
  minecraft_id: string[]
  image_url: string
  youtube_url: string
  ranking: number
  line: string
  isOpenPopOver: boolean[][]
  setIsOpenPopOver: Dispatch<SetStateAction<boolean[][]>>
  index: number
  detailIndex: number
}

const ContentCarouselItem = (props: ContentCarouselItemProps) => {
  const { type, minecraft_id, image_url, youtube_url, ranking } = props

  return (
    <div
      className="group relative aspect-video h-full hover:cursor-pointer [&>img]:rounded-xl"
      onClick={() => {
        if (youtube_url === 'null') return

        window.open(youtube_url)
      }}
    >
      <Image sizes="1200px" alt="라인 이미지" priority fill src={renameTo1080Webp(image_url)} />
      <div className="peer absolute left-1 top-3 flex flex-col gap-1 rounded-2xl hover:cursor-auto md:left-10 md:top-10 md:gap-3">
        <div className="flex items-end pl-3">
          <p className="text-xl text-[white] lg:text-2xl" style={{ textShadow: '1px 1px 1px #222' }}>
            {type === '건축 콘테스트' ? props.bottomText : props.line}
          </p>
          {type === '이벤트 눕프핵' && minecraft_id.length > 1 && (
            <PopOverButton
              isOpenPopOver={props.isOpenPopOver}
              setIsOpenPopOver={props.setIsOpenPopOver}
              detailIndex={props.detailIndex}
              index={props.index}
            />
          )}
          <div className="flex items-center gap-2 md:items-end">
            <p className="ml-3 text-base text-[white] lg:ml-6 xl:text-lg" style={{ textShadow: '1px 1px 1px #222' }}>
              {ranking}위
            </p>
          </div>
        </div>
        {type === '이벤트 눕프핵' ? (
          <PopOver
            minecraft_id={minecraft_id}
            isOpenPopOver={props.isOpenPopOver}
            index={props.index}
            detailIndex={props.detailIndex}
          />
        ) : (
          <Link href={`/architect/${minecraft_id}`}>
            <p
              className="ml-3 text-[#ccc] hover:cursor-pointer hover:text-[white]"
              style={{ textShadow: '1px 1px 1px #222' }}
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              {minecraft_id}
            </p>
          </Link>
        )}
      </div>
      {youtube_url !== 'null' && (
        <div className="invisible absolute bottom-1 right-1 flex items-center justify-center rounded-md bg-[rgba(0,0,0,0.8)] p-2 px-4 text-sm text-[white] group-hover:visible md:bottom-6 md:right-6 md:text-base">
          클릭하여 유튜브 링크 열기
        </div>
      )}
    </div>
  )
}

type PopOverProps = {
  minecraft_id: string[]
  isOpenPopOver: boolean[][]
  index: number
  detailIndex: number
}

const PopOver = ({ minecraft_id, isOpenPopOver, index, detailIndex }: PopOverProps) => {
  return (
    <div className="text-[#ccc]" style={{ textShadow: '1px 1px 1px #222' }}>
      {minecraft_id.length === 1 ? (
        <Link href={`/architect/${minecraft_id}`}>
          <span className="ml-3 hover:cursor-pointer hover:text-[white]" onClick={(e) => e.stopPropagation()}>
            {minecraft_id}
          </span>
        </Link>
      ) : (
        <div
          className="grid w-[100%] grid-cols-3 gap-3 gap-x-6 rounded-lg bg-[rgba(0,0,0,0.5)] p-2 py-4 text-center text-sm lg:p-4 lg:text-base"
          style={{
            display: isOpenPopOver[index][detailIndex] ? 'grid' : 'none',
          }}
        >
          {minecraft_id.map((item) => (
            <Link key={item} href={`/architect/${item}`}>
              <span
                onClick={(e) => e.stopPropagation()}
                className="text-[#ccc] hover:cursor-pointer hover:text-[white]"
                style={{ textShadow: '1px 1px 1px #222' }}
              >
                {item}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

type PopOverButtonProps = {
  isOpenPopOver: boolean[][]
  setIsOpenPopOver: Dispatch<SetStateAction<boolean[][]>>
  detailIndex: number
  index: number
}

const PopOverButton = ({ detailIndex, index, setIsOpenPopOver, isOpenPopOver }: PopOverButtonProps) => {
  return (
    <span
      className="ml-2 rounded-md bg-[rgba(64,64,64,0.4)] duration-300 hover:cursor-pointer lg:ml-3 [&>svg]:h-6 [&>svg]:w-6 [&>svg]:fill-[white] hover:[&>svg]:fill-[#ddd] xl:[&>svg]:h-7 xl:[&>svg]:w-7"
      onClick={(e) => {
        e.stopPropagation()
        setIsOpenPopOver(
          produce((draft) => {
            draft[index][detailIndex] = !draft[index][detailIndex]
          }),
        )
      }}
      style={{
        transform: `rotate(${isOpenPopOver[index][detailIndex] ? '180deg' : '0deg'})`,
      }}
    >
      <Icon type="arrow_down" />
    </span>
  )
}

type CarouselSliderProps = {
  page: number[]
  index: number
  setPage: Dispatch<SetStateAction<number[]>>
  length: number
}

const CarouselSlider = ({ page, index, setPage, length }: CarouselSliderProps) => {
  return (
    <div className=" mx-auto mt-16 hidden h-20 max-w-[1200px] justify-center md:flex">
      <div className="relative flex h-[56px] items-center justify-center gap-4 rounded-[48px] bg-background-secondary px-10">
        <span
          className="absolute -left-20 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-background-secondary hover:cursor-pointer hover:bg-background-tertiary [&>div>svg]:fill-text-secondary"
          style={{ display: page[index] === 0 ? 'none' : '' }}
          onClick={() => {
            setPage(
              produce((draft) => {
                draft[index]--
              }),
            )
          }}
        >
          <Icon type="arrow_back" />
        </span>
        {new Array(length).fill(0).map((_, i) => (
          <span
            key={'hi' + i}
            className={`h-3 ${
              page[index] === i ? 'w-12' : 'w-3'
            } rounded-full bg-text-tertiary duration-500 hover:cursor-pointer`}
            onClick={() => {
              setPage(
                produce((draft) => {
                  draft[index] = i
                }),
              )
            }}
          />
        ))}
        <span
          className="absolute -right-20 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-background-secondary hover:cursor-pointer hover:bg-background-tertiary [&>div>svg]:rotate-180 [&>div>svg]:fill-text-secondary"
          style={{ display: page[index] === length - 1 ? 'none' : '' }}
          onClick={() => {
            setPage(
              produce((draft) => {
                draft[index]++
              }),
            )
          }}
        >
          <Icon type="arrow_back" />
        </span>
      </div>
    </div>
  )
}
