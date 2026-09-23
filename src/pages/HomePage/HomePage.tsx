import { useListingFilter } from '@/store/listingStore';
import { useDebounce } from '@/hooks/useDebounce';
import { useListings } from '@/features/listings/hooks/useListings'
import Loading from '@/components/Loading/Loading';
import EmptyState from '@/components/EmptyState/EmptyState';
import CategoryFilter from '@/components/CategoryFilter/CategoryFilter';
import SearchBar from '@/components/SearchBar/SearchBar';
import ListingGrid from '@/features/listings/components/ListingGrid/ListingGrid';
import styles from './HomePage.module.css';

export default function HomePage() {
  const { category, keyword, setCategory, setKeyword } = useListingFilter();
  const debouncedKeyword = useDebounce(keyword, 400);
  const { data, loading, error } = useListings({
    category,
    keyword: debouncedKeyword,
  });

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <h1>发现身边的二手好物</h1>
        <SearchBar value={keyword} onChange={setKeyword} />
      </section>

      <section className={styles.filters}>
        <CategoryFilter value={category} onChange={setCategory} />
      </section>

      <section className={styles.results}>
        {loading && <Loading />}
        {error && <EmptyState title="加载失败" description={error} />}
        {!loading && !error && data?.length === 0 && (
          <EmptyState title="没有找到相关商品" description="换个关键词试试" />
        )}
        {!loading && !error && data && <ListingGrid listings={data} emptyTitle="没有找到相关商品" />}
      </section>
    </div>
  );
}