import { Post, CreatePostInput } from '@/types/Post';
import { PostTable } from '@/components/PostTable';
import { PostForm } from '@/components/PostForm';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts');
      if (!response.ok) throw new Error('Failed to fetch posts');
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      setError('Failed to load posts');
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreatePost = async (postData: CreatePostInput) => {
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) throw new Error('Failed to create post');
      await fetchPosts(); // Refresh the posts list
    } catch (err) {
      setError('Failed to create post');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-semibold mb-6">Scheduled Posts</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <PostTable posts={posts} />
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium mb-4">Create New Post</h2>
            <PostForm onSubmit={handleCreatePost} />
          </div>
        </div>
      </div>
    </div>
  );
}