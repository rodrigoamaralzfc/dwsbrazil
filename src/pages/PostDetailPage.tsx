import { useNavigate, useParams } from 'react-router';
// import { useFormatDate } from '@/hooks/useFormatDate';
import { api } from '@/services/api';
// import styles from '@/styles/pages/PostDetailPage.module.scss';
import { formatDate } from '@/utils/date';
import { useQuery } from '@tanstack/react-query';

const styles = {} as any; // FIXME


export const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ['post', id],
    queryFn: () => api.getPost(id),
    enabled: !!id
  });

  const handleBack = () => {
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className={styles.postDetailPage}>
        <div className={styles.loading}>Loading...</div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className={styles.postDetailPage}>
        <div className={styles.error}>Post not found</div>
      </div>
    );
  }

  return (
    <div className={styles.postDetailPage}>
      <article className={styles.container}>
        <button className={styles.backButton} onClick={handleBack}>
          ← Back
        </button>

        <div className={styles.header}>
          <h1 className={styles.title}>{post.title}</h1>

          <div className={styles.meta}>
            <time className={styles.date}>
              {formatDate(post.createdAt || post.updatedAt, 'long')}
            </time>
            {post.author && (
              <span>By {post.author.name}</span>
            )}
          </div>
        </div>

        {post.thumbnail_url && (
          <img
            src={post.thumbnail_url || '/placeholder.svg'}
            alt={post.title}
            className={styles.image}
          />
        )}

        <div className={styles.content}>
          {post.content && <p>{post.content}</p>}
        </div>

        {post.categories && post.categories.length > 0 && (
          <div className={styles.categories}>
            {post.categories.map((category) => (
              <span key={category.id} className={styles.categoryTag}>
                {category.name}
              </span>
            ))}
          </div>
        )}
      </article>
    </div>
  );
};
