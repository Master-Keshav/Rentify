'use client'

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

// import agents from '@/app/constants/agents';
import AgentCard from '@/app/container/AgentCard/AgentCard';
import Navbar from '@/app/components/navbar/navbar';
import { setLoading } from '@/redux/slices/loaderSlice';

import './page.scss';

const Agents = () => {
    const dispatch = useDispatch()
    const [agents, setAgents] = useState([])

    useEffect(() => {
        const fetchAgents = async () => {
            try {
                dispatch(setLoading(true));
                const response = await axios.get('/api/users/agents');
                setAgents(response.data.agents);
                console.log('Agents fetched successfully', response.data.agents);
            } catch (error: any) {
                console.error('Error fetching agents', error);
                toast.error(error.response?.data?.message || 'Failed to fetch agents');
            } finally {
                dispatch(setLoading(false));
            }
        };

        fetchAgents();
    }, [dispatch]);

    return (
        <div className='container'>
            <div className='background'></div>
            <Navbar />
            <div className='agents-list'>
                {agents.map((agent, index) => (
                    <AgentCard key={index} agent={agent} />
                ))}
            </div>
        </div>
    );
}

export default Agents;