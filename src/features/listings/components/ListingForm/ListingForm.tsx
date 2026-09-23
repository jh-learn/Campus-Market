import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CONDITIONS, CATEGORIES } from '@/utils/constants'
import { listingFormSchema, type ListingFormInput, type ListingFormValues } from '@/schemas/listingSchema'
import styles from './ListingForm.module.css'

interface ListingFormProps {
	defaultValues?: Partial<ListingFormInput>
	onSubmit: (values: ListingFormValues) => Promise<void>
	submitting?: boolean
	submitLabel?: string
}

export default function ListingForm({ defaultValues, onSubmit, submitting = false, submitLabel = '发布商品' }: ListingFormProps) {
	const { register, handleSubmit, formState: { errors } } = useForm<ListingFormInput, unknown, ListingFormValues>({
		resolver: zodResolver(listingFormSchema),
		defaultValues: { category: 'textbook', condition: 'good', ...defaultValues },
	})

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
			<label className={styles.field}>商品名称<input {...register('title')} className={styles.control} placeholder="例如：高等数学教材" />{errors.title && <small className={styles.error}>{errors.title.message}</small>}</label>
			<label className={styles.field}>商品描述<textarea {...register('description')} className={`${styles.control} ${styles.textarea}`} placeholder="介绍商品的新旧程度、配件和交易信息" />{errors.description && <small className={styles.error}>{errors.description.message}</small>}</label>
			<label className={styles.field}>售价<input type="number" min="0" step="0.01" {...register('price', { valueAsNumber: true })} className={styles.control} />{errors.price && <small className={styles.error}>{errors.price.message}</small>}</label>
			<label className={styles.field}>原价（可选）<input type="number" min="0" step="0.01" {...register('originalPrice', { valueAsNumber: true })} className={styles.control} />{errors.originalPrice && <small className={styles.error}>{errors.originalPrice.message}</small>}</label>
			<label className={styles.field}>分类<select {...register('category')} className={styles.control}>{CATEGORIES.filter(({ value }) => value !== 'all').map((category) => <option key={category.value} value={category.value}>{category.label}</option>)}</select></label>
			<label className={styles.field}>成色<select {...register('condition')} className={styles.control}>{CONDITIONS.map((condition) => <option key={condition.value} value={condition.value}>{condition.label}</option>)}</select></label>
			<label className={styles.field}>商品图片地址<input {...register('imageUrl')} className={styles.control} placeholder="/images/example.svg 或图片 URL" />{errors.imageUrl && <small className={styles.error}>{errors.imageUrl.message}</small>}</label>
			<button type="submit" disabled={submitting} className={styles.submit}>{submitting ? '保存中...' : submitLabel}</button>
		</form>
	)
}
