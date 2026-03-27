'use client'

import { create } from 'zustand'

interface WalletModalState {
    isOpen: boolean
    open: () => void
    close: () => void
    toggle: () => void
}

export const useWalletModal = create<WalletModalState>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
    toggle: () => set((s) => ({ isOpen: !s.isOpen })),
}))
