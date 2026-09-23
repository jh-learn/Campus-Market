import type { Category } from '@/types'
import { CATEGORIES } from '@/utils/constants'
import styles from './CategoryFilter.module.css'

interface CategoryFilterProps {
	value: Category | 'all'
	onChange: (value: Category | 'all') => void
}

export default function CategoryFilter({ value, onChange }: CategoryFilterProps) {
	return (
		<div className={styles.filter} role="group" aria-label="商品分类">
			{CATEGORIES.map((category) => (
				<button
					key={category.value}
					type="button"
					aria-pressed={value === category.value}
					onClick={() => onChange(category.value)}
					className={value === category.value ? styles.active : styles.button}
				>
					{category.label}
				</button>
			))}
		</div>
	)
}
