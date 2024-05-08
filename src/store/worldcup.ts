import { create } from 'zustand'

import { Worldcup } from '@/types/worldcup'

type WorldCup = {
  winner: Worldcup | null
  setWinner: (winner: Worldcup) => void
}

export const useWorldCupStore = create<WorldCup>((set) => ({
  winner: null,
  setWinner: (winner) => set({ winner: winner }),
}))
