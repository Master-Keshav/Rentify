import React from 'react';
import Image from 'next/image';

import './styles.scss';

const PropertyCard = ({ property }: any) => {
    return (
        <div className={"card"}>
            <div className={"imageContainer"}>
                <Image src={property.image} alt="Property Image" className={"image"} width={500} height={300} />
                <div className={"heartIcon"}>❤️</div>
            </div>
            <div className={"details"}>
                <div className={"row"}>
                    <div className={"rating"}>⭐ {property.rating} ({property.totalRatings})</div>
                    <div className={`tag ${property.tag}`}>{property.tag}</div>
                </div>
                <div className={"row"}>
                    <div className={"house-type"}> {property.houseType} in {property.location} </div>
                    <div className={"price"}>${property.price}</div>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;
