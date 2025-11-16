import LogoSVG from "@/assets/icons/dws-logo.svg?react";
import SearchSVG from "@/assets/icons/search-button.svg?react";
import { useFilters } from "@/contexts/FilterContext";
import styles from "./Header.module.scss";

export const Header = () => {
  const { inputSearch, setInputSearch, applySearch } = useFilters();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(e.target.value);
  };

  const onPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      applySearch();
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <LogoSVG />

        <div className={styles.searchSection}>
          <div className={styles.searchBox}>
            <input
              type="text"
              placeholder="Search"
              className={styles.searchInput}
              value={inputSearch}
              onChange={handleSearchChange}
              onKeyDown={onPressEnter}
              aria-label="Search blog posts"
            />
            <button
              className={styles.searchButton}
              aria-label="Submit search"
              onClick={applySearch}
            >
              <SearchSVG />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
