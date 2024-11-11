import React from 'react';
import { FaRegHeart } from 'react-icons/fa';
import { IoArrowRedo } from 'react-icons/io5';

interface CommentProps {
    id: string; 
    username: string;
    text: string;
    createdAt: Date;
    count: number;
    replies: CommentProps[];
    level?: number;
    onReplyClick?: (comment: CommentProps) => void; 
}

const CommentCard: React.FC<CommentProps> = ({ id, username, text, createdAt, count, replies, level = 0, onReplyClick }) => {
    const timeAgo = (createdAt: Date) => {
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - createdAt.getTime()) / 1000);

        const timeIntervals = [
            { label: 'y', seconds: 31536000 }, // 1 year
            { label: 'm', seconds: 2592000 },  // 1 month (30 days)
            { label: 'w', seconds: 604800 },   // 1 week (7 days)
            { label: 'd', seconds: 86400 },    // 1 day
            { label: 'h', seconds: 3600 },     // 1 hour
            { label: 'm', seconds: 60 },       // 1 minute
            { label: 's', seconds: 1 }         // 1 second
        ];

        for (let i = 0; i < timeIntervals.length; i++) {
            const interval = timeIntervals[i];
            const count = Math.floor(diffInSeconds / interval.seconds);
            if (count >= 1) {
                return `${count}${interval.label}`;
            }
        }

        return 'just now'; 
    };

    const marginRight = level === 0 ? '' : level === 1 ? 'ml-10' : 'ml-24';

    return (
        <div className='comment'>
            <div className={`mr-2 flex justify-between ${marginRight}`}>
                <div className='flex'>
                    {level === 0 ? "" : <IoArrowRedo className='text-red-500 inline' />}
                    <div className='flex gap-2 items-start w-full'>
                        <div className='bg-red-500 w-8 h-8 rounded-full'></div>
                        <div className='flex-1 '>
                            <div className='bg-red-200 pl-2 pr-2 rounded-lg mr-4'>
                                <p className='font-semibold inline'> {username}</p>
                                <p className='inline ml-2'>{timeAgo(createdAt)}</p>
                                <p className='break-all whitespace-normal overflow-hidden'>{text}</p>
                            </div>
                            <div className='cursor-pointer flex items-center gap-16 ml-2 mt-1 mb-2 text-[14px]'>
                                <div className='flex items-center gap-2'>
                                    <FaRegHeart />
                                    <p>{count}</p>
                                </div>
                                <p
                                    className='mr-4'
                                    onClick={() => onReplyClick && onReplyClick({ id, username, text, createdAt, count, replies })}
                                >
                                    Reply
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='cursor-pointer'>
                    <FaRegHeart />
                </div>
            </div>
            {replies && replies.length > 0 && (
                <div>
                    {replies.map((reply) => (
                        <CommentCard
                            key={reply.id} 
                            id={reply.id}
                            username={reply.username}
                            text={reply.text}
                            createdAt={reply.createdAt}
                            count={reply.count}
                            replies={reply.replies}
                            level={level + 1}
                            onReplyClick={onReplyClick} 
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export { CommentCard };
export type { CommentProps };
