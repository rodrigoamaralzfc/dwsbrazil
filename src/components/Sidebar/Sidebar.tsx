import FilterIcon from '@/assets/icons/tune.svg?react';
import { useFilters } from '@/contexts/FilterContext';
import { api } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import styles from './Sidebar.module.scss';

export const Sidebar = () => {
  const {
    selectedCategories,
    selectedAuthors,
    toggleCategory,
    toggleAuthor,
    clearFilters,
  } = useFilters();

  const { data: categories = [] } = useQuery({ queryKey: ['categories'], queryFn: api.getCategories });
  const { data: authors = [] } = useQuery({ queryKey: ['authors'], queryFn: api.getAuthors });

  const hasActiveFilters =
    selectedCategories.length > 0 || selectedAuthors.length > 0;

  return (
    <aside className={styles.sidebar}>
      <div className={styles.filtersHeader}>
        <FilterIcon />
        <h2>Filters</h2>
      </div>

      <div className={styles.filterSection}>
        <h3 className={styles.filterTitle}>Category</h3>
        <div className={styles.filterOptions}>
          {categories.map((category) => (
            <label key={category.id} className={styles.filterCheckbox}>
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.id)}
                onChange={() => toggleCategory(category.id)}
              />
              <span>{category.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className={styles.filterSection}>
        <h3 className={styles.filterTitle}>Author</h3>
        <div className={styles.filterOptions}>
          {authors.map((author) => (
            <label key={author.id} className={styles.filterCheckbox}>
              <input
                type="checkbox"
                checked={selectedAuthors.includes(author.id)}
                onChange={() => toggleAuthor(author.id)}
              />
              <span>{author.name}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        className={styles.applyFiltersBtn}
        onClick={clearFilters}
        disabled={!hasActiveFilters}
      >
        {hasActiveFilters ? 'Clear filters' : 'Apply filters'}
      </button>
    </aside>
  );
};
