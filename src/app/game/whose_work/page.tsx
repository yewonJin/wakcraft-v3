import { Fragment } from 'react'

import GameWhoseWork from '@/components/templates/GameWhoseWork'

import { getAllArchitects } from '@/apis/server/architect'

export default async function Page() {
  const architects = await getAllArchitects()

  return (
    <Fragment>
      <title>왁크래프트 | 월드컵</title>
      <GameWhoseWork architects={JSON.parse(JSON.stringify(architects))} />
    </Fragment>
  )
}
