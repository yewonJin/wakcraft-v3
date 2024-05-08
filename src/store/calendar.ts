import { create } from 'zustand'

import { KR_CUR_DATE } from '@/constants/calendar'

type Calendar = {
  curMonth: number
  curYear: number
  setCurMonth: (month: number) => void
  setCurYear: (year: number) => void
  incCurMonth: () => void
  decCurMonth: () => void
  incCurYear: () => void
  decCurYear: () => void
}

export const useCalendarStore = create<Calendar>((set) => ({
  curMonth: KR_CUR_DATE.getMonth() + 1,
  curYear: KR_CUR_DATE.getFullYear(),
  setCurMonth: (month) => set({ curMonth: month }),
  setCurYear: (year) => set({ curYear: year }),
  incCurMonth: () => set((state) => ({ curMonth: state.curMonth + 1 })),
  decCurMonth: () => set((state) => ({ curMonth: state.curMonth - 1 })),
  incCurYear: () => set((state) => ({ curYear: state.curYear + 1 })),
  decCurYear: () => set((state) => ({ curYear: state.curYear - 1 })),
}))
