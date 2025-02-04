// src/pages/api/posts.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { Post } from '@/types/Post';
import { getPosts, addPost } from '@/lib/store';
import { v4 as uuidv4 } from 'uuid';

type ResponseData = {
  message?: string;
  data?: Post | Post[];
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    switch (req.method) {
      case 'GET':
        const posts = getPosts();
        return res.status(200).json({ data: posts });

      case 'POST':
        if (!req.body.title || !req.body.body || !req.body.destination || !req.body.scheduledTime) {
          return res.status(400).json({ error: 'Missing required fields' });
        }

        const newPost: Post = {
          id: uuidv4(),
          title: req.body.title,
          body: req.body.body,
          destination: req.body.destination,
          scheduledTime: req.body.scheduledTime,
          status: 'pending'
        };
        
        const created = addPost(newPost);
        return res.status(201).json({ data: created });

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}