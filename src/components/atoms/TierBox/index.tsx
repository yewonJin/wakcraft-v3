import { All_TIER_LIST } from '@/constants/architect'
import { DetailedTier } from '@/types/architect'

type Props = {
  tier: DetailedTier
}

export default function TierBox({ tier }: Props) {
  return (
    <div
      className="flex items-center justify-center bg-cover h-[95px] w-[85px] text-lg relative bg-no-repeat text-center text-[white] hover:cursor-pointer"
      style={{
        textShadow: '1px 1px 1px black',
        backgroundImage: getTierImage(tier),
      }}
    >
      {tier}
    </div>
  )
}

const getTierImage = (tier: DetailedTier) => {
  if (All_TIER_LIST[0] === tier) return "url('/assets/images/tier/makage.webp')"
  if (All_TIER_LIST[1] === tier) return "url('/assets/images/tier/omakase.webp')"
  if (All_TIER_LIST[2] === tier) return "url('/assets/images/tier/hacker.webp')"
  if (All_TIER_LIST[3] === tier) return "url('/assets/images/tier/haejangguk.webp')"
  if (All_TIER_LIST[4] === tier) return "url('/assets/images/tier/gukbap.webp')"
  if (All_TIER_LIST[5] === tier) return "url('/assets/images/tier/miguk.webp')"
  if (All_TIER_LIST[6] === tier) return "url('/assets/images/tier/pro.webp')"
  if (All_TIER_LIST[7] === tier) return "url('/assets/images/tier/gyechu.webp')"
  if (All_TIER_LIST[8] === tier) return "url('/assets/images/tier/gyeruik.webp')"
  if (All_TIER_LIST[9] === tier) return "url('/assets/images/tier/noob.webp')"
  return "url('/assets/images/tier/purenoob.webp')"
}
