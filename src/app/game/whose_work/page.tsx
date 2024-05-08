import { getAllArchitects } from '@/apis/server/architect'
import GameWhoseWork from '@/components/templates/GameWhoseWork'
import { Fragment } from 'react'

export default async function Page() {
  const architects = await getAllArchitects()

  return (
    <Fragment>
      <title>왁크래프트 | 월드컵</title>
      <GameWhoseWork architects={JSON.parse(JSON.stringify(architects))} />
    </Fragment>
  )
}
