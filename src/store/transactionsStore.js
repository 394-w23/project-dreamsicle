import { create } from 'zustand'

export const useTransactionStore = create((set) => ({
 latestTransaction: 0,
setLatestTransaction: (val) => set(() => ({ latestTransaction: val}))
}))