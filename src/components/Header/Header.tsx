import SearchSVG from '@/assets/icons/search.svg?react';
import { useFilters } from '@/contexts/FilterContext';
import styles from './Header.module.scss';

export const Header = () => {
  const { searchQuery, setSearchQuery } = useFilters();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <span className={styles.logoText}>dentsu</span>
          <span className={styles.logoSubtext}>world services</span>
        </div>

        <div className={styles.searchSection}>
          <div className={styles.searchBox}>
            <input
              type="text"
              placeholder="Search"
              className={styles.searchInput}
              value={searchQuery}
              onChange={handleSearchChange}
              aria-label="Search blog posts"
            />
            <button
              className={styles.searchButton}
              aria-label="Submit search"
              onClick={() => { }}
            >
              <SearchSVG />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
