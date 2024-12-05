'use client'

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { FaHouseChimneyWindow } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';

import PropertyCard from '@/app/components/propertyCard/propertyCard';
// import agentData from '@/app/constants/agentsData';
import AgentCard from '@/app/container/AgentCard/AgentCard';
import { setLoading } from '@/redux/slices/loaderSlice';

import './page.scss';

const Agents = ({ params }: any) => {
    const dispatch = useDispatch()
    const [agentData, setAgentData] = useState<any>({})

    useEffect(() => {
        const fetchPropertyData = async () => {
            try {
                dispatch(setLoading(true));
                const response = await axios.get(`/api/users/agents/${params.id}`);
                setAgentData(response.data.agent);
                toast.success(response.data.message)
            } catch (error: any) {
                toast.error(error.response?.data?.message || 'Failed to fetch property data');
            } finally {
                dispatch(setLoading(false));
            }
        };

        fetchPropertyData();
    }, [params.id, dispatch]);

    return Object.keys(agentData).length > 0 && (
        <div className='container'>
            <div className='agents-list'>
                <AgentCard agent={agentData} />
            </div>
            <div className='property-data'>
                <h2> <span className='icon'><FaHouseChimneyWindow /></span> Properties Listed by {agentData.name}</h2>
                <div className='properties-list'>
                    {agentData.properties?.map((property: any) => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Agents;