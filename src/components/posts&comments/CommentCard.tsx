import React from 'react';
import { FaRegHeart } from 'react-icons/fa';
import { IoArrowRedo } from 'react-icons/io5';

interface CommentProps {
    _id: string;
    author: {
        _id: string;
        name: string;
        profilePic: {
            profilePicture: string;
            bannerImage?: string;
        };
    };
    content: string;
    timestamp: Date; 
    count: number;
    replies: CommentProps[];
    level?: number;
    
    onReplyClick?: (comment: CommentProps) => void;
}

const CommentCard: React.FC<CommentProps> = ({
    _id,
    author,
    content,
    timestamp,
    count,
    replies,
    level = 0,
    onReplyClick
}) => {
    const timeAgo = (timestamp: Date | string) => {
        if (!timestamp) return 'just now'; 
    
        const date = new Date(timestamp);
    
        if (isNaN(date.getTime())) {
            return 'invalid date';
        }
    
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
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
        <div className="comment">
            <div className={`mr-2 flex justify-between ${marginRight}`}>
                <div className="flex">
                    {level === 0 ? "" : <IoArrowRedo className="content-red-500 inline" />}
                    <div className="flex gap-2 items-start w-full">
                        <div className="bg-red-500 w-8 h-8 rounded-full"></div>
                        <div className="flex-1">
                            <div className="bg-red-200 pl-2 pr-2 rounded-lg mr-4">
                                <p className="font-semibold inline"> {author?.name}</p>
                                <p className="inline ml-2">{timeAgo(timestamp)}</p>
                                <p className="break-all whitespace-normal overflow-hidden">{content}</p>
                            </div>
                            <div className="cursor-pointer flex items-center gap-16 ml-2 mt-1 mb-2 content-[14px]">
                                <div className="flex items-center gap-2">
                                    <FaRegHeart />
                                    <p>{count}</p>
                                </div>
                                <p
                                    className="mr-4"
                                    onClick={() =>
                                        onReplyClick &&
                                        onReplyClick({ _id, author, content, timestamp, count, replies })
                                    }
                                >
                                    Reply
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="cursor-pointer">
                    <FaRegHeart />
                </div>
            </div>
            {replies && replies.length >= 0 && (
                <div>
                    {replies.map((reply) => (
                        <CommentCard
                            key={reply._id}
                            _id={reply._id}
                            author={reply.author}
                            content={reply.content}
                            timestamp={reply.timestamp} 
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
