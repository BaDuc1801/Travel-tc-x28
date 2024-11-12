import React from "react";

interface DestinationCardProps {
  city: string;
  name: string;
  description: string;
  image: string;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ city, name, image }) => {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg bg-white cursor-pointer mx-2 h-32 border-2 border-gray-500">
      <img src={image} alt={name} className="h-48 w-full object-cover rounded-md" />
      <p>{city}</p>
    </div>
  );
};

export default DestinationCard;
