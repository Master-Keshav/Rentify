import React from 'react';
import { FaHouseChimneyWindow } from 'react-icons/fa6';

import Navbar from '@/app/components/navbar/navbar';
import PropertyCard from '@/app/components/propertyCard/propertyCard';
import agentData from '@/app/constants/agentsData';
import AgentCard from '@/app/container/AgentCard/AgentCard';

import './page.scss';

const Agents = () => {
    const { id, name, photo, about, phoneNumber, email, experience, properties } = agentData;

    return (
        <div className='container'>
            <div className='background'></div>
            <Navbar />
            <div className='agents-list'>
                <AgentCard agent={{ id, name, photo, about, phoneNumber, email, experience }} />
            </div>
            <div className='property-data'>
                <h2> <span className='icon'><FaHouseChimneyWindow /></span> Properties Listed by {name}</h2>
                <div className='properties-list'>
                    {properties.map((property: any) => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Agents;
