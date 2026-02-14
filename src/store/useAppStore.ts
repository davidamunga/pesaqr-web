import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { FormData } from '@/@types/Data'
import { TRANSACTION_TYPE } from '@/@types/TransactionType'
import { PESAQR_DB } from '@/utils/constants'

interface AppStore {
  data: FormData
  setData: (data: FormData) => void
  updateData: (updates: Partial<FormData>) => void
  resetData: () => void
}

const initialData: FormData = {
  bannerText: 'SCAN WITH M-PESA',
  color: 'oklch(62.7% 0.194 149.214)', // green-600 in OKLCH
  type: TRANSACTION_TYPE.TILL_NUMBER,
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      data: initialData,
      setData: (data) => set({ data }),
      updateData: (updates) =>
        set((state) => ({
          data: { ...state.data, ...updates },
        })),
      resetData: () => set({ data: initialData }),
    }),
    {
      name: PESAQR_DB,
      partialize: (state) => ({ data: state.data }),
    },
  ),
)
