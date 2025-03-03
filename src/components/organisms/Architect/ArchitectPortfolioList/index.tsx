import { useCallback, useMemo } from 'react'

import ArchitectPortfolioItem from '@/components/molecules/ArchitectPortfolioItem'

import { Architect } from '@/types/architect'
import { getNumberOfArchitectsInContent } from '@/utils/architect'

type Props = {
  portfolio: Architect['portfolio']
  category: string
}

export default function ArchitectPortfolioList({ portfolio, category }: Props) {
  const sortByCategory = useCallback(
    (arr: any[]) => {
      return arr.filter((item) => {
        if (category === '') return item

        const type = item.type as keyof Architect['portfolio']

        if (category === 'noobprohacker') {
          return type === 'noobprohacker' || type === 'architectureNoobProHacker'
        }

        if (category === 'eventNoobProHacker') {
          return type === 'eventNoobProHacker' || type === 'architectureContest'
        }

        return category === item.type
      })
    },
    [category],
  )

  const portfolioSortedByYear = useMemo(
    () =>
      Object.entries(portfolio).reduce((acc: any, cur) => {
        cur[1].forEach((item) => {
          if (!acc[new Date(item.date).getFullYear()]) {
            acc[new Date(item.date).getFullYear()] = []
          }

          acc[new Date(item.date).getFullYear()].push({
            ...item,
            type: cur[0],
          })
        })

        return acc
      }, {}),
    [portfolio],
  )

  const generatePortfolioList = useMemo(
    () =>
      Object.keys(portfolioSortedByYear)
        .reverse()
        .map((year) => {
          if (sortByCategory(portfolioSortedByYear[parseInt(year)]).length === 0) return

          return (
            <div className="mb-14" key={year}>
              <div className="flex items-center gap-4">
                <h2 className={' min-w-max text-2xl text-text-primary'}>{year + '년'}</h2>
                <div className="h-[1px] w-full bg-text-tertiary"></div>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
                {sortByCategory(portfolioSortedByYear[parseInt(year)])
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map((item) => {
                    if (item.type === 'placementTest') {
                      const content = item as Architect['portfolio']['placementTest'][0]

                      return (
                        <ArchitectPortfolioItem
                          key={content.image_url}
                          contentName={`${content.season}회 배치고사`}
                          subject={content.placement_result}
                          ranking={content.ranking}
                          imageUrl={content.image_url}
                        />
                      )
                    }

                    if (item.type === 'noobprohacker') {
                      const content = item as Architect['portfolio']['noobprohacker'][0]

                      return (
                        <ArchitectPortfolioItem
                          key={content.image_url}
                          contentName={`제 ${content.episode}회 눕프로해커`}
                          tier={content.line}
                          subject={content.subject}
                          ranking={content.ranking}
                          imageUrl={content.image_url}
                          youtubeUrl={content.youtube_url === 'null' ? undefined : content.youtube_url}
                        />
                      )
                    }

                    if (item.type === 'architectureNoobProHacker') {
                      const content = item as Architect['portfolio']['architectureNoobProHacker'][0]

                      return (
                        <ArchitectPortfolioItem
                          key={content.image_url}
                          contentName={`제 ${content.episode}회 건축 눕프핵`}
                          tier={content.line}
                          subject={content.subject}
                          ranking={content.ranking}
                          imageUrl={content.image_url}
                          youtubeUrl={content.youtube_url === 'null' ? undefined : content.youtube_url}
                        />
                      )
                    }

                    if (item.type === 'architectureContest') {
                      const content = item as Architect['portfolio']['architectureContest'][0]

                      return (
                        <ArchitectPortfolioItem
                          key={content.image_url}
                          contentName={`${content.contentName}`}
                          tier={content.line}
                          subject={content.subject}
                          ranking={content.ranking}
                          imageUrl={content.image_url}
                          youtubeUrl={content.youtube_url === 'null' ? undefined : content.youtube_url}
                          constructionTime={content.constructionTime}
                        />
                      )
                    }

                    const content = item as Architect['portfolio']['eventNoobProHacker'][0]

                    return (
                      <ArchitectPortfolioItem
                        key={content.image_url}
                        contentName={`${content.contentName}`}
                        tier={content.line}
                        subject={content.subject}
                        ranking={content.ranking}
                        imageUrl={content.image_url}
                        architectNumber={getNumberOfArchitectsInContent(content)}
                        youtubeUrl={content.youtube_url === 'null' ? undefined : content.youtube_url}
                        constructionTime={content.constructionTime}
                      />
                    )
                  })}
              </div>
            </div>
          )
        }),
    [category],
  )

  return <div className="flex flex-col gap-8">{generatePortfolioList}</div>
}
