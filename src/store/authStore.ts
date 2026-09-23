import { create } from 'zustand'
import type { User } from '@/types'
import { login as loginRequest, logout as logoutRequest, type LoginDTO } from '@/api/auth'
import { fetchCurrentUser } from '@/api/users'

interface AuthState {
    user: User | null,
    loading: boolean,
    loadUser: () => Promise<void>,
    login: (dto: LoginDTO) => Promise<void>,
    logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    loading: false,
    loadUser: async () => {
        set({ loading: true })
        try {
            const user = await fetchCurrentUser()
            set({ user })
        } catch {
            set({ user: null })
        } finally {
            set({ loading: false })
        }
    },
    login: async (dto) => {
        set({ loading: true })
        try {
            const user = await loginRequest(dto)
            set({ user })
        } finally {
            set({ loading: false })
        }
    },
    logout: async () => {
        set({ loading: true })
        try {
            await logoutRequest()
        } finally {
            set({ user: null, loading: false })
        }
    },
}))