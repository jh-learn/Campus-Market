import { apiClient } from './client'
import type { User } from '@/types'

export async function fetchCurrentUser() {
    const { data } = await apiClient.get<User>('/me')
    return data
}