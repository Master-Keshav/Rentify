import React from 'react';
import Image from 'next/image';

import Navbar from '@/app/components/navbar/navbar';
import propertyData from '@/app/constants/propertyData';

import './page.scss';

const Property = ({ params }: any) => {
    return (
        <div className='container'>
            <div className='background'></div>
            <Navbar />
            <div className="property-container">
                <div className="property-images">
                    <div className="main-image">
                        <Image src={propertyData.images[0]} alt="Main" width={500} height={300} />
                    </div>
                    <div className="secondary-images">
                        {propertyData.images.slice(1, 5).map((image, index) => (
                            <div key={index} className="secondary-image">
                                <Image src={image} alt={`Secondary ${index}`} width={250} height={150} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Property;
