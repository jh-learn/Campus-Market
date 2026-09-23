import styles from './SearchBar.module.css'

interface SearchBarProps {
	value: string
	onChange: (value: string) => void
	placeholder?: string
}

export default function SearchBar({ value, onChange, placeholder = '搜索商品名称、描述...' }: SearchBarProps) {
	return (
		<label className={styles.label}>
			<span className={styles.visuallyHidden}>
				搜索商品
			</span>
			<input
				type="search"
				value={value}
				placeholder={placeholder}
				onChange={(event) => onChange(event.target.value)}
				className={styles.input}
			/>
		</label>
	)
}
