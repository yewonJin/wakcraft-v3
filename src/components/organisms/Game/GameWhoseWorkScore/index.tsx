import { useCallback } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

import Button from '@/components/atoms/Button'

import { useWhoseWorkStore } from '@/store/whoseWork'
import { WhoseWork } from '@/types/whoseWork'

type Props = {
  whoseWork: WhoseWork
  restartGame: () => void
}

export default function GameWhoseWorkScore({ whoseWork, restartGame }: Props) {
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
