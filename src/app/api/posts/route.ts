// src/app/api/posts/route.ts
import { NextResponse } from 'next/server';
import { Post } from '@/types/Post';
import { getPosts, addPost } from '@/lib/store';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  try {
    const posts = getPosts();
    return NextResponse.json({ data: posts });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.title || !body.body || !body.destination || !body.scheduledTime) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newPost: Post = {
      id: uuidv4(),
      title: body.title,
      body: body.body,
      destination: body.destination,
      scheduledTime: body.scheduledTime,
      status: 'pending'
    };
    
    const created = addPost(newPost);
    return NextResponse.json({ data: created }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}