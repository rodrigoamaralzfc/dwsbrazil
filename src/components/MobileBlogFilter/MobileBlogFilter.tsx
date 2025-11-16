import { DropdownButton } from "@/components/DropdownButton/DropdownButton";
import { useGetAuthors } from "@/hooks/useGetAuthors";
import { useGetCategories } from "@/hooks/useGetCategories";
import styles from './MobileBlogFilter.module.scss';

interface Props {
  sortBy: string;
  handleSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const MobileBlogFilter = ({ sortBy, handleSortChange }: Props) => {
  const { data: categories = [] } = useGetCategories()
  const { data: authors = [] } = useGetAuthors()

  const authorOptions = authors.map(({ id, name }) => ({ id, label: name }))
  const categoriesOptions = categories.map(({ id, name }) => ({ id, label: name }))

  return (
    <div className={styles.contentHeader}>
      <DropdownButton
        placeholder="Categories"
        options={authorOptions}
      />

      <DropdownButton
        placeholder="Authors"
        options={categoriesOptions}
      />

      <div className={styles.sortControls}>
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
  )
}
