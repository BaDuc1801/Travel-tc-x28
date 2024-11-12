import React from 'react'
import { useParams } from 'react-router-dom';

const ExploreDetails: React.FC = () => {
    const { cityName } = useParams<{ cityName: string }>(); 

    return (
        <div>
            <h2>Thông tin thành phố: {cityName}</h2>
        </div>
    );
};

export default ExploreDetails
