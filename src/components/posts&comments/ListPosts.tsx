import React from 'react';
import PostCard from './PostCard.tsx';

interface PostListProps {
  listPost: any[];
}
const PostList: React.FC<PostListProps> = ({ listPost }) => {

  return (
    <div className="flex flex-col m-auto gap-5">
      {listPost.map((post, index) => (
        <PostCard
          key={index}
          postId={post._id}
          author={post.author}
          location={post.location}
          timestamp={post.timestamp}
          emotion={post.emotion}
          content={post.content}
          img={post.img} privacy={post.privacy} type={post.type} />
      ))}
    </div>
  );
};

export default PostList;
