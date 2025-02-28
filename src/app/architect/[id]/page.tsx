import ArchitectDetail from '@/components/templates/ArchitectDetail'
import ArchitectNotFound from '@/components/organisms/Architect/ArchitectNotFound'

import { getAllArchitects, getArchitect } from '@/apis/server/architect'

export async function generateStaticParams() {
  const architects = await getAllArchitects()
  return architects.map((architect) => ({
    id: String(architect.minecraft_id),
  }))
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const architect = await getArchitect(id)

  if (!architect) return <ArchitectNotFound />

  return <ArchitectDetail architect={JSON.parse(JSON.stringify(architect))} />
}
