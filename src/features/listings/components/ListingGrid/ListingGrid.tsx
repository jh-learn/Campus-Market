import type { Listing } from '@/types'
import ListingCard from '@/components/ListingCard/ListingCard'
import EmptyState from '@/components/EmptyState/EmptyState'
import styles from './ListingGrid.module.css'

export default function ListingGrid({ listings, emptyTitle = '暂无商品' }: { listings: Listing[]; emptyTitle?: string }) {
	if (listings.length === 0) return <EmptyState title={emptyTitle} />
	return <div className={styles.grid}>{listings.map((listing) => <ListingCard key={listing.id} listing={listing} />)}</div>
}
