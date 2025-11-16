import { API_BASE } from "../constants/api";
import type { Author } from "../types/author";
import type { Category } from "../types/category";
import type { Post } from "../types/post";

async function get<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE}/${path}`);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return (await response.json()) as T;
}

export const api = {
  getPosts: () => get<Post[]>("posts/"),
  getPost: async (id: string) => get<Post>(`posts/${id}`),
  getAuthors: async () => get<Author[]>(`authors/`),
  getAuthorById: async (id: string) => get<Author>(`authors/${id}`),
  getCategories: async () => get<Category[]>(`categories/`),
  getCategorieById: async (id: string) => get<Category>(`categories/${id}`),
};
