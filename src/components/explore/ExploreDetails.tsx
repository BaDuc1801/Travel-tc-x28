import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
// import { FaSearch } from 'react-icons/fa';
import { GrLocation } from 'react-icons/gr';
import { IoLocationSharp } from 'react-icons/io5';
import { Select } from 'antd';
import PostList from '../posts&comments/ListPosts';
import { IoMdReturnLeft } from 'react-icons/io';
import { PostProps } from '../Home';

const beUrl = import.meta.env.VITE_APP_BE_URL;

interface CityType {
    cityName: string;
    coordinates: [number, number];
    description: string;
    img: string;
    destinations: {
        destiName: string;
        description: string;
        img: string;
        city: string;
        coordinates: [number, number];
    }[]
}

const SetMapCenter: React.FC<{ center: [number, number] }> = ({ center }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(center);
    }, [center, map]);
    return null;
};

const normalizeString = (str: string) => {
    return str
        .normalize('NFD') // Tách ký tự tổ hợp (ví dụ: "ấ" => "a" + "̂")
        .replace(/[\u0300-\u036f]/g, '') // Loại bỏ dấu tổ hợp
        .toLowerCase(); // Chuyển về chữ thường
};

const ExploreDetails: React.FC = () => {
    const { cityName } = useParams<{ cityName: string }>();
    const [city, setCity] = useState<CityType | null>(null);
    const navigate = useNavigate();
    const [listCity, setListCity] = useState<CityType[]>([]);
    const [coor, setCoor] = useState<[number, number]>([21.028182541862833, 105.83370094459077]);
    const [selectedDestination, setSelectedDestination] = useState<CityType['destinations'][0] | null>(null);
    const [isDetailVisible, setIsDetailVisible] = useState<boolean>(false);
    const [listPost, setListPost] = useState<PostProps[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const selected = await axios.get(`${beUrl}/cities/infor/${cityName}`);
                const list = await axios.get(`${beUrl}/cities`);
                const response = await axios.get(`${beUrl}/post`);
                setListPost(response.data);
                setCity(selected.data);
                setListCity(list.data);
                setCoor(selected.data.coordinates);
            } catch (error) {
                console.error("Failed to fetch city data", error);
            }
        };
        fetchData();
    }, [cityName]);
    const handleSearchClick = (value: string) => {
        const selectedCity = listCity.find(city => city.cityName === value);
        if (selectedCity) {
            setCoor(selectedCity.coordinates);
        }
        navigate(`/explore/${value}`);
        setIsDetailVisible(false);
    };


    const handleCloseDetail = () => {
        setIsDetailVisible(false);
    };

    return (
        <div className='flex h-[calc(100vh-56px)]'>
            <div className='w-1/3 overflow-y-auto'>
                <div className='relative h-[50%]'>
                    <img src={city?.img} alt="city image" className='h-full object-cover' />
                    <div className='absolute top-[20px] text-center w-full h-56'>
                        <div className="flex justify-center items-center w-full">
                            <Select
                                className='w-[80%] h-10'
                                showSearch
                                placeholder={<span className='text-white'>{cityName}</span>}
                                optionFilterProp="label"
                                onChange={handleSearchClick}
                                filterOption={(inputValue, option) => {
                                    const normalizedInput = normalizeString(inputValue || '');
                                    const normalizedOption = normalizeString(option?.label || '');
                                    return normalizedOption.includes(normalizedInput);
                                }}
                                options={listCity.map((city) => (
                                    { value: city.cityName, label: city.cityName }
                                ))}
                            />
                        </div>
                    </div>
                </div>
                <div className='mx-8 my-4 bg-red-100 p-4 rounded-lg'>
                    <p className='font-bold text-lg'>Thành phố {city ? city.cityName : "Loading..."}</p>
                    <p className='flex items-center gap-2'><GrLocation />Việt Nam</p>
                    <p className='font-bold text-lg mt-4'>Tổng quan </p>
                    <p>{city ? city.description : "Đang tải thông tin thành phố..."}</p>
                </div>
                <div className='m-4 mx-8'>
                    <p className='font-bold text-lg'>Một số địa điểm đề xuất</p>
                </div>
                <div>
                    {!city ? "" :
                        city.destinations.map((destination, index) => (
                            <div key={index} className="flex mx-8 h-[150px] bg-white rounded-md overflow-hidden mb-8">
                                <div className='w-1/2 mr-2'>
                                    <img src={destination.img} className='h-full w-full rounded-md ' />
                                </div>
                                <div className='w-1/2 p-2 flex flex-col justify-between'>
                                    <div>
                                        <p className='text-xl font-semibold'>{destination.destiName}</p>
                                        <p className='flex items-center gap-1'><IoLocationSharp className='text-red-500' /> {destination.city}</p>
                                    </div>
                                    <button
                                        className='bg-red-500 self-end px-3 py-2 rounded-lg text-white font-medium hover:bg-red-600'
                                        onClick={() => {
                                            setCoor(destination.coordinates);
                                            setSelectedDestination(destination);
                                            setIsDetailVisible(true);
                                        }}
                                    >
                                        Chi tiết
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            {isDetailVisible && (
                <div className='w-1/4 overflow-y-auto bg-white p-4'>
                    <button
                        onClick={handleCloseDetail}
                        className='text-3xl text-red-500'
                    >
                        <IoMdReturnLeft />
                    </button>
                    <div>
                        <h2 className='text-xl font-bold my-4'>{selectedDestination?.destiName}</h2>
                        <p>{selectedDestination?.description}</p>
                    </div>
                    <p className='text-xl font-bold my-4'>Một số bài viết liên quan</p>
                    <PostList listPost={listPost} setListPost={setListPost}/>
                </div>
            )}
            {/* Phần bên trái: Bản đồ */}
            <div className='flex-grow'>
                <MapContainer
                    center={coor}
                    zoom={13}
                    minZoom={13}
                    scrollWheelZoom={false}
                    style={{ height: '100%', width: '100%' }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <SetMapCenter center={coor} />
                    {city && (
                        <Marker position={coor}>
                            <Popup>
                                {city.cityName}<br /> {city.description}
                            </Popup>
                        </Marker>
                    )}
                </MapContainer>
            </div>

            {/* Phần bên phải: Chi tiết địa điểm (chỉ hiện khi isDetailVisible = true) */}

        </div>
    );
};

export default ExploreDetails;