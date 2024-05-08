import { create } from 'zustand'

export type SortBy = 'tier' | 'participation' | 'win' | 'hackerWin' | 'proWin'

type ArchitectState = {
  sortBy: SortBy
  setSortBy: (sortBy: SortBy) => void
}

export const useArchitectStore = create<ArchitectState>((set) => ({
  sortBy: 'tier',
  setSortBy: (sortBy) => set({ sortBy: sortBy }),
}))
