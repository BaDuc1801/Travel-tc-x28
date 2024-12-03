import React, { useState } from 'react';
import { FaBookmark, FaHeart, FaLocationDot } from 'react-icons/fa6';
import { FaRegBookmark, FaRegComment, FaRegHeart } from 'react-icons/fa';
// import { CommentProps } from './CommentCard.tsx';
import { Modal } from 'antd';
// import ListComments from './ListComments.tsx';
import axios from 'axios';

interface PostProps {
    postId: string;
    content: string;
    privacy: 'private' | 'public';
    type: 'text' | 'image';
    author: {
        _id: string;
        name: string;
        profilePic: {
            profilePicture: string;
        };
    };
    emotion?: string;
    timestamp: string;
    location?: string;
    img?: string[];
}

const PostCard: React.FC<PostProps> = ({
    postId,
    author,
    location,
    timestamp,
    emotion,
    content,
    img
}) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    // const countTotalComments = (comments: CommentProps[]): number => {
    //     return comments.reduce((total, comment) => {
    //         return total + 1 + countTotalComments(comment.replies);
    //     }, 0);
    // };

    // const totalComments = countTotalComments(comments);

    const timeAgo = (timestamp: string): string => {
        const now = new Date();
        const postTime = new Date(timestamp);
        const difference = now.getTime() - postTime.getTime();
        const minutes = Math.floor(difference / (1000 * 60));
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const weeks = Math.floor(difference / (1000 * 60 * 60 * 24 * 7));
        const months = Math.floor(difference / (1000 * 60 * 60 * 24 * 30));
        const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365));

        if (minutes < 1) return "Vừa xong";
        if (minutes < 60) return `${minutes}m trước`;
        if (hours < 24) return `${hours}h trước`;
        if (days < 7) return `${days} ngày trước`;
        if (weeks < 4) return `${weeks} tuần trước`;
        if (months < 12) return `${months} tháng trước`;
        return `${years} năm trước`;
    };

    const [liked, setLiked] = useState<boolean>(false);
    const [saved, setSaved] = useState<boolean>(false);
    const beUrl = import.meta.env.VITE_APP_BE_URL;
    const user = JSON.parse(localStorage.getItem('user') as string);

    const toggleLike = async () => {
        try {
            setLiked(!liked);
            await axios.put(`${beUrl}/post/like`, { userId: user.id, postId });
        } catch (error) {
            console.error('Error liking post', error);
        }
    };
    const toggleSave = async () => {
        try {
            setSaved(!saved);
            await axios.put(`${beUrl}/post/bookmark`, { userId: user.id, postId });
        } catch (error) {
            console.error('Error bookmarking post', error);
        }
    };

    return (
        <div className='p-4 rounded-lg shadow-xl mt-2 bg-white'>
            <div className='flex items-center gap-2'>
                <img className='w-12 h-12 rounded-full' src={author?.profilePic?.profilePicture}></img>
                <div>
                    <div className='flex items-center gap-2'>
                        <p className='font-semibold'>{author.name}</p>
                        <p>{emotion}</p>
                    </div>
                    <p>{timeAgo(timestamp)}</p>
                </div>
            </div>
            {location ? <div className='flex items-center mt-4 mb-2 gap-2'>
                <FaLocationDot />
                <span>{location}</span>
            </div> : <div className='mt-2'></div>}
            <div className='mb-4'>
                <p>{content}</p>
            </div>
            <div>
                {img && Array.isArray(img) && img.length > 1 ? (
                    <div className="overflow-x-auto flex space-x-2 w-full">
                        {img.map((image, index) => (
                            <img key={index} className="rounded-md mb-2" src={image} alt="Post" />
                        ))}
                    </div>
                ) : (
                    img && <img className="rounded-md" src={img[0]} alt="Post" />
                )}
            </div>
            <div className='cursor-pointer flex items-center justify-between text-xl mt-4 mb-4'>
                <div className='flex items-center gap-4'>
                    <div onClick={toggleLike}>
                        {liked ? (
                            <FaHeart className="text-red-500" />
                        ) : (
                            <FaRegHeart className="" />
                        )}
                    </div>
                    <div className='flex items-center gap-1' onClick={() => { setIsModalOpen(true) }}>
                        <FaRegComment />
                        {/* <p className='text-sm font-semibold'>{totalComments}</p> */}
                    </div>
                </div>
                <div onClick={toggleSave}>
                    {saved ? (
                        <FaBookmark className="text-yellow-500" />
                    ) : (
                        <FaRegBookmark className="text-black" />
                    )}
                </div>
            </div>
            <Modal
                title={<div className='text-center w-full'>Bình luận cho bài viết</div>}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                width={800}
                centered
                style={{ maxHeight: '80vh', overflowY: 'auto' }}
            >
                <div className='shadow-xl pl-4 pr-4 rounded-lg pb-4'>
                    <div className='flex items-center gap-2'>
                        <img className='w-12 h-12 rounded-full' src={author?.profilePic?.profilePicture}></img>
                        <div>
                            <div className='flex items-center gap-2'>
                                <p className='font-semibold'>{author.name}</p>
                                <p>{emotion}</p>
                            </div>
                            <p>{timeAgo(timestamp)}</p>
                        </div>
                    </div>
                    {location ? <div className='flex items-center mt-4 mb-2 gap-2'>
                        <FaLocationDot />
                        <span>{location}</span>
                    </div> : <div className='mt-2'></div>}
                    <div className='mb-4'>
                        <p>{content}</p>
                    </div>
                    <div>
                        {img && Array.isArray(img) && img.length > 1 ? (
                            <div className="overflow-x-auto flex space-x-2 w-full">
                                {img.map((image, index) => (
                                    <img key={index} className="rounded-md mb-2" src={image} alt="Post" />
                                ))}
                            </div>
                        ) : (
                            img && <img className="rounded-md" src={img[0]} alt="Post" />
                        )}
                    </div>
                    <div className='cursor-pointer flex items-center justify-between text-xl mt-4 mb-4'>
                        <div className='flex items-center gap-4'>
                            <div onClick={toggleLike}>
                                {liked ? (
                                    <FaHeart className="text-red-500" />
                                ) : (
                                    <FaRegHeart className="" />
                                )}
                            </div>                            <div className='flex items-center gap-1' onClick={() => { setIsModalOpen(true) }}>
                                <FaRegComment />
                                {/* <p className='text-sm font-semibold'>{totalComments}</p> */}
                            </div>
                        </div>
                        <div onClick={toggleSave}>
                            {saved ? (
                                <FaBookmark className="text-yellow-500" />
                            ) : (
                                <FaRegBookmark className="text-black" />
                            )}
                        </div>
                    </div>
                    {/* <ListComments comment={comments} /> */}
                </div>
            </Modal>
        </div>
    );
};

export default PostCard;
