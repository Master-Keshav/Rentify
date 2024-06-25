'use client'

import axios from 'axios';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useDispatch } from 'react-redux';

import { truncateText } from '@/utils/textUtils';
import { getUserDetails } from '@/utils/userUtils';
import { setLoading } from '@/redux/slices/loaderSlice';

import './styles.scss';

const PropertyCard = ({ property }: any) => {
    const dispatch = useDispatch()
    const [userData, setUserData] = useState<any>({});
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                dispatch(setLoading(true));
                await getUserDetails(dispatch, setUserData);
            } finally {
                dispatch(setLoading(false));
            }
        };
        fetchUserDetails();
    }, []);

    useEffect(() => {
        if (property.likedBy.includes(userData.id)) setLiked(true);
    }, [userData])

    const handleLike = async () => {
        setLiked(!liked);
        try {
            console.log(property)
            const response = await axios.post(`/api/users/properties`, {
                propertyId: property.id,
                liked: !liked,
            });
            console.log(response.data);
            toast.success("Added to likes")
        } catch (error: any) {
            console.log(error.message);
            error = error.response.data
            toast.error(error.message)
        }
    };

    return (
        <div className={"card"}>
            <div className={"imageContainer"} onClick={(e) => e.stopPropagation()}>
                <Image src={property.image} alt="Property Image" className={"image"} width={500} height={300} />
                <motion.div
                    className={"heartIcon"}
                    initial={{ scale: 1 }}
                    animate={{ scale: liked ? 1.2 : 1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    onClick={handleLike}
                >
                    {liked ? <AiFillHeart color="red" /> : <AiOutlineHeart />}
                </motion.div>
            </div>
            <Link href={`/properties/${property.id}`} key={property.id} passHref>
                <div className={"details"}>
                    <div className={"row"}>
                        <div className={"rating"}>⭐ {property.averageReviews} ({property.totalReviews})</div>
                        <div className={`tag ${property.tag}`}>{property.tag}</div>
                    </div>
                    <div className={"row"}>
                        <div className={"house-type"}>{truncateText(`${property.houseType} in ${property.location}`, 29)}</div>
                        <div className={"price"}>${property.price}</div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default PropertyCard;