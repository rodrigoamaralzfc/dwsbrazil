import { PostCard } from "@/components/PostCard/PostCard";
import { api } from "@/services/api";
import { sortByNewest } from "@/utils/date";
import { useQuery } from "@tanstack/react-query";
import styles from "./LatestArticles.module.scss";

export const LatestArticles = () => {
  const {
    data: posts = [],
    isLoading,
    error,
  } = useQuery({ queryKey: ["posts"], queryFn: api.getPosts });

  const lastPosts = sortByNewest(posts).slice(-3).reverse();

  if (isLoading) {
    return <div className={styles.loading}>Loading posts...</div>;
  }

  // TODO
  if (error) {
    return null;
  }

  if (!isLoading && lastPosts.length === 0) {
    return null;
  }

  return (
    <div className={styles.mainContent}>
      <h2 className={styles.title}>Latest Articles</h2>

      <div className={styles.postsGrid}>
        {lastPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};
