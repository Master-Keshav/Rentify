'use client'

import axios from 'axios';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

import Filter from '@/app/components/filter/filter';
import Footer from '@/app/components/footer/footer';
import LoaderModal from '@/app/components/loader/loaderModal';
import Navbar from '@/app/components/navbar/navbar';
import PropertyCard from '@/app/components/propertyCard/propertyCard';
import { properties } from '@/app/constants/properties';

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
    // const [properties, setProperties] = useState([]);
    const [filteredType, setFilteredType] = useState('All');
    const [view, setView] = useState('Grid');
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState<UserDetailsInterface>({});

    const getUserDetails = async () => {
        try {
            setLoading(true);
            const res = await axios.get('/api/users/me')
            setUserData(res.data.user)
        } catch (error: any) {
            console.error("Error creating property:", error.message);
            toast.error(error?.response?.data?.message || "Failed to Fetch User");
        } finally {
            setLoading(false);
        }
    }
    const fetchProperties = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/properties/all');
            // setProperties(response.data.properties);
            toast.success('Properties fetched successfully');
        } catch (error) {
            console.error('Error fetching properties:', error);
            toast.error('Failed to fetch properties');
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUserDetails();
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
            {loading ? <LoaderModal isOpen={loading} /> : <></>}
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
