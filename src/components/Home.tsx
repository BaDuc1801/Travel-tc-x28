import React, { useEffect, useState } from 'react';
import PostList from './posts&comments/ListPosts.tsx';
import DestinationCard from './DestinationCard.tsx';
import axios from 'axios';
import { BsStars } from 'react-icons/bs';

const beUrl = import.meta.env.VITE_APP_BE_URL;

interface DestinationCardType {
    cityName: string;
    coordinates: number[];
    description: string;
    img: string;
    destinations: string[]
}

export interface IUser {
    id: string; // Tương ứng với _id của MongoDB
    name: string;
    email: string;
    password: string;
    profilePic: {
        profilePicture: string;
        bannerImage?: string; // Có thể không có giá trị
    };
    followers: string[]; // Danh sách ID của người theo dõi
    following: string[]; // Danh sách ID của người đang theo dõi
    posts: string[]; // Danh sách ID bài viết
    settings: {
        privateAccount: boolean;
        notifications: {
            email: boolean;
            push: boolean;
            sms: boolean;
        };
    };
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
}


const Home: React.FC = () => {
    const [desti, setDesti] = useState<DestinationCardType[]>([]);
    const [userData, setUserData] = useState<IUser | null>(null)

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            const data = await axios.get(`${beUrl}/cities`);
            setDesti(data.data);
            const id = localStorage.getItem("user");
            if (id) {
                const getId = JSON.parse(id)
                const user = await axios.get(`${beUrl}/user/${getId.id}`);
                setUserData(user.data);
            }
        };
        fetchData();
    }, []);
    console.log(userData)

    return (
        <div className="flex mt-8 mx-[200px] gap-10">
            {/* Phần bên trái */}
            <div className="w-1/4 bg-red-100 sticky top-[88px] h-full">
                <div>
                    <img className='rounded-full w-28 m-auto mt-8' src={userData?.profilePic.profilePicture} alt="avatar" />
                    <p className='text-center mt-4 text-xl font-semibold'>{userData?.name}</p>
                </div>
            </div>

            {/* Phần giữa */}
            <div className="flex-1 overflow-y-auto">
                <div className="m-auto bg-white p-4 ">
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
                <PostList />
            </div>

            {/* Phần bên phải */}
            <div className="w-1/4 bg-red-100 sticky top-[88px] h-full">
                <div>
                    <img className='rounded-full w-28 m-auto mt-8' src={userData?.profilePic.profilePicture} alt="avatar" />
                    <p className='text-center mt-4 text-xl font-semibold'>{userData?.name}</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
