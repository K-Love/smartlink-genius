export interface Post {
  id: string;
  title: string;
  body: string;
  destination: string;
  scheduledTime: string;
  status: 'pending' | 'published' | 'failed';
}

export interface CreatePostInput {
  title: string;
  body: string;
  destination: string;
  scheduledTime: string;
}