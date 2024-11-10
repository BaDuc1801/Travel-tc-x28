import React, { useState } from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import { FaRegBookmark, FaRegComment, FaRegHeart } from 'react-icons/fa';
import { CommentProps } from './CommentCard.tsx';
import { Modal } from 'antd';
import ListComments from './ListComments.tsx';

export interface PostProps {
    username: string;
    location: string;
    timePosted: string;
    content: string;
    imageSrc: string;
    comments: CommentProps[];
}

const PostCard: React.FC<PostProps> = ({
    username,
    location,
    timePosted,
    content,
    imageSrc,
    comments
}) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const countTotalComments = (comments: CommentProps[]): number => {
        return comments.reduce((total, comment) => {
            return total + 1 + countTotalComments(comment.replies);
        }, 0);
    };

    const totalComments = countTotalComments(comments);

    return (
        <div className='shadow-xl p-4 rounded-lg '>
            <div className='flex items-center gap-2'>
                <div className='bg-red-500 w-12 h-12 rounded-full'></div>
                <div>
                    <p className='font-semibold'>{username}</p>
                    <p>{timePosted}</p>
                </div>
            </div>
            <div className='flex items-center mt-4 mb-2 gap-2'>
                <FaLocationDot />
                <span>{location}</span>
            </div>
            <div className='mb-4'>
                <p>{content}</p>
            </div>
            <div>
                <img className='rounded-md' src={imageSrc} alt="Post" />
            </div>
            <div className='cursor-pointer flex items-center justify-between text-xl mt-4 mb-4'>
                <div className='flex items-center gap-4'>
                    <FaRegHeart />
                    <div className='flex items-center gap-1' onClick={() => { setIsModalOpen(true) }}>
                        <FaRegComment />
                        <p className='text-sm font-semibold'>{totalComments}</p>
                    </div>
                </div>
                <FaRegBookmark />
            </div>
            <Modal
                title={<div className='text-center w-full'>Bình luận cho bài viết</div>}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                width={800}
                centered
                bodyStyle={{ maxHeight: '80vh', overflowY: 'auto' }}
            >
                <div className='shadow-xl pl-4 pr-4 rounded-lg '>
                    <div className='flex items-center gap-2'>
                        <div className='bg-red-500 w-12 h-12 rounded-full'></div>
                        <div>
                            <p className='font-semibold'>{username}</p>
                            <p>{timePosted}</p>
                        </div>
                    </div>
                    <div className='flex items-center mt-4 mb-2 gap-2'>
                        <FaLocationDot />
                        <span>{location}</span>
                    </div>
                    <div className='mb-4'>
                        <p>{content}</p>
                    </div>
                    <div>
                        <img className='rounded-md' src={imageSrc} alt="Post" />
                    </div>
                    <div className='cursor-pointer flex items-center justify-between text-xl mt-4 mb-4'>
                        <div className='flex items-center gap-4'>
                            <FaRegHeart />
                            <div className='flex items-center gap-1' onClick={() => { setIsModalOpen(true) }}>
                                <FaRegComment />
                                <p className='text-sm font-semibold'>{totalComments}</p>
                            </div>
                        </div>
                        <FaRegBookmark />
                    </div>
                    <ListComments comment={comments} />
                </div>
            </Modal>
        </div>
    );
};

export default PostCard;
