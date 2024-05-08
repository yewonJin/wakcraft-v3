import ArchitectHome from '@/components/templates/ArchitectHome'

import { getAllArchitects } from '@/apis/server/architect'

export default async function Page() {
  const architects = await getAllArchitects()

  return <ArchitectHome architects={JSON.parse(JSON.stringify(architects))} />
}
