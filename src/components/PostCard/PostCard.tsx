import type { Post } from "@/types/post";
import { formatDate } from "@/utils/date";
import { useNavigate } from "react-router";
import styles from "./PostCard.module.scss";

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/post/${post.id}`);
  };

  return (
    <article className={styles.postCard} onClick={handleClick}>
      <div className={styles.imageWrapper}>
        <img
          src={post.thumbnail_url}
          alt={post.title}
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.meta}>
          <time className={styles.date}>
            {formatDate(post.createdAt, "short")}
          </time>
          {post.author && (
            <span className={styles.author}>{post.author.name}</span>
          )}
        </div>

        <h3 className={styles.title}>{post.title}</h3>

        {post.content && (
          <p className={styles.excerpt}>{post.content.substring(0, 150)}...</p>
        )}

        {post.categories && post.categories.length > 0 && (
          <div className={styles.categories}>
            {post.categories.map((category) => (
              <span key={category.id} className={styles.categoryTag}>
                {category.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};
