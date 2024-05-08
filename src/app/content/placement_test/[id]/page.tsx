import { getPlacementTest } from '@/apis/server/content'
import PlacementTestDetail from '@/components/templates/PlacementTestDetail'

export default async function Page({ params }: { params: { id: string } }) {
  const placementTest = await getPlacementTest(parseInt(params.id))

  return <PlacementTestDetail placementTest={JSON.parse(JSON.stringify(placementTest))} />
}
