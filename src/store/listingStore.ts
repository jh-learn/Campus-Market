import { create } from 'zustand'
import type { Category } from '@/types'


interface ListingFilterState{
    category: Category | 'all'
    keyword: string
    setCategory: (c: Category | 'all') => void
    setKeyword: (k: string) => void
    reset: () => void
}

export const useListingFilter = create<ListingFilterState>((set) => ({
    category: 'all',
    keyword: '',
    setCategory: (category) => set({ category }),
    setKeyword: (keyword) => set({ keyword }),
    reset:()=>set({category:'all',keyword:''})
}))