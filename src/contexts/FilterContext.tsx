import {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import type { ReactNode } from "react";

type FilterContextType = {
  selectedCategories: string[];
  finalSelectedCategories: string[];
  selectedAuthors: string[];
  finalSelectedAuthors: string[];
  sortBy: string;
  searchQuery: string;
  toggleCategory: (categoryId: string) => void;
  toggleAuthor: (authorId: string) => void;
  setSortBy: (value: string) => void;
  setSearchQuery: (value: string) => void;
  applyFilters: () => void;
};

const FilterContext = createContext<FilterContextType | null>(null);

type Props = {
  children: ReactNode;
};

export const FilterProvider = ({ children }: Props) => {
  const [finalSelectedCategories, setFinalSelectedCategories] = useState<string[]>([]);
  const [finalSelectedAuthors, setFinalSelectedAuthors] = useState<string[]>([]);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("newest");
  const [searchQuery, setSearchQuery] = useState<string>("");

  console.info(selectedAuthors, finalSelectedAuthors)

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

  const applyFilters = useCallback(() => {
    setFinalSelectedCategories(selectedCategories);
    setFinalSelectedAuthors(selectedAuthors);
  }, [selectedCategories, selectedAuthors]);

  const value: FilterContextType = {
    selectedCategories,
    finalSelectedCategories,
    selectedAuthors,
    finalSelectedAuthors,
    sortBy,
    searchQuery,
    toggleCategory,
    toggleAuthor,
    setSortBy,
    setSearchQuery,
    applyFilters,
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
