import React, { useEffect, useState } from 'react';
import axios from 'axios';
import avt from "../assets/img/home.jpg";

const ListFollowing: React.FC = () => {
    const [following, setFollowing] = useState<any[]>([]);
    const beUrl = import.meta.env.VITE_APP_BE_URL;

    useEffect(() => {
        const fetchData = async () => {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            const data = await axios.get(`${beUrl}/user/following/${user.id}`)
            setFollowing(data.data.following);
        }
        fetchData()
    }, []);

    return (
        <div className="ml-4">
            {following.length === 0 ? (
                <p>Bạn chưa theo dõi người dùng nào</p>
            ) : (
                following.map((follower) => (
                    <div key={follower._id} className="flex items-center gap-2 mt-4 cursor-pointer">
                        <img src={follower.profilePic.profilePicture || avt} className="rounded-full w-10 h-10" alt={follower.name} />
                        <p>{follower.name}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default ListFollowing;
