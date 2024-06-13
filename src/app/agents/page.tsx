import React from 'react';

import agents from '../constants/agents';
import AgentCard from '../container/AgentCard/AgentCard';
import Navbar from '../components/navbar/navbar';

import './page.scss';

const Agents = () => {
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
