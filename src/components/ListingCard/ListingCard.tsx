import { Link } from 'react-router-dom';
import type { Listing } from '@/types';
import { formatPrice, formatTime } from '@/utils/format';
import { categoryLabel, conditionLabel } from '@/utils/constants';
import styles from './ListingCard.module.css';

export default function ListingDetailPage({ listing }: { listing: Listing }) {
    return (
        <Link to={`/listings/${listing.id}`} className={styles.card}>
            <div className={styles.imageWrap}>
                <img src={listing.images[0]} alt={listing.title} />
                {listing.status === 'sold' && <span className={styles.sold }>已售出</span>}
            </div>
            <div className={styles.body}>
                <h3 className={styles.title}>{listing.title}</h3>
                <div className={styles.meta}>
                <span>{categoryLabel(listing.category)}</span>
                <span>·</span>
                <span>{conditionLabel(listing.condition)}</span>
                </div>
                <div className={styles.footer}>
                <span className={styles.price}>{formatPrice(listing.price)}</span>
                <span className={styles.time}>{formatTime(listing.createdAt)}</span>
                </div>
            </div>
        </Link>
    )
}