import React, { useState } from 'react';
import { IoIosSend } from 'react-icons/io';
import { CommentCard, CommentProps } from './CommentCard.tsx';
import { v4 as uuidv4 } from 'uuid';

interface ListCommentsProps {
    comment: CommentProps[];
}

const ListComments: React.FC<ListCommentsProps> = ({comment}) => {
    const [comments, setComments] = useState<CommentProps[]>(comment);
    const [newComment, setNewComment] = useState<string>('');
    const [replyingTo, setReplyingTo] = useState<CommentProps | null>(null);

    const handleAddComment = () => {
        if (newComment.trim()) {
            const newCommentObj: CommentProps = {
                id: uuidv4(),
                username: 'CurrentUser',
                text: newComment,
                createdAt: new Date(),
                count: 0,
                replies: [],
            };

            if (replyingTo) {
                const updatedComments = comments.map(comment => {
                    return updateRepliesForComment(comment, replyingTo.id, newCommentObj);
                });
                setComments(updatedComments);
                setReplyingTo(null);
            } else {
                setComments([newCommentObj, ...comments]);
            }

            setNewComment('');
        }
    };

    const updateRepliesForComment = (comment: CommentProps, targetId: string, newComment: CommentProps): CommentProps => {
        if (comment.id === targetId) {
            return {
                ...comment,
                replies: [newComment, ...comment.replies]
            };
        }

        return {
            ...comment,
            replies: comment.replies.map(reply => updateRepliesForComment(reply, targetId, newComment))
        };
    };

    const handleReplyClick = (comment: CommentProps) => {
        setReplyingTo(comment);
    };

    return (
        <div className="flex flex-col">
            <div className="flex-grow ml-2 mr-2">
                {comments.map((comment) => (
                    <div key={comment.id} className="w-full">
                        <CommentCard
                            id={comment.id}
                            username={comment.username}
                            text={comment.text}
                            createdAt={comment.createdAt}
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
                    <div className="ml-16 text-sm text-gray-600">
                        Replying to {replyingTo.username}
                        <button
                            className="text-red-500 ml-2 cursor-pointer"
                            onClick={() => setReplyingTo(null)}
                        >
                            Cancel
                        </button>
                    </div>
                )}
                <div className="flex gap-4 items-start p-2">
                    <div className="bg-red-500 w-8 h-8 rounded-full mt-1"></div>
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
