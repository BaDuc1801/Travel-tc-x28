import { v4 as uuidv4 } from 'uuid';
import { CommentProps } from './posts&comments/CommentCard.tsx';
// import { PostProps } from './posts&comments/PostCard.tsx';
import testImg from '../assets/img/home.jpg';

const listcomment : CommentProps[] = [
    {
        id: uuidv4(),
        username: 'User1',
        text: 'This is the first comment.',
        createdAt: new Date('2024-11-05T14:30:00'),
        count: 3,
        replies: [
            {
                id: uuidv4(),
                username: 'User2',
                text: 'This is a reply to the first comment.',
                createdAt: new Date('2024-11-05T15:00:00'),
                count: 1,
                replies: [{
                    id: uuidv4(),
                    username: 'User7',
                    text: 'This is a reply to the first comment.',
                    createdAt: new Date('2024-11-05T19:00:00'),
                    count: 1,
                    replies: []
                }]
            }
        ]
    },
    {
        id: uuidv4(),
        username: 'User3',
        text: 'Second top-level comment here!',
        createdAt: new Date('2024-11-06T10:00:00'),
        count: 5,
        replies: []
    },
    {
        id: uuidv4(),
        username: 'User4',
        text: 'Another comment with a few replies.',
        createdAt: new Date('2024-11-06T11:30:00'),
        count: 2,
        replies: [
            {
                id: uuidv4(),
                username: 'User5',
                text: 'Replying to User4.',
                createdAt: new Date('2024-11-06T12:00:00'),
                count: 0,
                replies: []
            },
            {
                id: uuidv4(),
                username: 'User6',
                text: 'Another reply to User4.',
                createdAt: new Date('2024-11-06T12:30:00'),
                count: 1,
                replies: []
            }
        ]
    }
]

export {listcomment} ;
