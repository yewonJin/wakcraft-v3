import MatchYourTierDetail from '@/components/templates/MatchYourTierDetail'

import { getMatchYourTier } from '@/apis/server/content'

export default async function Page({ params }: { params: { id: string } }) {
  const matchYourTier = await getMatchYourTier(parseInt(params.id))

  return <MatchYourTierDetail matchYourTier={JSON.parse(JSON.stringify(matchYourTier))} />
}
