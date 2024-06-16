'use client'

import axios from 'axios';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from "react-redux";

import Filter from '@/app/components/filter/filter';
import Footer from '@/app/components/footer/footer';
import Navbar from '@/app/components/navbar/navbar';
import PropertyCard from '@/app/components/propertyCard/propertyCard';
import { properties } from '@/app/constants/properties';
import { setLoading } from "@/redux/slices/loaderSlice"
import { getUserDetails } from '@/utils/userUtils';

import './page.scss';

interface UserDetailsInterface {
    username?: string;
    name?: string;
    email?: string;
    phonenumber?: string | number;
    experience?: string | number;
    about?: string;
    imageUrl?: string;
}

const Properties = () => {
    const dispatch = useDispatch();
    // const [properties, setProperties] = useState([]);
    const [filteredType, setFilteredType] = useState('All');
    const [view, setView] = useState('Grid');
    const [userData, setUserData] = useState<UserDetailsInterface>({});

    const fetchProperties = async () => {
        try {
            dispatch(setLoading(true));
            const response = await axios.get('/api/properties/all');
            // setProperties(response.data.properties);
            toast.success('Properties fetched successfully');
        } catch (error) {
            console.error('Error fetching properties:', error);
            toast.error('Failed to fetch properties');
        }
        finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                dispatch(setLoading(true));
                await getUserDetails(dispatch, setUserData);
            }
            finally {
                dispatch(setLoading(false));
            }
        };
        fetchUserDetails();
        // fetchProperties();
    }, []);

    const handleTypeChange = (type: string) => {
        setFilteredType(type);
    };

    const handleViewChange = (view: string) => {
        setView(view);
    };

    const filteredProperties = properties.filter((property: any) =>
        filteredType === 'All' || property.houseType === filteredType
    );

    return (
        <div className="container">
            <Navbar />
            <div className="page-list-container">
                <div className="filter">
                    <Filter onTypeChange={handleTypeChange} onViewChange={handleViewChange} userDetails={userData} />
                </div>
                <div className={`properties-list ${view === 'List' ? 'list-view' : ''}`}>
                    {filteredProperties.map((property: any) => (
                        <Link href={`/properties/${property.id}`} key={property.id} passHref>
                            <PropertyCard property={property} />
                        </Link>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Properties;
