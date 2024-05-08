import { getArchitectureNoobProHacker } from '@/apis/server/architectureNoobProHacker'
import ArchitectureNoobProHackerDetail from '@/components/templates/ArchitectureNoobProHackerDetail'

export default async function Page({ params }: { params: { id: string } }) {
  const architectureNoobProHacker = await getArchitectureNoobProHacker(parseInt(params.id))

  return (
    <ArchitectureNoobProHackerDetail
      architectureNoobProHacker={JSON.parse(JSON.stringify(architectureNoobProHacker))}
    />
  )
}
