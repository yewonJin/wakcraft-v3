import { All_TIER_LIST } from '@/constants/architect'
import { DetailedTier } from '@/types/architect'

type Props = {
  tier: DetailedTier
}

export default function TierBox({ tier }: Props) {
  return (
    <div
      className="flex items-center justify-center bg-cover h-[94px] w-[85px] text-lg relative bg-no-repeat text-center text-[white] hover:cursor-pointer"
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
  if (All_TIER_LIST.slice(0, 2).includes(tier)) return "url('/assets/images/tier/hacker2.webp')"
  else if (All_TIER_LIST.slice(2, 3).includes(tier)) return "url('/assets/images/tier/hacker.webp')"
  else if (All_TIER_LIST.slice(3, 5).includes(tier)) return "url('/assets/images/tier/gukbap2.webp')"
  else if (All_TIER_LIST.slice(5, 6).includes(tier)) return "url('/assets/images/tier/gukbap.webp')"
  else if (All_TIER_LIST.slice(6, 7).includes(tier)) return "url('/assets/images/tier/pro.webp')"
  else if (All_TIER_LIST.slice(7, 8).includes(tier)) return "url('/assets/images/tier/gyeruik2.webp')"
  else if (All_TIER_LIST.slice(8, 9).includes(tier)) return "url('/assets/images/tier/gyeruik.webp')"
  else return "url('/assets/images/tier/noob.webp')"
}
