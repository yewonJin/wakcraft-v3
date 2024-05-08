import { create } from 'zustand'

import { Difficulty, NumberOfArchitecture } from '@/types/whoseWork'

type WhoseWork = {
  difficulty: Difficulty
  numberOfArchitecture: NumberOfArchitecture
  correctCount: number
  index: number
  incIndex: () => void
  incCorrectCount: () => void
  setDifficulty: (difficulty: Difficulty) => void
  setNumberOfArchitecture: (numberOfArchitecture: NumberOfArchitecture) => void
  setCorrectCount: (correctCount: number) => void
  setIndex: (index: number) => void
}

export const useWhoseWorkStore = create<WhoseWork>((set) => ({
  difficulty: null,
  numberOfArchitecture: null,
  correctCount: 0,
  index: 0,
  incIndex: () => set((state) => ({ index: state.index + 1 })),
  incCorrectCount: () => set((state) => ({ correctCount: state.correctCount + 1 })),
  setDifficulty: (difficulty) => set({ difficulty }),
  setNumberOfArchitecture: (numberOfArchitecture) => set({ numberOfArchitecture }),
  setCorrectCount: (correctCount) => set({ correctCount }),
  setIndex: (index) => set({ index }),
}))
