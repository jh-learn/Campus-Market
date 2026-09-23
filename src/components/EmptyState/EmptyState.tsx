import styles from './EmptyState.module.css'

export default function EmptyState({
    title = '暂无数据',
    description,
    action,
}: {
    title?: string,
    description?: string,
    action?:React.ReactNode
    }) {
    return (
        <div className={styles.emptyState}>
            <h3>{title}</h3>
            {description && <p>{description}</p>}
            {action}
        </div>
    )
}