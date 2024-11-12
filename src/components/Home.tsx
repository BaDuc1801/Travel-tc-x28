import React, { useEffect, useState } from 'react'
import PostList from './posts&comments/ListPosts.tsx'
import DestinationCard from './DestinationCard.tsx'
import axios from 'axios';
import { Carousel } from 'antd';

interface DestinationCardType {
    city: string;
    destiName: string;
    description: string;
    img: string;
}

const Home: React.FC = () => {
    const [desti, setDesti] = useState<DestinationCardType[]>([])
    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            const data = await axios.get("https://be-travel-tc-x28-1end.vercel.app/destinations");
            setDesti(data.data);
        }
        fetchData();
    }, [])

    return (
        <div>
            <div className="m-auto w-1/3 mt-8 bg-white p-4">
                <Carousel arrows infinite={false}
                    slidesToShow={4}
                    slidesToScroll={1}
                    dots={false}
                >
                    {desti.map((destination, index) => (
                        <DestinationCard
                            key={index}
                            city={destination.city}
                            name={destination.destiName}
                            description={destination.description}
                            image={destination.img}
                        />
                    ))}
                    {desti.map((destination, index) => (
                        <DestinationCard
                            key={index}
                            city={destination.city}
                            name={destination.destiName}
                            description={destination.description}
                            image={destination.img}
                        />
                    ))}
                </Carousel>
            </div>
            <PostList />
        </div>
    )
}

export default Home
