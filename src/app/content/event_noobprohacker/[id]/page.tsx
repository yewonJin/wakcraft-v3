import EventNoobProHackerDetail from '@/components/templates/EventNoobProHackerDetail'
import { getEventNoobProHacker } from '@/apis/server/content'

export default async function Page({ params }: { params: { id: string } }) {
  const eventNoobProHacker = await getEventNoobProHacker(parseInt(params.id))

  return <EventNoobProHackerDetail eventNoobProHacker={JSON.parse(JSON.stringify(eventNoobProHacker))} />
}
