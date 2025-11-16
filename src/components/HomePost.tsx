import { CategoryTagList } from "@/components/CategoryTagList";
import type { Post } from "@/types/post";
import { Text } from "./Text/Text";
// import styles from './HomePage.module.scss'; // TODO

const styles = {} as any; // FIXME

interface HomePostProps {
  post: Post;
}

export const HomePost = ({ post }: HomePostProps) => (
  <div className={styles.foo}>
    <p>title: {post.title}</p>
    {/* <p>content: {post.content}</p> */}

    <Text text={post.content} as="p" variant="bodySmall" />

    <img style={{ maxWidth: 200 }} src={post.thumbnail_url} alt="thumbnail" />
    <p>createdAt: {post.createdAt}</p>

    <CategoryTagList categories={post.categories} />

    <div>
      <h4>author</h4>
      {/* <p>{first.author.id}</p> */}
      <p>{post.author.name}</p>
      <img style={{ maxWidth: 200 }} src={post.author.profilePicture} alt="profilePicture" />
      <p>{post.author.createdAt}</p>
      {/* <p>{first.author.updatedAt}</p> */}
    </div>
  </div>
)
