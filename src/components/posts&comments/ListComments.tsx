import React, { useEffect, useState } from 'react';
import { IoIosSend } from 'react-icons/io';
import { CommentCard, CommentProps } from './CommentCard.tsx';
import { IUser, PostProps } from '../Home.tsx';
import axios from 'axios';

interface ListCommentsProps {
    comment: CommentProps[];
    postId: string;
    setListPost: React.Dispatch<React.SetStateAction<PostProps[]>>;
}

const ListComments: React.FC<ListCommentsProps> = ({ comment, postId, setListPost }) => {
    const [comments, setComments] = useState<CommentProps[]>(comment);
    const [newComment, setNewComment] = useState<string>('');
    const [replyingTo, setReplyingTo] = useState<CommentProps | null>(null);
    const [userData, setUserData] = useState<IUser | null>(null);

    const beUrl = import.meta.env.VITE_APP_BE_URL;

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            const ID = localStorage.getItem("user");
            if (ID) {
                const getId = JSON.parse(ID);
                try {
                    const user = await axios.get(`${beUrl}/user/${getId.id}`);
                    setUserData(user.data);
                } catch (error) {
                    console.error('Failed to fetch user data:', error);
                }
            }
        };
        fetchData();
    }, []);

    const fetchComments = async () => {
        try {
            const response = await axios.get(`${beUrl}/post/${postId}`);
            const res = await axios.get(`${beUrl}/post`)
            setComments(response.data.comments);
            setListPost(res.data)
        } catch (error) {
            console.error('Failed to fetch comments:', error);
        }
    };

    const handleAddComment = async () => {
        if (newComment.trim() && userData) {
            try {
                if (replyingTo) {
                    await axios.put(`${beUrl}/comments/rep`, {
                        commentId: replyingTo._id,
                        content: newComment,
                        userId: userData._id,
                    });
                } else {
                    await axios.put(`${beUrl}/post/cmt`, {
                        postId: postId,
                        content: newComment,
                        userId: userData._id,
                    });
                }
                setNewComment('');
                setReplyingTo(null);
                fetchComments();
            } catch (error) {
                console.error('Failed to add comment:', error);
            }
        }
    };

    const handleReplyClick = (comment: CommentProps) => {
        setReplyingTo(comment);
    };

    return (
        <div className="flex flex-col">
            <div className="flex-grow ml-2 mr-2">
                {comments.map((comment) => (
                    <div className="w-full" key={comment._id}>
                        <CommentCard
                            _id={comment._id}
                            author={comment.author}
                            content={comment.content}
                            timestamp={comment.timestamp}
                            count={comment.count}
                            replies={comment.replies}
                            level={0}
                            onReplyClick={handleReplyClick}
                        />
                    </div>
                ))}
            </div>
            <div className="border-t pt-2 bg-white sticky bottom-0">
                {replyingTo && (
                    <div className="ml-16 text-sm text-gray-600 flex items-center gap-2">
                        Replying to {<p className='text-black font-semibold'>{replyingTo?.author?.name}</p>}
                        <button
                            className="text-red-500 ml-2 cursor-pointer"
                            onClick={() => setReplyingTo(null)}
                        >
                            Cancel
                        </button>
                    </div>
                )}
                <div className="flex gap-4 items-start p-2">
                <img className="bg-red-500 w-8 h-8 rounded-full" src={userData?.profilePic?.profilePicture}></img>
                <div className="flex items-center flex-grow">
                        <textarea
                            rows={1}
                            placeholder="Write your comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            onInput={(e) => {
                                const target = e.target as HTMLTextAreaElement;
                                target.style.height = 'auto';
                                target.style.height = `${target.scrollHeight}px`;
                            }}
                            className="bg-gray-200 flex-grow rounded-md outline-none pl-4 pr-4 resize-none pt-2 pb-2"
                        />
                        <IoIosSend
                            className="text-red-500 ml-2 text-2xl self-end mb-2 cursor-pointer"
                            onClick={handleAddComment}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListComments;
