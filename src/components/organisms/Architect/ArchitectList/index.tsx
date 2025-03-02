import Link from 'next/link'

import ArchitectInfo from '@/components/molecules/ArchitectInfo'
import { SearchedArchitect } from '@/types/architect'

type Props = {
  architects: SearchedArchitect[]
  input: string
}

export default function ArchitectList({ architects, input }: Props) {
  return (
    <div className="flex flex-col gap-4 select-none mt-4">
      {architects
        .filter((architect) => architect.minecraft_id !== 'admin')
        .map((architect, index) => (
          <Link key={architect.minecraft_id} href={`/architect/${architect.minecraft_id}`}>
            <ArchitectInfo type="home" architect={architect} input={input} order={index} />
          </Link>
        ))}
    </div>
  )
}
