import { Post } from '@/types/Post';
import { format } from 'date-fns';

interface PostTableProps {
  posts: Post[];
}

export const PostTable = ({ posts }: PostTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scheduled Time</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {posts.map((post) => (
            <tr key={post.id}>
              <td className="px-6 py-4 whitespace-nowrap">{post.title}</td>
              <td className="px-6 py-4 whitespace-nowrap">{post.destination}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {format(new Date(post.scheduledTime), 'PPp')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  post.status === 'published' ? 'bg-green-100 text-green-800' :
                  post.status === 'failed' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {post.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};