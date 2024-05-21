'use client'

import ArchitectInfo from '@/components/molecules/ArchitectInfo'
import ArchitectPortfolioCategory from '@/components/organisms/Architect/ArchitectPortfolioCategory'
import ArchitectPortfolioList from '@/components/organisms/Architect/ArchitectPortfolioList'

import { Architect } from '@/types/architect'
import { useQueryString } from '@/hooks/useQueryString'

type Props = {
  architect: Architect
}

export default function ArchitectDetail({ architect }: Props) {
  const { queryString, resetQueryString, setQueryString } = useQueryString('category')

  const handleCategoryClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.name === '') {
      return resetQueryString()
    }

    setQueryString(e.currentTarget.name)
  }

  return (
    <main className="flex min-h-screen flex-col gap-8">
      <title>{'왁크래프트 | ' + architect.wakzoo_id}</title>
      <ArchitectInfo type="detail" architect={architect} />
      <ArchitectPortfolioCategory category={queryString || ''} handleCategoryClick={handleCategoryClick} />
      <ArchitectPortfolioList portfolio={architect.portfolio} category={queryString || ''} />
    </main>
  )
}
