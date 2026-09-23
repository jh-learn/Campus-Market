
import { Link } from 'react-router-dom'
import { useCurrentUser } from '@/features/auth/useCurrentUser'
import { useListings } from '@/features/listings/hooks/useListings'
import ListingGrid from '@/features/listings/components/ListingGrid/ListingGrid'
import Loading from '@/components/Loading/Loading'
import EmptyState from '@/components/EmptyState/EmptyState'
import styles from './MyListingsPage.module.css'

export default function MyListingsPage() {
  const { user, loading: userLoading } = useCurrentUser()
  const result = useListings({ sellerId: user?.id })
  if (userLoading || result.loading) return <Loading />
  if (!user) return <EmptyState title="暂时无法获取当前用户" />
  if (result.error) return <EmptyState title="加载失败" description={result.error} />
  return <section className={styles.page}><div className={styles.heading}><h1>我的发布</h1><Link className={styles.create} to="/create">发布商品</Link></div><ListingGrid listings={result.data ?? []} emptyTitle="你还没有发布商品" /></section>
}