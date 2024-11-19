import React, { useEffect, useState } from 'react';
import PostList from './posts&comments/ListPosts.tsx';
import DestinationCard from './DestinationCard.tsx';
import axios from 'axios';
import { BsStars } from 'react-icons/bs';

interface DestinationCardType {
    cityName: string;
    coordinates: number[];
    description: string;
    img: string;
    destinations: string[]
}

const Home: React.FC = () => {
    const [desti, setDesti] = useState<DestinationCardType[]>([]);

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            const data = await axios.get("https://be-travel-tc-x28-1end.vercel.app/cities");
            setDesti(data.data);
        };
        fetchData();
    }, []);

    return (
        <div>
            <div className="m-auto mt-8 bg-white p-4">
                <div className='flex items-center gap-2 pl-2 mb-2 text-9 font-semibold'>
                    <p>Khám phá những địa điểm nổi bật </p>
                    <BsStars className='text-yellow-400' />
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
    );
}

export default Home;
