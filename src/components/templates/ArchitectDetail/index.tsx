'use client'

import { useState } from 'react'

import ArchitectInfo from '@/components/molecules/ArchitectInfo'
import ArchitectPortfolioCategory from '@/components/organisms/Architect/ArchitectPortfolioCategory'
import ArchitectPortfolioList from '@/components/organisms/Architect/ArchitectPortfolioList'

import { Architect } from '@/types/architect'

type Props = {
  architect: Architect
}

type Category = '' | 'noobprohacker' | 'placementTest' | 'eventNoobProHacker'

export default function ArchitectDetail({ architect }: Props) {
  const [category, setCategory] = useState<Category>('')

  const handleCategoryClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCategory(e.currentTarget.name as Category)
  }

  return (
    <main className="flex min-h-screen flex-col gap-8">
      <title>{'왁크래프트 | ' + architect.wakzoo_id}</title>
      <ArchitectInfo type="detail" architect={architect} />
      <ArchitectPortfolioCategory category={category} handleCategoryClick={handleCategoryClick} />
      <ArchitectPortfolioList portfolio={architect.portfolio} category={category} />
    </main>
  )
}
