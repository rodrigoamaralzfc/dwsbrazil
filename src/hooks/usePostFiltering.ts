import { useFilters } from '@/contexts/FilterContext';
import type { Post } from '@/types/post';
import { useMemo } from 'react';

export const usePostFiltering = (posts: Post[]) => {
  const { finalSelectedCategories, finalSelectedAuthors, sortBy, finalSearchQuery } = useFilters();

  const filteredPosts = useMemo(() => {
    if (!posts) return [];

    const filtered = posts.filter((post) => {
      const matchesCategory =
        finalSelectedCategories.length === 0 ||
        post.categories?.some((cat) => finalSelectedCategories.includes(cat.id));

      const matchesAuthor =
        finalSelectedAuthors.length === 0 ||
        finalSelectedAuthors.includes(post.author?.id);

      const matchesSearch =
        finalSearchQuery === '' ||
        post.title.toLowerCase().includes(finalSearchQuery.toLowerCase()) ||
        post.content?.toLowerCase().includes(finalSearchQuery.toLowerCase());

      return (matchesCategory || matchesAuthor) && matchesSearch;
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
  }, [posts, finalSelectedCategories, finalSelectedAuthors, sortBy, finalSearchQuery]);

  return filteredPosts
};
