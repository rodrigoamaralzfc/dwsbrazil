import {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import type { ReactNode } from "react";

type FilterContextType = {
  selectedCategories: string[];
  selectedAuthors: string[];
  sortBy: string;
  searchQuery: string;
  toggleCategory: (categoryId: string) => void;
  toggleAuthor: (authorId: string) => void;
  setSortBy: (value: string) => void;
  setSearchQuery: (value: string) => void;
  clearFilters: () => void;
};

const FilterContext = createContext<FilterContextType | null>(null);

type Props = {
  children: ReactNode;
};

export const FilterProvider = ({ children }: Props) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("newest");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const toggleCategory = useCallback((categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  }, []);

  const toggleAuthor = useCallback((authorId: string) => {
    setSelectedAuthors((prev) =>
      prev.includes(authorId)
        ? prev.filter((id) => id !== authorId)
        : [...prev, authorId]
    );
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedCategories([]);
    setSelectedAuthors([]);
    setSearchQuery("");
    setSortBy("newest");
  }, []);

  const value: FilterContextType = {
    selectedCategories,
    selectedAuthors,
    sortBy,
    searchQuery,
    toggleCategory,
    toggleAuthor,
    setSortBy,
    setSearchQuery,
    clearFilters,
  };

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilters must be used within FilterProvider");
  }
  return context;
};
