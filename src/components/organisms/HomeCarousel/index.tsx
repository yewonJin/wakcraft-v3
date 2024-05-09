'use client'

import Image from 'next/image'
import Link from 'next/link'

import Typography from '@/components/atoms/Typography'

import { NoobProHacker } from '@/types/content'
import { renameTo1080Webp, renameToWebp } from '@/utils/shared'
import { getHackerWinnerLine } from '@/utils/noobprohacker'
import { useHomeCarousel } from '@/hooks/useHomeCarousel'

type Props = {
  noobprohacker: NoobProHacker
}

export default function HomeCarousel({ noobprohacker }: Props) {
  const { curLine, initInterval, startInterval, handleCategoryClick } = useHomeCarousel(noobprohacker)

  return (
    <div className="z-10 mx-auto flex h-auto w-full max-w-[1200px] flex-col justify-center pt-24 md:h-[100vh] md:pt-0 xl:px-0 gap-6 md:gap-10 box-border">
      <div
        className="absolute left-0 top-0 z-[-1] hidden h-full w-full items-center justify-center bg-cover bg-center bg-no-repeat md:flex md:bg-background-secondary"
        style={{
          backgroundImage: `url("${renameTo1080Webp(getHackerWinnerLine(noobprohacker).line_details[2].image_url)}")`,
          backgroundBlendMode: 'darken',
          backgroundColor: 'rgba(0,0,0, 0.6)',
        }}
      ></div>
      <div className="flex flex-col gap-4 [&>h1]:text-4xl [&>h1]:text-text-primary md:[&>h1]:text-[white] md:[&>h1]:text-5xl">
        <Typography variants="h2" fontSize="28px" lineHeight="40px" color="tertiary">
          제 {noobprohacker.contentInfo.episode}회
        </Typography>
        <Typography variants="h1" color="primary">{`눕프로해커 : ${noobprohacker.contentInfo.subject}편`}</Typography>
      </div>
      <div className={'overflow-y-hidden overflow-x-scrolls md:overflow-auto ' + 'category-scrollbar'}>
        <ul className="flex w-max flex-wrap gap-4 md:gap-6">
          {noobprohacker.lineInfo.map((line, index) => (
            <CategoryItem
              key={line.subject}
              handleCategoryClick={handleCategoryClick}
              curLine={curLine}
              index={index}
              lineName={line.subject}
            />
          ))}
        </ul>
      </div>
      <div className="overflow-hidden">
        <div
          className="flex gap-8 duration-500"
          style={{
            transform: `translateX(calc(${-curLine} * (100% + 32px)))`,
          }}
        >
          {noobprohacker.lineInfo.map((line) => (
            <div key={line.subject} className="flex w-full flex-col justify-center gap-6 md:flex-row md:gap-8">
              {line.line_details.map((lineDetail) => (
                <ArchitectureItem
                  key={lineDetail.minecraft_id}
                  initInterval={initInterval}
                  startInterval={startInterval}
                  image_url={lineDetail.image_url}
                  minecraft_id={lineDetail.minecraft_id}
                  line={lineDetail.line}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

type CategoryItemProps = {
  handleCategoryClick: (index: number) => void
  curLine: number
  index: number
  lineName: string
}

function CategoryItem({ handleCategoryClick, curLine, index, lineName }: CategoryItemProps) {
  return (
    <li
      className={`md:hover:text-[#bbb] w-max rounded-md bg-background-secondary p-2 px-3 text-base hover:cursor-pointer md:text-lg ${
        curLine === index
          ? 'bg-text-secondary text-background-primary md:text-[white] md:bg-[rgba(0,0,0,0.7)]'
          : 'text-text-secondary md:text-[#999] md:bg-[rgba(0,0,0,0.3)]'
      }`}
      onClick={() => handleCategoryClick(index)}
    >
      {lineName}
    </li>
  )
}

type ArchitectureItemProps = {
  initInterval: () => void
  startInterval: () => void
  image_url: string
  minecraft_id: string
  line: string
}

function ArchitectureItem({ image_url, initInterval, startInterval, minecraft_id, line }: ArchitectureItemProps) {
  return (
    <div
      onMouseOver={() => {
        initInterval()
      }}
      onMouseOut={() => {
        startInterval()
      }}
      onClick={() => window.open(renameTo1080Webp(image_url))}
      className="group relative h-[60vw] max-h-[480px] w-[calc(100vw-32px)] overflow-hidden hover:cursor-pointer md:h-[45vh] md:w-[30vw] [&>img]:duration-[500ms] [&>img]:hover:scale-105"
    >
      <Image
        alt="작품 이미지"
        priority
        sizes="800px"
        style={{ objectFit: 'cover' }}
        fill
        src={renameToWebp(image_url)}
      />
      <div
        onClick={(e) => e.stopPropagation()}
        className="invisible absolute bottom-2 z-10 flex w-full justify-center text-lg text-[white] hover:cursor-default group-hover:visible"
      >
        <div className="flex w-fit gap-4 rounded-2xl bg-[#121212] px-6 py-2 group-hover:animate-fadeIn">
          <Link href={`/architect/${minecraft_id}`}>
            <p className="text-[#aaa] hover:cursor-pointer hover:text-[white]">{minecraft_id}</p>
          </Link>
          <p>{line}</p>
        </div>
      </div>
    </div>
  )
}
