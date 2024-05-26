'use client';

import React from 'react';
import Image from 'next/image';

import { motion } from 'framer-motion';
import { FaSwimmingPool, FaDumbbell, FaWifi, FaTv, FaParking, FaPaw, FaTree, FaShieldAlt, FaHouseUser } from 'react-icons/fa';
import { GiSmartphone } from 'react-icons/gi';
import { TbToolsKitchen3 } from 'react-icons/tb';

import Navbar from '@/app/components/navbar/navbar';
import propertyData from '@/app/constants/propertyData';

import './page.scss';

const Property = ({ params }: any) => {
    const amenityIcons: any = {
        "Swimming Pool": <FaSwimmingPool className="icon" />,
        "Gym": <FaDumbbell className="icon" />,
        "Kitchen": <TbToolsKitchen3 className="icon" />,
        "Wifi": <FaWifi className="icon" />,
        "Home Theater": <FaTv className="icon" />,
        "Parking": <FaParking className="icon" />,
        "Patio or balcony": <FaHouseUser className="icon" />,
        "Pets Allowed": <FaPaw className="icon" />,
        "Garden": <FaTree className="icon" />,
        "TV": <FaTv className="icon" />,
        "Smart Home Technology": <GiSmartphone className="icon" />,
        "24/7 Security": <FaShieldAlt className="icon" />
    };

    const hoverEffect = {
        scale: 1.1,
        transition: { duration: 0.3 }
    };

    const hrAnimation = {
        hidden: { width: 0 },
        visible: {
            width: "100%",
            transition: { duration: 1, ease: "easeInOut" }
        }
    };

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
                <div className="property-desc">
                    <div className="property-desc-left">
                        <div className="title">
                            {propertyData.title}
                        </div>
                        <div className="tags">
                            {propertyData.tags.map((tag: string, index: number) => (
                                <motion.span
                                    key={index}
                                    className='tag hover-effect'
                                    whileHover={hoverEffect}
                                >
                                    {tag}
                                </motion.span>
                            ))}
                        </div>
                        <motion.hr
                            initial="hidden"
                            animate="visible"
                            variants={hrAnimation}
                            className="animated-hr"
                        />
                        <div className="about">
                            <h3>What this place offers</h3>
                            <div className="amenities">
                                {propertyData.amenities.map((amenity: string, index: number) => (
                                    <div key={index} className="amenity hover-effect">
                                        {amenityIcons[amenity]} {amenity}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="property-desc-right">
                        {/* Right part will go here */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Property;
