'use client'

import React, { useState } from 'react';

import Filter from '../components/filter/filter';
import Navbar from '../components/navbar/navbar';
import PropertyCard from '../components/propertyCard/propertyCard';
import { properties } from '../constants/properties';

import './styles.scss';

const Properties = () => {
    const [filteredType, setFilteredType] = useState('All');
    const [view, setView] = useState('Grid');

    const handleTypeChange = (type: string) => {
        setFilteredType(type);
    };

    const handleViewChange = (view: string) => {
        setView(view);
    };

    const filteredProperties = properties.filter(property =>
        filteredType === 'All' || property.houseType === filteredType
    );

    return (
        <div className='container'>
            <Navbar />
            <div className="page-list-container">
                <div className="filter">
                    <Filter onTypeChange={handleTypeChange} onViewChange={handleViewChange} />
                </div>
                <div className={`properties-list ${view === 'List' ? 'list-view' : ''}`}>
                    {filteredProperties.map(property => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Properties;
