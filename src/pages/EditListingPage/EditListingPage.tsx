
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchListing, updateListing } from '@/api/listings'
import { getErrorMessage } from '@/api/client'
import { useAsync } from '@/hooks/useAsync'
import Loading from '@/components/Loading/Loading'
import EmptyState from '@/components/EmptyState/EmptyState'
import ListingForm from '@/features/listings/components/ListingForm/ListingForm'
import { useCurrentUser } from '@/features/auth/useCurrentUser'
import type { ListingFormValues } from '@/schemas/listingSchema'
import styles from './EditListingPage.module.css'

export default function EditListingPage() {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const { user, loading: userLoading } = useCurrentUser()
  const { data, loading, error } = useAsync(() => fetchListing(id), [id])
  const [submitting, setSubmitting] = useState(false)

  if (userLoading || loading) return <Loading />
  if (error || !data) return <EmptyState title="商品不存在" description={error ?? undefined} />
  if (!user || user.id !== data.sellerId) return <EmptyState title="无权编辑此商品" />

  const handleSubmit = async (values: ListingFormValues) => {
    setSubmitting(true)
    try {
      await updateListing(data.id, { ...values, images: [values.imageUrl] })
      navigate(`/listings/${data.id}`)
    } catch (submitError) { alert(getErrorMessage(submitError)) } finally { setSubmitting(false) }
  }

  return <section className={styles.page}><h1>编辑商品</h1><ListingForm defaultValues={{ ...data, imageUrl: data.images[0] ?? '' }} onSubmit={handleSubmit} submitting={submitting} submitLabel="保存修改" /></section>
}