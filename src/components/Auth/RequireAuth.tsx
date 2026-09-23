import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useCurrentUser } from '@/features/auth/useCurrentUser'

export default function RequireAuth() {
  const { user, loading } = useCurrentUser()
  const location = useLocation()

  if (loading) return <p>正在验证登录状态...</p>
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />
  return <Outlet />
}