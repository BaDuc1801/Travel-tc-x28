import React from 'react';
import PostCard from './PostCard';
import { samplePosts } from '../list';

const PostList: React.FC = () => {
  return (
    <div className='flex flex-col w-[45%] m-auto gap-5'>
      {samplePosts.map((post, index) => (
        <PostCard
          key={index}
          username={post.username}
          location={post.location}
          timePosted={post.timePosted}
          content={post.content}
          imageSrc={post.imageSrc}
          comments={post.comments}
        />
      ))}
    </div>
  );
};

export default PostList;

