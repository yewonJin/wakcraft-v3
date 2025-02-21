import { Fragment, Suspense } from 'react'

import ArchitectHome from '@/components/templates/ArchitectHome'
import PageTitle from '@/components/organisms/Common/PageTitle'

import { getAllArchitects } from '@/apis/server/architect'

export default async function Page() {
  const architects = await getAllArchitects()

  return (
    <Fragment>
      <PageTitle title="건축가" summary="마인크래프트 눕프핵 건축가들의 포트폴리오를 볼 수 있다." />
      <Suspense>
        <ArchitectHome architects={JSON.parse(JSON.stringify(architects))} />
      </Suspense>
    </Fragment>
  )
}
