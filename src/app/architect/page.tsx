import ArchitectHome from '@/components/templates/ArchitectHome'

import { getAllArchitects } from '@/apis/server/architect'
import { Suspense } from 'react'

export default async function Page() {
  const architects = await getAllArchitects()

  return (
    <Suspense>
      <ArchitectHome architects={JSON.parse(JSON.stringify(architects))} />
    </Suspense>
  )
}
