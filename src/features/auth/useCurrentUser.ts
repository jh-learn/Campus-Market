import { useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'

export function useCurrentUser() {
	const { user, loading, loadUser } = useAuthStore()

	useEffect(() => {
		if (!user && !loading) void loadUser()
	}, [user, loading, loadUser])

	return { user, loading }
}
