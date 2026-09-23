
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createListing } from '@/api/listings'
import { getErrorMessage } from '@/api/client'
import ListingForm from '@/features/listings/components/ListingForm/ListingForm'
import { useCurrentUser } from '@/features/auth/useCurrentUser'
import type { ListingFormValues } from '@/schemas/listingSchema'
import styles from './CreateListingPage.module.css'

export default function CreateListingPage() {
  const { user, loading } = useCurrentUser()
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (values: ListingFormValues) => {
    if (!user) return
    setSubmitting(true)
    try {
      const listing = await createListing({ ...values, images: [values.imageUrl], sellerId: user.id })
      navigate(`/listings/${listing.id}`)
    } catch (error) {
      alert(getErrorMessage(error))
    } finally { setSubmitting(false) }
  }

  if (loading) return <p className={styles.status}>正在加载用户信息...</p>
  if (!user) return <p className={styles.status}>暂时无法获取当前用户。</p>
  return <section className={styles.page}><h1>发布商品</h1><ListingForm onSubmit={handleSubmit} submitting={submitting} /></section>
}