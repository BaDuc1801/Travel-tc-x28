import React, { useEffect, useState } from 'react';
import PostList from './posts&comments/ListPosts.tsx';
import DestinationCard from './DestinationCard.tsx';
import axios from 'axios';
import { BsFilePostFill, BsStars } from 'react-icons/bs';
import { FaHandHoldingHeart } from 'react-icons/fa6';
import { BiSolidCommentDetail } from 'react-icons/bi';
import { RiUserFollowFill } from 'react-icons/ri';
import { Menu, MenuProps } from 'antd';
import ListFollower from './ListFollower.tsx';
import PostCreator from './postcreat/PostCreator.tsx';
import { CommentProps } from './posts&comments/CommentCard.tsx';
// import ChatApp from './chat.tsx';

const beUrl = import.meta.env.VITE_APP_BE_URL;

interface DestinationCardType {
    cityName: string;
    coordinates: number[];
    description: string;
    img: string;
    destinations: string[]
}

export interface IUser {
    _id: string;
    name: string;
    email: string;
    password: string;
    profilePic: {
        profilePicture: string;
        bannerImage?: string;
    };
    followers: string[];
    following: string[];
    posts: string[];
    settings: {
        privateAccount: boolean;
        notifications: {
            email: boolean;
            push: boolean;
            sms: boolean;
        };
    };
    likedPosts: string[];
    bookmarkedPosts: string[];
    likedComments: string[];
    createdAt: string;
    updatedAt: string;
}


type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        key: 'sub1',
        label: 'Hồ sơ cá nhân',
        // icon: <MailOutlined />,
    },
    {
        key: 'sub2',
        label: 'Bài viết',
        // icon: <AppstoreOutlined />,
    },
    {
        key: 'sub3',
        label: 'Người theo dõi',
        // icon: <SettingOutlined />,
    },
    {
        key: 'sub4',
        label: 'Thư viện',
    },
];

interface Author {
    _id: string;
    name: string;
    profilePic: {
        profilePicture: string;
    };
}

interface Comment {
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
}

export interface PostProps {
    _id: string;
    content: string;
    privacy: 'private' | 'public';
    type: 'text' | 'image';
    author: Author;
    emotion?: string;
    timestamp: string;
    location?: string;
    img?: string[];
    comments?: Comment[];
}

const Home: React.FC = () => {
    const [desti, setDesti] = useState<DestinationCardType[]>([]);
    const [userData, setUserData] = useState<IUser | null>(null)
    const [listPost, setListPost] = useState<PostProps[]>([]);

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            const data = await axios.get(`${beUrl}/cities`);
            setDesti(data.data);
            const id = localStorage.getItem("user");
            const response = await axios.get(`${beUrl}/post`);
            setListPost(response.data);
            if (id) {
                const getId = JSON.parse(id)
                const user = await axios.get(`${beUrl}/user/${getId.id}`);
                setUserData(user.data);
            }
        };
        fetchData();
    }, []);

    const countComments = () => {
        const countReplies = (comments: CommentProps[]): number => {
            return comments.reduce((total, comment) => {
                const isMyComment = comment.author.name === userData?.name;
                return total + (isMyComment ? 1 : 0) + countReplies(comment.replies);
            }, 0);
        };
    
        return listPost.reduce((total, post) => total + (post.comments ? countReplies(post.comments) : 0), 0);
    };

    return (
        <div className="flex mt-8 mx-[10%] gap-8">
            {/* Phần bên trái */}
            <div className="w-1/4 sticky top-[88px] rounded-lg overflow-hidden h-[calc(100vh-88px)] bg-white">
                <div className='bg-gradient-to-b from-red-300 to-red-100 pt-8'>
                    <img className='rounded-full w-28 m-auto' src={userData?.profilePic?.profilePicture || "https://res.cloudinary.com/dzpw9bihb/image/upload/v1726676632/wgbdsrflw8b1vdalkqht.jpg"} />
                    <p className='text-center mt-4 text-xl font-semibold pb-2'>{userData?.name}</p>
                </div>
                <div className='grid grid-cols-2 grid-rows-2 bg-white p-4'>
                    <div className='flex items-center gap-2 text-red-500'><p className='rounded-full bg-pink-100 w-10 h-10 flex items-center justify-center'><FaHandHoldingHeart /></p><div className='flex flex-col'><p>Cảm xúc</p><p className='text-black'>{userData?.likedPosts.length || 0}</p></div></div>
                    <div className='flex items-center gap-2 text-green-500'><p className='rounded-full bg-green-100 w-10 h-10 flex items-center justify-center'><BiSolidCommentDetail /></p><div className='flex flex-col'><p>Bình luận</p><p className='text-black'>{countComments()}</p></div></div>
                    <div className='flex items-center gap-2 text-blue-500 '><p className='rounded-full bg-blue-100 w-10 h-10 flex items-center justify-center'><BsFilePostFill /></p><div className='flex flex-col'><p>Bài đăng</p><p className='text-black'>{userData?.posts.length || 0}</p></div></div>
                    <div className='flex items-center gap-2 text-purple-500 '><p className='rounded-full bg-purple-100 w-10 h-10 flex items-center justify-center'><RiUserFollowFill /></p><div className='flex flex-col'><p>Theo dõi</p><p className='text-black'>{userData?.following.length || 0}</p></div></div>
                </div>
                <div className='mt-2'>
                    <Menu
                        // onClick={onClick}
                        style={{ width: '100%' }}
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                        items={items}
                    />
                </div>
            </div>

            {/* Phần giữa */}
            <div className="flex-1 overflow-y-auto">
                <div className="m-auto bg-white p-4 rounded-lg">
                    <div className="flex items-center gap-2 pl-2 mb-2 text-lg font-semibold">
                        <p>Khám phá những địa điểm nổi bật </p>
                        <BsStars className="text-yellow-400" />
                    </div>
                    <div className="scroll-container flex overflow-x-auto whitespace-nowrap gap-2 p-4 snap-x snap-mandatory">
                        {desti.map((destination, index) => (
                            <div key={index} className="snap-start">
                                <DestinationCard
                                    cityName={destination.cityName}
                                    img={destination.img}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <PostCreator setListPost={setListPost}/>
                <PostList listPost={listPost} setListPost={setListPost} />
            </div>

            {/* Phần bên phải */}
            <div className="w-1/4 bg-white sticky top-[88px] rounded-lg p-4 h-[calc(100vh-88px)]">
                <p className='font-semibold'>Danh sách người đang theo dõi</p>
                <ListFollower />
            </div>

            {/* <div className='fixed bottom-0 right-[200px]'>
                <ChatApp />
            </div>   */}
        </div>
    );
};

export default Home;
