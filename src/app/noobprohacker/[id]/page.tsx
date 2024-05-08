import NoobProHackerDetail from '@/components/templates/NoobProHackerDetail'

import { getNoobProHacker } from '@/apis/server/noobprohacker'

export default async function Page({ params }: { params: { id: string } }) {
  const noobprohacker = await getNoobProHacker(parseInt(params.id))

  return <NoobProHackerDetail noobprohacker={JSON.parse(JSON.stringify(noobprohacker))} />
}
