'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import axios from 'axios';
import Filter from '../components/filter/filter';
import LoaderModal from '../components/loader/loaderModal';
import Navbar from '../components/navbar/navbar';
import PropertyCard from '../components/propertyCard/propertyCard';
import Footer from '../components/footer/footer';

import './page.scss';
import toast from 'react-hot-toast';

const Properties = () => {
    const [properties, setProperties] = useState([]);
    const [filteredType, setFilteredType] = useState('All');
    const [view, setView] = useState('Grid');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/api/properties/all');
                setProperties(response.data.properties);
                toast.success('Properties fetched successfully');
            } catch (error) {
                console.error('Error fetching properties:', error);
                toast.error('Failed to fetch properties');
            }
            finally {
                setLoading(false);
            }
        };
        fetchProperties();
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
                    <Filter onTypeChange={handleTypeChange} onViewChange={handleViewChange} />
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
