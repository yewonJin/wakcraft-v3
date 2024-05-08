import PageTitle from '@/components/organisms/Common/PageTitle'

type Props = {
  cardList: JSX.Element[]
}

export default function ContentHome({ cardList }: Props) {
  return (
    <main className="max-w-[1200px] mx-auto flex flex-col gap-8 px-4 xl:px-0">
      <PageTitle title="컨텐츠" summary="눕프로해커 이외의 마인크래프트 컨텐츠를 볼 수 있다." />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">{cardList}</div>
    </main>
  )
}
