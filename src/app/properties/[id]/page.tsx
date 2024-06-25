'use client';

import axios from 'axios';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from "react-hot-toast";
import { FaSwimmingPool, FaDumbbell, FaWifi, FaTv, FaParking, FaPaw, FaTree, FaShieldAlt, FaStar, FaBriefcase, FaBoxOpen } from 'react-icons/fa';
import { GiFireplace, GiSmartphone } from 'react-icons/gi';
import { MdBalcony, MdLocalLaundryService } from 'react-icons/md';
import { TbToolsKitchen3 } from 'react-icons/tb';
import { useDispatch } from "react-redux";

import Navbar from '@/app/components/navbar/navbar';
import { setLoading } from "@/redux/slices/loaderSlice"

import './page.scss';

const Property = ({ params }: any) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [propertyData, setPropertyData] = useState<any>(null);
    const [showReviewInput, setShowReviewInput] = useState(false);
    const [hoveredRating, setHoveredRating] = useState<number | null>(null);
    const [selectedRating, setSelectedRating] = useState<number>(0);
    const [reviewText, setReviewText] = useState<string>('');

    useEffect(() => {
        const fetchPropertyData = async () => {
            try {
                dispatch(setLoading(true));
                const response = await axios.get(`/api/properties/${params.id}`);
                setPropertyData(response.data.property);
                setSelectedRating(Math.round(response.data.property.averageReviews));
                toast.success(response.data.message)
            } catch (error: any) {
                toast.error(error.response?.data?.message || 'Failed to fetch property data');
            } finally {
                dispatch(setLoading(false));
            }
        };

        fetchPropertyData();
    }, [params.id, dispatch]);

    const amenityIcons: any = {
        "Swimming Pool": <FaSwimmingPool className="icon" />,
        "Gym": <FaDumbbell className="icon" />,
        "Kitchen": <TbToolsKitchen3 className="icon" />,
        "Wifi": <FaWifi className="icon" />,
        "Home Theater": <FaTv className="icon" />,
        "Parking": <FaParking className="icon" />,
        "Patio or Balcony": <MdBalcony className="icon" />,
        "Pets Allowed": <FaPaw className="icon" />,
        "Garden": <FaTree className="icon" />,
        "TV": <FaTv className="icon" />,
        "Smart Home Technology": <GiSmartphone className="icon" />,
        "24/7 Security": <FaShieldAlt className="icon" />,
        "Fireplace": <GiFireplace className="icon" />,
        "Laundry Room": <MdLocalLaundryService className="icon" />,
        "Office": <FaBriefcase className="icon" />,
        "Storage Room": <FaBoxOpen className="icon" />
    };

    const hoverEffect = {
        scale: 1.1,
        transition: { duration: 0.3 }
    };

    const hrAnimation = {
        hidden: { width: 0 },
        visible: {
            width: "70%",
            transition: { duration: 1, ease: "easeInOut" }
        }
    };

    const handleReviewButtonClick = () => {
        setShowReviewInput(!showReviewInput);
    };

    const getStarColor = (index: number) => {
        if (hoveredRating !== null) {
            return index < hoveredRating ? 'gold' : 'gray';
        }
        return index < selectedRating ? 'gold' : 'gray';
    };

    const handleStarClick = (index: number) => {
        const newRating = index + 1;
        setSelectedRating(newRating);
        console.log(newRating);
    };

    const handleStarHover = (index: number) => {
        setHoveredRating(index + 1);
    };

    const handleStarMouseLeave = () => {
        setHoveredRating(null);
    };

    const handleCancelClick = () => {
        setShowReviewInput(false);
    };

    const handleOkClick = async () => {
        console.log(propertyData)
        try {
            dispatch(setLoading(true));
            let payload = {
                property_id: propertyData.id,
                rating: selectedRating,
                comment: reviewText
            };
            console.log(payload);
            const response = await axios.post('/api/reviews/create', payload);
            toast.success(response.data.message);
            console.log('Review submitted:', response.data);
            setShowReviewInput(false);
            setReviewText('');
        } catch (error: any) {
            toast.error(error.response.data.message);
            console.error('Error submitting review:', error);
        } finally {
            dispatch(setLoading(false));
        }
    };

    const onClickAgent = () => {
        router.push("/agents/1");
    };

    return !!propertyData && (
        <div className='container'>
            <div className='background'></div>
            <Navbar />
            <div className="property-container">
                <div className="property-images">
                    <div className="main-image">
                        <Image src={propertyData.images[0]} alt="Main" width={500} height={300} />
                    </div>
                    <div className="secondary-images">
                        {
                            propertyData.images.slice(1, 5).map((image: string, index: number) => (
                                <div key={index} className="secondary-image">
                                    <Image src={image} alt={`Secondary ${index}`} width={250} height={150} />
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="property-desc">
                    <div className="property-desc-left">
                        <div className="title">
                            {propertyData.title}
                        </div>
                        <div className="tags">
                            {
                                propertyData.tags.map((tag: string, index: number) => (
                                    <motion.span
                                        key={index}
                                        className='tag hover-effect'
                                        whileHover={hoverEffect}
                                    >
                                        {tag}
                                    </motion.span>
                                ))
                            }
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
                                {
                                    propertyData.amenities.map((amenity: string, index: number) => (
                                        <motion.div
                                            key={index}
                                            className="amenity hover-effect"
                                            whileHover={hoverEffect}
                                        >
                                            {amenityIcons[amenity]} {amenity}
                                        </motion.div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className="property-desc-right">
                        <div className="price-review">
                            <div className="price">
                                ${propertyData.price}<span className="currency"> / Month</span>
                            </div>
                            <div className="total-reviews">
                                {propertyData.totalReviews} reviews
                            </div>
                        </div>
                        <div className="rating">
                            <div className="stars">
                                {
                                    [...Array(5)].map((_, index) => (
                                        <FaStar
                                            key={index}
                                            color={getStarColor(index)}
                                            onMouseEnter={() => handleStarHover(index)}
                                            onMouseLeave={handleStarMouseLeave}
                                            onClick={() => handleStarClick(index)}
                                        />
                                    ))
                                }
                            </div>
                            {showReviewInput ? (
                                <div className="review-form">
                                    <textarea
                                        value={reviewText}
                                        onChange={(e) => setReviewText(e.target.value)}
                                        placeholder="Write your review here..."
                                    />
                                    <div className="review-buttons">
                                        <button className="cancel-button" onClick={handleCancelClick}>
                                            Cancel
                                        </button>
                                        <button className="ok-button" onClick={handleOkClick}>
                                            Ok
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <button className="review-button" onClick={handleReviewButtonClick}>
                                    Write a review
                                </button>
                            )}
                        </div>
                        <div className="owner-details" onClick={onClickAgent}>
                            <div className="owner-photo">
                                <Image src={propertyData.owner.profilePhoto} alt="Owner" width={100} height={100} className="owner-photo-img" />
                            </div>
                            <div className="owner-info">
                                <div className="owner-name">{propertyData.owner.name}</div>
                                <div className="owner-about">{propertyData.owner.about}</div>
                                <div className="owner-contact">{propertyData.owner.email} | {propertyData.owner.phone}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Property;
