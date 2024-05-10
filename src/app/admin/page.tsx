import Link from 'next/link'

import PageTitle from '@/components/organisms/Common/PageTitle'
import Button from '@/components/atoms/Button'

export default function Page() {
  return (
    <div>
      <PageTitle title="어드민 페이지" summary="" />
      <div className="mt-4 flex flex-wrap gap-6 text-lg text-text-secondary">
        <Link href={'/admin/architect'}>
          <Button text="건축가" />
        </Link>
        <Link href={'/admin/noobprohacker'}>
          <Button text="눕프로해커" />
        </Link>
        <Link href={'/admin/architecture_noobprohacker'}>
          <Button text="건축 눕프로해커" />
        </Link>
        <Link href={'/admin/event_noobprohacker'}>
          <Button text="이벤트 눕프로해커" />
        </Link>
        <Link href={'/admin/architecture_contest'}>
          <Button text="건축 콘테스트" />
        </Link>
      </div>
    </div>
  )
}
