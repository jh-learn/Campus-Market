
import { Link } from 'react-router-dom'
import styles from './NotFoundPage.module.css'

export default function NotFoundPage() {
  return <section className={styles.page}><h1>404</h1><p>你访问的页面不存在。</p><Link to="/">返回首页</Link></section>
}