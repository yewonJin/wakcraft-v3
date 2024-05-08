'use client'

import Image from 'next/image'
import Link from 'next/link'

import { renameTo1080Webp, renameToWebp } from '@/utils/shared'

type Props = {
  imageUrl: string
  minecraft_id?: string
  children?: React.ReactNode
}

export default function ImageBox({ imageUrl, minecraft_id, children }: Props) {
  return (
    <div
      className="group/image relative aspect-video overflow-hidden rounded-xl hover:cursor-pointer"
      onClick={() => window.open(renameTo1080Webp(imageUrl))}
    >
      <Image src={renameToWebp(imageUrl)} fill alt="건축가 포트폴리오" />
      {children}
      {minecraft_id && (
        <p
          onClick={(e) => e.stopPropagation()}
          className="peer absolute bottom-4 left-0 bg-[rgba(0,0,0,0.6)] py-1 pl-3 pr-2 text-base text-[white] hover:bg-[rgba(0,0,0,0.8)]"
        >
          <Link href={`/architect/${minecraft_id}`}>{minecraft_id}</Link>
        </p>
      )}
      <div className="invisible absolute bottom-2 right-2 bg-[#121212] px-[10px] py-1 text-sm text-[white] group-hover/image:visible peer-hover:invisible">
        클릭하여 원본 이미지 보기
      </div>
    </div>
  )
}
