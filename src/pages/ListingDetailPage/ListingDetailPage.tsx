import { useParams, Link, useNavigate } from 'react-router-dom'
import { fetchListing, deleteListing } from '@/api/listings'
import { useAsync } from '@/hooks/useAsync'
import { useAuthStore } from '@/store/authStore'
import Loading from '@/components/Loading/Loading'
import EmptyState from '@/components/EmptyState/EmptyState'
import { formatPrice, formatTime } from '@/utils/format'
import { categoryLabel, conditionLabel } from '@/utils/constants'
import { getErrorMessage } from '@/api/client'
import { useState } from 'react'
import styles from './ListingDetailPage.module.css'

export default function ListingDetailPage() {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const currentUser = useAuthStore((s) => s.user);
  const { data, loading, error } = useAsync(() => fetchListing(id), [id]);
  const [deleting, setDeleting] = useState(false);

  if (loading) return <Loading />;
  if (error || !data)
    return <EmptyState title="商品不存在" description={error ?? ''} />;

  const isOwner = currentUser?.id === data.sellerId;

  const handleDelete = async () => {
    if (!confirm('确定删除这条商品吗？')) return;
    setDeleting(true);
    try {
      await deleteListing(data.id);
      navigate('/my-listings');
    } catch (err) {
      alert(getErrorMessage(err));
    } finally {
      setDeleting(false);
    }
  };

  return (
    <article className={styles.article}>
      <div className={styles.gallery}>
        {data.images.map((src) => (
          <img key={src} src={src} alt={data.title} />
        ))}
      </div>
      <h1>{data.title}</h1>
      <p>{formatPrice(data.price)}</p>
      <p>
        {categoryLabel(data.category)} · {conditionLabel(data.condition)}
      </p>
      <p>{data.description}</p>
      <p>发布于 {formatTime(data.createdAt)}</p>

      <div className={styles.seller}>
        <img src={data.seller.avatar} alt={data.seller.name} width={40} />
        <span>{data.seller.name}</span>
        <span>{data.seller.campus}</span>
      </div>

      {isOwner && (
        <div className={styles.actions}>
          <Link className={styles.edit} to={`/listings/${data.id}/edit`}>编辑</Link>
          <button className={styles.delete} onClick={handleDelete} disabled={deleting}>
            {deleting ? '删除中...' : '删除'}
          </button>
        </div>
      )}
    </article>
  );
}