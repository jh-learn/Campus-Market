import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import styles from './AppLayout.module.css'

export default function AppLayout() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <Link to="/" className={styles.logo}>校园二手市场</Link>
        <nav className={styles.nav}>
          <NavLink to="/" end className={({ isActive }) => isActive ? styles.active : undefined}>首页</NavLink>
          <NavLink to="/create" className={({ isActive }) => isActive ? styles.active : undefined}>发布商品</NavLink>
          <NavLink to="/my-listings" className={({ isActive }) => isActive ? styles.active : undefined}>我的发布</NavLink>
        </nav>
        <div className={styles.user}>
          {user && (
            <>
              <img src={user.avatar} alt={user.name} />
              <span>{user.name}</span>
              <button type="button" onClick={handleLogout}>退出登录</button>
            </>
          )}
          {!user && <Link to="/login">登录</Link>}
        </div>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}