import type { ReactNode } from "react";
import { createContext, useCallback, useContext, useState } from "react";

type FilterContextType = {
  inputCategories: string[];
  categories: string[];
  inputAuthors: string[];
  authors: string[];
  sortBy: string;
  inputSearch: string;
  searchQuery: string;
  toggleCategory: (categoryId: string) => void;
  toggleAuthor: (authorId: string) => void;
  setSortBy: (value: string) => void;
  setInputSearch: (value: string) => void;
  applyFilters: () => void;
  applySearch: () => void;
};

const FilterContext = createContext<FilterContextType | null>(null);

type Props = {
  children: ReactNode;
};

export const FilterProvider = ({ children }: Props) => {
  // final values used for filtering
  const [categories, setCategories] = useState<string[]>([]);
  const [authors, setAuthors] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("newest");

  // temporary input values
  const [inputCategories, setInputCategories] = useState<string[]>([]);
  const [inputAuthors, setInputAuthors] = useState<string[]>([]);
  const [inputSearch, setInputSearch] = useState<string>("");

  const toggleCategory = useCallback((categoryId: string) => {
    setInputCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    );
  }, []);

  const toggleAuthor = useCallback((authorId: string) => {
    setInputAuthors((prev) =>
      prev.includes(authorId)
        ? prev.filter((id) => id !== authorId)
        : [...prev, authorId],
    );
  }, []);

  const applyFilters = useCallback(() => {
    setCategories(inputCategories);
    setAuthors(inputAuthors);
  }, [inputCategories, inputAuthors]);

  const applySearch = useCallback(() => {
    setSearchQuery(inputSearch);
  }, [inputSearch]);

  const value: FilterContextType = {
    inputCategories,
    categories,
    inputAuthors,
    authors,
    sortBy,
    inputSearch,
    searchQuery,
    toggleCategory,
    toggleAuthor,
    setSortBy,
    setInputSearch,
    applyFilters,
    applySearch,
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilters must be used within FilterProvider");
  }
  return context;
};
