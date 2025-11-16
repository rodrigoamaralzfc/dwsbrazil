import { HomePost } from "@/components/HomePost";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import styles from './HomePage.module.scss';
import { useFilters } from "@/contexts/FilterContext";
import { usePostFiltering } from "@/hooks/usePostFiltering";
import { PostCard } from "@/components/PostCard/PostCard";

// export const HomePage = () => {
//   const {
//     data: posts = [],
//     isLoading,
//     error,
//   } = useQuery({ queryKey: ["posts"], queryFn: api.getPosts });

//   const authorIdList = posts.map(post => post.authorId);

//   console.info({ posts, isLoading, error });

//   if (posts.length === 0) {
//     return 'Loading'
//   }

//   return (
//     <main className={styles.main}>
//       {posts.map((post) => (<HomePost post={post} key={post.id} />))}
//     </main >
//   );
// }

export const HomePage = () => {
  const { sortBy, setSortBy } = useFilters();
  const {
    data: posts = [],
    isLoading,
    error,
  } = useQuery({ queryKey: ["posts"], queryFn: api.getPosts });
  const filteredPosts = usePostFiltering(posts);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className={styles.homePage}>
      {/* <Header /> */}

      <div className={styles.pageContainer}>
        <div className={styles.sidebarWrapper}>
          {/* <Sidebar /> */}
          Sidebar
        </div>

        <main className={styles.mainContent}>
          <div className={styles.contentHeader}>
            <h1>DWS blog</h1>
            <div className={styles.sortControls}>
              <label>Sort by:</label>
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

          {error && (
            <div className={styles.errorMessage}>
              Error loading posts. Please try again.
            </div>
          )}

          {isLoading && <div className={styles.loading}>Loading posts...</div>}

          {!isLoading && filteredPosts.length === 0 && (
            <div className={styles.noResults}>
              No posts found. Try adjusting your filters.
            </div>
          )}

          {!isLoading && filteredPosts.length > 0 && (
            <div className={styles.postsGrid}>
              {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
