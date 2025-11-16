import { useFilters } from '@/contexts/FilterContext';
import type { Post } from '@/types/post';
import { sortByNewest, sortByOldest } from '@/utils/date';
import { useMemo } from 'react';

export const usePostFiltering = (posts: Post[]) => {
  const { categories, authors, sortBy, searchQuery } = useFilters();

  const filteredPosts = useMemo(() => {
    if (!posts) return [];

    const filtered = posts.filter((post) => {
      const matchesCategory =
        categories.length === 0 ||
        post.categories?.some((cat) => categories.includes(cat.id));

      const matchesAuthor =
        authors.length === 0 ||
        authors.includes(post.author?.id);

      const matchesSearch =
        searchQuery === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content?.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesAuthor && matchesSearch;
    });

    if (sortBy === 'newest') {
      sortByNewest(filtered)
      // filtered.sort(
      //   (a, b) =>
      //     (new Date(b.createdAt)).getTime() - (new Date(a.createdAt)).getTime()
      // );
    } else if (sortBy === 'oldest') {
      sortByOldest(filtered)
      // filtered.sort(
      //   (a, b) =>
      //     (new Date(a.createdAt)).getTime() - (new Date(b.createdAt)).getTime()
      // );
    }

    return filtered;
  }, [posts, categories, authors, sortBy, searchQuery]);

  return filteredPosts
};
