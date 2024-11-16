import Link from 'next/link'

import PageTitle from '@/components/organisms/Common/PageTitle'
import Button from '@/components/atoms/Button'
import Typography from '@/components/atoms/Typography'

import {
  revalidateArchitectPage,
  revalidateContentPage,
  revalidateHomePage,
  revalidateNoobProHackerPage,
} from '@/apis/server/revalidate'

export default function Page() {
  return (
    <div>
      <PageTitle title="어드민 페이지" summary="" />
      <div className="flex flex-col gap-4 mt-8">
        <Typography variants="h2" color="secondary">
          건축가 관련
        </Typography>
        <div className="flex flex-wrap gap-6 text-lg text-text-secondary">
          <Link href={'/admin/architect'}>
            <Button text="건축가" />
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-16">
        <Typography variants="h2" color="secondary">
          컨텐츠 추가
        </Typography>
        <div className="flex flex-wrap gap-6 text-lg text-text-secondary">
          <Link href={'/admin/noobprohacker/add'}>
            <Button text="눕프로해커" />
          </Link>
          <Link href={'/admin/architecture_noobprohacker/add'}>
            <Button text="건축 눕프로해커" />
          </Link>
          <Link href={'/admin/event_noobprohacker/add-line'}>
            <Button text="이벤트 눕프로해커(라인)" />
          </Link>
          <Link href={'/admin/event_noobprohacker/add-grid'}>
            <Button text="이벤트 눕프로해커(그리드)" />
          </Link>
          <Link href={'/admin/architecture_contest/add'}>
            <Button text="건축 콘테스트" />
          </Link>
          <Link href={'/admin/placement_test'}>
            <Button text="배치고사" />
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-16">
        <Typography variants="h2" color="secondary">
          컨텐츠 수정
        </Typography>
        <div className="flex flex-wrap gap-6 text-lg text-text-secondary">
          <Link href={'/admin/noobprohacker/edit'}>
            <Button text="눕프로해커" />
          </Link>
          <Link href={'/admin/architecture_noobprohacker/edit'}>
            <Button text="건축 눕프로해커" />
          </Link>
          <Link href={'/admin/event_noobprohacker/edit'}>
            <Button text="이벤트 눕프로해커" />
          </Link>
          <Link href={'/admin/architecture_contest/edit'}>
            <Button text="건축 콘테스트" />
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-16">
        <Typography variants="h2" color="secondary">
          그 외
        </Typography>
        <div className="flex flex-wrap gap-6 text-lg text-text-secondary">
          <Link href={'/admin/schedule'}>
            <Button text="캘린더" />
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-16">
        <Typography variants="h2" color="secondary">
          페이지 재검증
        </Typography>
        <div className="flex flex-wrap gap-6 text-lg text-text-secondary">
          <form action={revalidateHomePage}>
            <Button text="홈" />
          </form>
          <form action={revalidateArchitectPage}>
            <Button text="건축가" />
          </form>
          <form action={revalidateNoobProHackerPage}>
            <Button text="눕프핵" />
          </form>
          <form action={revalidateContentPage}>
            <Button text="컨텐츠" />
          </form>
        </div>
      </div>
    </div>
  )
}
