// src/app/api/posts/__tests__/route.test.ts
import { GET, POST } from '../route';
import { getPosts } from '@/lib/store';

describe('Posts API', () => {
  it('GET should return empty array initially', async () => {
    const response = await GET();
    const data = await response.json();
    expect(data).toEqual({ data: [] });
  });

  it('POST should create new post', async () => {
    const postData = {
      title: 'Test Post',
      body: 'Test Body',
      destination: 'twitter',
      scheduledTime: '2025-02-03T15:00:00Z'
    };

    const request = new Request('http://localhost:3000/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    });

    const response = await POST(request);
    const data = await response.json();
    
    expect(response.status).toBe(201);
    expect(data.data).toHaveProperty('id');
    expect(data.data.title).toBe(postData.title);
  });
});