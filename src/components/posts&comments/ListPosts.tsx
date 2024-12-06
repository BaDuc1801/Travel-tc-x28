import React from 'react';
import PostCard from './PostCard.tsx';
import { PostProps } from '../Home'; 

export interface PostListProps {
  listPost: PostProps[]; 
  setListPost: React.Dispatch<React.SetStateAction<PostProps[]>>; 
}

const PostList: React.FC<PostListProps> = ({ listPost, setListPost }) => {
  return (
    <div className="flex flex-col m-auto gap-5">
      {listPost.map((post, index) => (
        <PostCard
          key={index} 
          items={post}
          setListPost={setListPost}
        />
      ))}
    </div>
  );
};

export default PostList;
