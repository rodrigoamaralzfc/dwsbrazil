import { PostCard } from "@/components/PostCard/PostCard";
import { api } from "@/services/api";
import { sortByNewest } from "@/utils/date";
import { useQuery } from "@tanstack/react-query";
import styles from './LatestArticles.module.scss';

export function uniqueArray<T>(list: T[]) {
  return Array.from(new Set(list))
}

export const LatestArticles = () => {
  const {
    data: posts = [],
    isLoading,
    error,
  } = useQuery({ queryKey: ["posts"], queryFn: api.getPosts });

  const lastPosts = sortByNewest(posts).slice(-3).reverse();
  const dates = posts.map(p => p.createdAt)
  console.log(posts, lastPosts, dates, uniqueArray(dates))

  return (
    <main className={styles.mainContent}>
      {/* TODO error handling */}
      {error && (
        <div className={styles.errorMessage}>
          Error loading posts. Please try again.
        </div>
      )}

      {/* TODO loading state */}
      {isLoading && <div className={styles.loading}>Loading posts...</div>}

      {!isLoading && lastPosts.length === 0 && (
        <div className={styles.noResults}>
          No posts found. Try adjusting your filters.
        </div>
      )}

      {!isLoading && lastPosts.length > 0 && (
        <div className={styles.postsGrid}>
          {lastPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </main>
  );
};
