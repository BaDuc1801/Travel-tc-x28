import React from "react";
import { FaLocationDot } from "react-icons/fa6";

interface DestinationCardProps {
  city: string;
  name: string;
  description: string;
  image: string;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ city, name, description, image }) => {
  return (
    <div className="destination-card p-4 rounded-lg shadow-lg bg-white cursor-pointer">
      <img src={image} alt={name} className="h-48 w-full object-cover rounded-md" />
      <p className="text-gray-500 mt-2 flex items-center gap-1"><span className="text-red-500"><FaLocationDot />
      </span>{city}</p>
      <h3 className="text-xl font-semibold mt-4">{name}</h3>
      <p className="text-gray-700 mt-2">{description}</p>
      <div className="flex justify-end">
      <button className=" bg-red-500 text-white mt-3 pr-2 pl-2 pt-1 pb-1 rounded-lg hover:bg-red-600">Explore</button>
      </div>
    </div>
  );
};

export default DestinationCard;
