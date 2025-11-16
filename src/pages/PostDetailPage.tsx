import Arrow from "@/assets/icons/arrow-left-magenta.svg?react";
import { Button } from "@/components/Button/Button";
import { LatestArticles } from "@/components/LatestArticles/LatestArticles";
import { api } from "@/services/api";
import { formatDate } from "@/utils/date";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import styles from "./PostDetailPage.module.scss";

export const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  if (id == undefined) {
    throw new Error("Route param id is missing");
  }

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () => api.getPost(id),
    enabled: !!id,
  });

  const handleBack = () => {
    navigate("/");
  };

  // TODO loading state
  if (isLoading) {
    return (
      <div className={styles.postDetailPage}>
        <div className={styles.loading}>Loading...</div>
      </div>
    );
  }

  // TODO error handling
  if (error || !post) {
    return (
      <div className={styles.postDetailPage}>
        <div className={styles.error}>Post not found</div>
      </div>
    );
  }

  return (
    <div className={styles.postDetailPage}>
      <div className={styles.wrapper}>
        <Button
          variant="secondary"
          onClick={handleBack}
          className={styles.backButton}
        >
          <Arrow />
          Back
        </Button>

        <article className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>{post.title}</h1>

            <div className={styles.meta}>
              <img
                className={styles.avatar}
                src={post.author.profilePicture}
                alt="Profile picture"
              />

              <div className={styles.metaCol}>
                <p>
                  Written by: <strong>{post.author.name}</strong>
                </p>

                <time className={styles.date}>
                  {formatDate(post.createdAt || post.updatedAt, "long")}
                </time>
              </div>
            </div>
          </div>

          {post.thumbnail_url && (
            <img
              // FIXME: placeholder
              src={post.thumbnail_url || "/placeholder.svg"}
              alt={post.title}
              className={styles.image}
            />
          )}

          <div className={styles.content}>
            {post.content && <p>{post.content}</p>}
          </div>

          <LatestArticles />
        </article>
      </div>
    </div>
  );
};
