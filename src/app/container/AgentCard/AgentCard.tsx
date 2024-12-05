'use client'

import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import './index.scss';

const AgentCard = ({ agent }: any) => {
    const router = useRouter();

    const onClickAgent = () => {
        router.push(`/agents/${agent._id}`);
    };

    return (
        <div className='agent-card' onClick={onClickAgent}>
            <div className='agent-photo'>
                <Image
                    src={agent.imageUrl}
                    alt={agent.name}
                    quality={100}
                    width={200}
                    height={200}
                    className='agent-image'
                />
            </div>
            <div className="agent-info">
                <div className='agent-name'>
                    <h1>
                        {agent.name}
                        <FaCheckCircle className='verified-icon' />
                    </h1>
                </div>
                <div className='agent-details'>
                    <p>Experience: {agent.experience}+ years</p>
                    <p>Phone: {agent.phonenumber}</p>
                    <p>Email: {agent.email}</p>
                    <p>About: {agent.about}</p>
                </div>
            </div>
        </div >
    );
}

export default AgentCard;
