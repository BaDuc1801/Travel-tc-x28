import React, { useEffect, useState } from 'react';
import { FaBookmark, FaHeart, FaLocationDot } from 'react-icons/fa6';
import { FaRegBookmark, FaRegComment, FaRegHeart } from 'react-icons/fa';
import { Modal } from 'antd';
import ListComments from './ListComments.tsx';
import axios from 'axios';
import { PostProps } from '../Home.tsx';

// PostCardProps to match the props passed to PostCard component
interface PostCardProps {
    items: PostProps;
    setListPost: React.Dispatch<React.SetStateAction<PostProps[]>>; // Function to update the posts
}

const PostCard: React.FC<PostCardProps> = (props) => {
    const { items, setListPost } = props;
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
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

    useEffect(() => {
        const fetchPostStatus = async () => {
            try {
                const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]'); // Replace with API call if needed
                const bookmarkPosts = JSON.parse(localStorage.getItem('bookmarkedPosts') || '[]'); // Replace with API call if needed

                setLiked(likedPosts.includes(items._id));
                setSaved(bookmarkPosts.includes(items._id));
            } catch (error) {
                console.error('Error fetching post status', error);
            }
        };

        fetchPostStatus();
    }, [items._id]);

    const toggleLike = async () => {
        try {
            setLiked(!liked);
            await axios.put(`${beUrl}/post/like`, { userId: user.id, postId: items._id });
            updateLikedPosts();
        } catch (error) {
            console.error('Error liking post', error);
        }
    };
    const toggleSave = async () => {
        try {
            setSaved(!saved);
            await axios.put(`${beUrl}/post/bookmark`, { userId: user.id, postId: items._id });
            updateBookmarkPosts();
        } catch (error) {
            console.error('Error bookmarking post', error);
        }
    };

    const updateLikedPosts = () => {
        let likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
        if (liked) {
            likedPosts = likedPosts.filter((id: string) => id !== items._id); // Remove if already liked
        } else {
            likedPosts.push(items._id); // Add to liked posts
        }
        localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
    };

    // Update the localStorage or backend for bookmarked posts
    const updateBookmarkPosts = () => {
        let bookmarkPosts = JSON.parse(localStorage.getItem('bookmarkPosts') || '[]');
        if (saved) {
            bookmarkPosts = bookmarkPosts.filter((id: string) => id !== items._id); // Remove if already saved
        } else {
            bookmarkPosts.push(items._id); // Add to bookmarked posts
        }
        localStorage.setItem('bookmarkedPosts', JSON.stringify(bookmarkPosts));
    };

    return (
        <div className='p-4 rounded-lg shadow-xl mt-2 bg-white'>
            <div className='flex items-center gap-2'>
                <img className='w-12 h-12 rounded-full' src={items?.author?.profilePic?.profilePicture}></img>
                <div>
                    <div className='flex items-center gap-2'>
                        <p className='font-semibold'>{items?.author?.name}</p>
                        <p>{items.emotion}</p>
                    </div>
                    <p>{timeAgo(items.timestamp)}</p>
                </div>
            </div>
            {items?.location ? <div className='flex items-center mt-4 mb-2 gap-2'>
                <FaLocationDot />
                <span>{items.location}</span>
            </div> : <div className='mt-2'></div>}
            <div className='mb-4'>
                <p>{items.content}</p>
            </div>
            <div>
                {items.img && Array.isArray(items.img) && items.img.length > 1 ? (
                    <div className="overflow-x-auto flex space-x-2 w-full">
                        {items.img?.map((image, index) => (
                            <img key={index} className="rounded-md mb-2" src={image} alt={`Post image ${index + 1}`}></img>
                        ))}
                    </div>
                ) : (
                    items.img && <img className="rounded-md w-full" src={items.img[0]} alt="Post" />
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
                        <p className='text-sm font-semibold'>
                            {Array.isArray(items?.comments) ? items.comments?.length : 0}
                        </p>
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
                <div className='shadow-xl pl-4 pr-4 rounded-lg pb-4 w-full'>
                    <div className='flex items-center gap-2'>
                        <img className='w-12 h-12 rounded-full' src={items?.author?.profilePic?.profilePicture}></img>
                        <div>
                            <div className='flex items-center gap-2'>
                                <p className='font-semibold'>{items?.author?.name}</p>
                                <p>{items.emotion}</p>
                            </div>
                            <p>{timeAgo(items.timestamp)}</p>
                        </div>
                    </div>
                    {items?.location ? <div className='flex items-center mt-4 mb-2 gap-2'>
                        <FaLocationDot />
                        <span>{items.location}</span>
                    </div> : <div className='mt-2'></div>}
                    <div className='mb-4'>
                        <p>{items.content}</p>
                    </div>
                    <div>
                        {items.img && Array.isArray(items.img) && items.img.length > 1 ? (
                            <div className="overflow-x-auto flex space-x-2 w-full">
                                {items.img?.map((image, index) => (
                                    <img key={index} className="rounded-md mb-2" src={image} alt={`Post image ${index + 1}`}></img>
                                ))}
                            </div>
                        ) : (
                            items.img && <img className="rounded-md w-full" src={items.img[0]} alt="Post" />
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
                                <p className='text-sm font-semibold'>
                                    {items?.comments && Array.isArray(items.comments) ? items.comments.length : 0}
                                </p>
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
                    {items.comments && <ListComments comment={items.comments} postId={items._id} setListPost={setListPost} />}
                </div>
            </Modal>
        </div>
    );
};

export default PostCard;
