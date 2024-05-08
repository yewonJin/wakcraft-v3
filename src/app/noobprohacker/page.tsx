import NoobProHackerHome from '@/components/templates/NoobProHackerHome'

import { getAllArchitectureNoobProHackers } from '@/apis/server/architectureNoobProHacker'
import { getAllNoobProHackers } from '@/apis/server/noobprohacker'

export default async function Page() {
  const noobprohackers = await getAllNoobProHackers()
  const architectureNoobProHackers = await getAllArchitectureNoobProHackers()

  return (
    <NoobProHackerHome
      noobprohackers={JSON.parse(JSON.stringify(noobprohackers))}
      architectureNoobProHackers={JSON.parse(JSON.stringify(architectureNoobProHackers))}
    />
  )
}
