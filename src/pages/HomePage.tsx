import { DesktopBlogTop } from "@/components/DesktopBlogTop/DesktopBlogTop";
import { MobileBlogFilter } from "@/components/MobileBlogFilter/MobileBlogFilter";
import { PostCard } from "@/components/PostCard/PostCard";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { useFilters } from "@/contexts/FilterContext";
import { useIsMobile } from "@/hooks/useIsMobile";
import { usePostFiltering } from "@/hooks/usePostFiltering";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import styles from './HomePage.module.scss';

export const HomePage = () => {
  const { sortBy, setSortBy } = useFilters();
  const {
    data: posts = [],
    isLoading,
    error,
  } = useQuery({ queryKey: ["posts"], queryFn: api.getPosts });
  const filteredPosts = usePostFiltering(posts);
  const isMobile = useIsMobile()

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  return (
    <div className={styles.homePage}>
      <div className={styles.pageContainer}>
        <div className={styles.sidebarWrapper}>
          <Sidebar />
        </div>

        <main className={styles.mainContent}>
          {isMobile
            ? <MobileBlogFilter sortBy={sortBy} handleSortChange={handleSortChange} />
            : <DesktopBlogTop sortBy={sortBy} handleSortChange={handleSortChange} />
          }

          {/* TODO error handling */}
          {error && (
            <div className={styles.errorMessage}>
              Error loading posts. Please try again.
            </div>
          )}

          {/* TODO loading state */}
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
