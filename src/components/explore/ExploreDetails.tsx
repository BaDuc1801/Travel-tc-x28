import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FaSearch } from 'react-icons/fa';
import { GrLocation } from 'react-icons/gr';

const beUrl = import.meta.env.VITE_APP_BE_URL;

interface CityType {
    cityName: string;
    coordinates: [number, number];
    description: string;
    img: string;
    destinations: {
        destiName: string;
        description: string;
    }[]
}

const SetMapCenter: React.FC<{ center: [number, number] }> = ({ center }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(center);
    }, [center, map]);
    return null;
};

const ExploreDetails: React.FC = () => {
    const { cityName } = useParams<{ cityName: string }>();
    const [city, setCity] = useState<CityType | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const selected = await axios.get(`${beUrl}/cities/infor/${cityName}`);
                setCity(selected.data);
            } catch (error) {
                console.error("Failed to fetch city data", error);
            }
        };
        fetchData();
    }, [cityName]);

    const defaultCenter: [number, number] = [21.028182541862833, 105.83370094459077];
    const mapCenter = city?.coordinates || defaultCenter;

    return (
        <div className='flex h-[calc(100vh-56px) scroll-container'>
            <div className='w-1/3 overflow-y-auto'>
                <div className='relative h-[50%]'>
                    <img src={city?.img} alt="city image" className='h-full object-cover' />
                    <div className='absolute top-[20px] text-center w-full h-56'>
                        <div className="flex justify-center items-center w-full">
                            <input
                                type="text"
                                placeholder={cityName}
                                className="bg-[rgba(0,0,0,0.3)] placeholder:text-white border-2 text-white px-4 py-2 rounded-tl-lg rounded-bl-lg focus:outline-none w-[65%]"
                            />
                            <button className='bg-[rgba(0,0,0,0.3)] border-t-2 border-b-2 border-r-2 text-white px-4 py-3 rounded-tr-lg rounded-br-lg focus:outline-none'>
                                <FaSearch />
                            </button>
                        </div>
                    </div>
                </div>
                <div className='mx-8 my-4 bg-red-100 p-4 rounded-lg'>
                    <p className='font-bold text-lg'>Thành phố {city ? city.cityName : "Loading..."}</p>
                    <p className='flex items-center gap-2'><GrLocation />Việt Nam</p>
                    <p className='font-bold text-lg mt-4'>Tổng quan </p>
                    <p>{city ? city.description : "Đang tải thông tin thành phố..."}</p>
                </div>
                <div className='m-4'>
                    <p className='font-bold text-lg'>Một số địa điểm đề xuất</p>
                </div>
                <div>
                    {!city ? "" :
                        city.destinations.map((destination, index) => (
                            <div key={index} className="">
                                <p>Tên địa điểm: {destination.destiName}</p>
                                <p>Mô tả: {destination.description}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='flex-grow h-[calc(100vh-56px)] sticky top-[56px]'>
                    <MapContainer
                        center={mapCenter}
                        zoom={13}
                        minZoom={13}
                        scrollWheelZoom={false}
                        style={{ height: '100%', width: '100%' }}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <SetMapCenter center={mapCenter} />
                        {city && (
                            <Marker position={city.coordinates}>
                                <Popup>
                                    {city.cityName}<br /> {city.description}
                                </Popup>
                            </Marker>
                        )}
                    </MapContainer>
            </div>
        </div>
    );
};

export default ExploreDetails;
