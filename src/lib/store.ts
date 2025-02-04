import { Post } from '@/types/Post';

// In-memory store
let posts: Post[] = [];

export const getPosts = (): Post[] => {
  return [...posts]; // Return a copy to prevent direct mutations
};

export const addPost = (post: Post): Post => {
  posts.push(post);
  return post;
};