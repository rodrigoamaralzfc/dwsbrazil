import type { Category } from "@/types/category";

interface CategoryTagListProps {
  categories: Category[];
}

export const CategoryTagList = ({ categories }: CategoryTagListProps) => (
  <>
    {categories.map((category) => (
      <div key={category.id} style={{ marginBottom: 10 }}>
        <p>name: {category.name}</p>
      </div>
    ))}
  </>
);
