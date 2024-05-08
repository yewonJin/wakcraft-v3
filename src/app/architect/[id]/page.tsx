import ArchitectDetail from '@/components/templates/ArchitectDetail'

import { getArchitect } from '@/apis/server/architect'

export default async function Page({ params }: { params: { id: string } }) {
  const architect = await getArchitect(params.id)

  return <ArchitectDetail architect={JSON.parse(JSON.stringify(architect))} />
}
