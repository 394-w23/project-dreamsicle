import { create } from 'zustand'

export const useReturnsStore = create((set) => ({
 showReturnConfirmation: false,
setShowReturnConfirmation: (val) => set(() => ({ showReturnConfirmation: val}))
}))