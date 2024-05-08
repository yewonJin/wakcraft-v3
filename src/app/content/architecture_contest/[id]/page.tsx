import { getArchitectureContest } from '@/apis/server/content'
import ArchitectureContestDetail from '@/components/templates/ArchitectureContestDetail'

export default async function Page({ params }: { params: { id: string } }) {
  const architectureContest = await getArchitectureContest(parseInt(params.id))

  return <ArchitectureContestDetail architectureContest={JSON.parse(JSON.stringify(architectureContest))} />
}
