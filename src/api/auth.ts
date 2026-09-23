import { apiClient } from './client'
import type { User } from '@/types'

export interface LoginDTO {
  username: string
  password: string
}

interface LoginResponse {
  token: string
  user: User
}

export async function login(dto: LoginDTO) {
  const { data } = await apiClient.post<LoginResponse>('/login', dto)
  localStorage.setItem('token', data.token)
  return data.user
}

export async function logout() {
  try {
    await apiClient.post('/logout')
  } finally {
    localStorage.removeItem('token')
  }
}