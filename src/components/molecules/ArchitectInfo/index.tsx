import { Fragment, useEffect, useRef, useState } from 'react'

import TierBox from '@/components/atoms/TierBox'
import Typography from '@/components/atoms/Typography'
import { Architect, SearchedArchitect } from '@/types/architect'

type Home = {
  type: 'home'
  architect: SearchedArchitect
  input: string
  deferredInput: string
  order: number
}

type Detail = {
  type: 'detail'
  architect: Architect
}

type Props = Home | Detail

const shouldShowImmediately = (props: Props) => {
  if (props.type === 'detail') {
    return true
  }

  if (props.type === 'home' && props.order <= 10) {
    return true
  }

  return false
}

export default function ArchitectInfo(props: Props) {
  const { architect, type } = props

  const [isIntersecting, setIsIntersecting] = useState(shouldShowImmediately(props))
  const observerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = observerRef.current
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsIntersecting(true)
        }
      },
      { threshold: 0.01 },
    )

    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  return (
    <div
      ref={observerRef}
      className={`flex justify-between rounded-lg items-center ${
        type === 'home' && 'bg-background-secondary hover:bg-background-tertiary hover:cursor-pointer px-4 py-4'
      }`}
    >
      {isIntersecting ? (
        <Fragment>
          <div
            className={`flex items-center ${type === 'home' ? 'gap-5 sm:gap-8' : 'gap-6'} md:[&>span:first-child]:flex`}
          >
            <TierBox tier={architect.curTier} />
            {type === 'home' ? (
              <Highlighting architect={props.architect} input={props.input} />
            ) : (
              <div className="flex flex-col gap-3 md:gap-1">
                <Typography variants="p" color="primary" style={{ fontSize: '20px' }}>
                  {architect.minecraft_id}
                </Typography>
                <Typography variants="p" color="secondary">
                  {architect.wakzoo_id}
                </Typography>
              </div>
            )}
          </div>
          {type === 'home' && <Statistics noobprohackerInfo={architect.statistics} />}
          {type === 'detail' && <Statistics noobprohackerInfo={architect.statistics} />}
        </Fragment>
      ) : (
        <div className="h-[95px]"></div>
      )}
    </div>
  )
}

type HighlightingProps = {
  architect: SearchedArchitect
  input: string
}

const Highlighting = ({ architect, input }: HighlightingProps) => {
  return (
    <div className="flex flex-col gap-3 md:gap-1">
      <p className="text-text-primary md:text-xl">
        {!input || architect.minecraftIdIndexArr.includes(-1)
          ? architect.minecraft_id
          : architect.minecraft_id.split('').map((char: string, index: number) => {
              if (architect.minecraftIdIndexArr.includes(index)) {
                return (
                  <span key={char + index} className="text-[#d97706]">
                    {char}
                  </span>
                )
              }

              return <span key={char + index}>{char}</span>
            })}
      </p>
      <p className="text-sm text-text-secondary md:text-base">
        {!input || architect.wakzooIdIndexArr.includes(-1)
          ? architect.wakzoo_id
          : architect.wakzoo_id.split('').map((char: string, index: number) => {
              if (architect.wakzooIdIndexArr.includes(index)) {
                return (
                  <span key={char + index} className="text-[#d97706]">
                    {char}
                  </span>
                )
              }

              return <span key={char + index}>{char}</span>
            })}
      </p>
    </div>
  )
}

type StatisticsProps = {
  noobprohackerInfo: Architect['statistics']
}

const Statistics = ({ noobprohackerInfo }: StatisticsProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2 md:mr-8 md:flex md:flex-nowrap md:items-center md:gap-10 md:text-base [&>div:nth-child(3)]:hidden sm:[&>div:nth-child(3)]:flex [&>div:nth-child(4)]:hidden sm:[&>div:nth-child(4)]:flex">
      <div className="flex items-center justify-between gap-2 text-text-tertiary md:flex-col">
        <p className="hidden sm:block">참여 횟수</p>
        <p className="sm:hidden">참여</p>
        <p className="text-base text-text-primary md:text-lg">{noobprohackerInfo.participation}</p>
      </div>
      <div className="flex items-center justify-between gap-2 text-text-tertiary md:flex-col">
        <p className="hidden sm:block">우승 횟수</p>
        <p className="sm:hidden">우승</p>
        <p className="text-base text-text-primary md:text-lg">{noobprohackerInfo.win}</p>
      </div>
      <div className="flex items-center gap-2 text-text-tertiary md:flex-col">
        <p>해커 우승</p>
        <p className="text-base text-text-primary md:text-lg">{noobprohackerInfo.hackerWin}</p>
      </div>
      <div className="flex items-center gap-2 text-text-tertiary md:flex-col">
        <p>프로 우승</p>
        <p className="text-base text-text-primary md:text-lg">{noobprohackerInfo.proWin}</p>
      </div>
    </div>
  )
}
