import { useFilters } from '@/contexts/FilterContext';
import type { Post } from '@/types/post';
import { useMemo } from 'react';

export const usePostFiltering = (posts: Post[]) => {
  const { selectedCategories, selectedAuthors, sortBy, searchQuery } = useFilters();

  return useMemo(() => {
    if (!posts) return [];

    const filtered = posts.filter((post) => {
      const matchesCategory =
        selectedCategories.length === 0 ||
        post.categories?.some((cat) => selectedCategories.includes(cat.id));

      const matchesAuthor =
        selectedAuthors.length === 0 ||
        selectedAuthors.includes(post.author?.id);

      const matchesSearch =
        searchQuery === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content?.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesAuthor && matchesSearch;
    });

    if (sortBy === 'newest') {
      filtered.sort(
        (a, b) =>
          (new Date(b.createdAt)).getTime() - (new Date(a.createdAt)).getTime()
      );
    } else if (sortBy === 'oldest') {
      filtered.sort(
        (a, b) =>
          (new Date(a.createdAt)).getTime() - (new Date(b.createdAt)).getTime()
      );
    }

    return filtered;
  }, [posts, selectedCategories, selectedAuthors, sortBy, searchQuery]);
};
