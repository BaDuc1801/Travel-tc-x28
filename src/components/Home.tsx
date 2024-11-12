import React, { useEffect, useState } from 'react';
import PostList from './posts&comments/ListPosts.tsx';
import DestinationCard from './DestinationCard.tsx';
import axios from 'axios';
import { SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation } from 'swiper/modules';
// ... existing imports ...
import { Swiper } from 'swiper/react'; // Sửa import này
import 'swiper/css'; // Thêm CSS cơ bản
import 'swiper/css/free-mode'; // Thêm CSS cho free-mode
import 'swiper/css/navigation';

interface DestinationCardType {
    city: string;
    destiName: string;
    description: string;
    img: string;
}

const Home: React.FC = () => {
    const [desti, setDesti] = useState<DestinationCardType[]>([]);

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            const data = await axios.get("https://be-travel-tc-x28-1end.vercel.app/destinations");
            setDesti(data.data);
        };
        fetchData();
    }, []);

    return (
        <div>
            <div className="m-auto w-[45%] mt-8 bg-white p-4">
                <Swiper
                    slidesPerView={4.5}
                    spaceBetween={5}
                    freeMode={true}
                    navigation={true} 
                    modules={[FreeMode, Navigation]}
                >
                    {desti.map((destination, index) => (
                        <SwiperSlide key={index}>
                            <DestinationCard
                                city={destination.city}
                                name={destination.destiName}
                                description={destination.description}
                                image={destination.img}
                            />
                        </SwiperSlide>
                    ))}
                    {desti.map((destination, index) => (
                        <SwiperSlide key={index}>
                            <DestinationCard
                                city={destination.city}
                                name={destination.destiName}
                                description={destination.description}
                                image={destination.img}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <PostList />
        </div>
    );
}

export default Home;
