import GuessTimeDetail from '@/components/templates/GuessTimeDetail'

import { getGuessTime } from '@/apis/server/content'

export default async function Page({ params }: { params: { id: string } }) {
  const guessTime = await getGuessTime(parseInt(params.id))

  return <GuessTimeDetail guessTime={JSON.parse(JSON.stringify(guessTime))} />
}
