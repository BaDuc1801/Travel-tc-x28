import React from "react";

interface DestinationCardProps {
  city: string;
  name: string;
  description: string;
  image: string;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ city, name, image }) => {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg bg-white cursor-pointer mx-2 h-36 w-32 border-2 border-gray-500 relative">
      <img src={image} alt={name} className="h-48 w-full object-cover rounded-md" />
      <div className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent text-center">
        <p className="text-white font-bold py-1">{city}</p>
      </div>
    </div>
  );
};

export default DestinationCard;
