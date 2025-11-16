import styles from "./DesktopBlogTop.module.scss";

interface Props {
  sortBy: string;
  handleSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const DesktopBlogTop = ({ sortBy, handleSortChange }: Props) => {
  return (
    <div className={styles.contentHeader}>
      <h1>DWS blog</h1>
      <div className={styles.sortControls}>
        <label>Sort by:</label>
        <select
          value={sortBy}
          onChange={handleSortChange}
          className={styles.sortSelect}
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
      </div>
    </div>
  );
};
