import Image from 'next/image'

import NaverCafe from '../../../../public/assets/icons/naver_cafe.png'
import Typography from '@/components/atoms/Typography'

type Props = {
  link: string
}

export default function ArchitectCafeLink({ link }: Props) {
  return (
    <a
      className="flex gap-3 items-center w-fit  hover:bg-background-tertiary pr-4 rounded-md  bg-background-secondary"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image src={NaverCafe} width={40} alt="네이버 카페 로고 이미지" />
      <Typography variants="p" color="secondary">
        배치고사 신청글
      </Typography>
    </a>
  )
}
