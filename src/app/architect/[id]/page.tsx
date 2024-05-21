import ArchitectDetail from '@/components/templates/ArchitectDetail'
import ArchitectNotFound from '@/components/organisms/Architect/ArchitectNotFound'

import { getArchitect } from '@/apis/server/architect'

export default async function Page({ params }: { params: { id: string } }) {
  const architect = await getArchitect(params.id)

  if (!architect) return <ArchitectNotFound />

  return <ArchitectDetail architect={JSON.parse(JSON.stringify(architect))} />
}
