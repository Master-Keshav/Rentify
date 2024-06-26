import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { AiFillTag } from 'react-icons/ai';
import { FiGrid } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa6';
import { MdDensityMedium, MdOutlineAddchart } from 'react-icons/md';
import { TbUrgent } from 'react-icons/tb';

import AgentDetailsModal from '../modal/AgentDetailsModal';

import './index.scss';

interface UserDetailsInterface {
    id?: string;
    username?: string;
    name?: string;
    email?: string;
    phonenumber?: string | number;
    experience?: string | number;
    about?: string;
    imageUrl?: string;
    hasPassword?: boolean;
}

interface FilterProps {
    onTagChange: (type: string) => void;
    userDetails: UserDetailsInterface
}

const typeFilter = [
    {
        name: 'Type',
        icon: null
    },
    {
        name: 'All',
        icon: <MdDensityMedium />
    },
    {
        name: 'Featured',
        icon: <FaStar />
    },
    {
        name: 'Urgent',
        icon: <TbUrgent />
    },
    {
        name: 'Discounted',
        icon: <AiFillTag />
    },
    {
        name: 'Exclusive',
        icon: <FiGrid />
    }
]

const Filter: React.FC<FilterProps> = ({ onTagChange, userDetails }) => {
    const router = useRouter()

    const [selectedType, setSelectedType] = useState('All');
    const [modalOpen, setModalOpen] = useState(false);

    const handleTagChange = (type: string) => {
        setSelectedType(type);
        onTagChange(type);
    };

    const onCreateClick = () => {
        if (userDetails && Object.values(userDetails).some(field => field === null || field === '')) {
            setModalOpen(true);
        } else {
            router.push("/properties/create");
        }
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <>
            <div className="filters">
                <div className="filterGroup">
                    {typeFilter.map((filter, idx) => (
                        <button
                            key={idx}
                            className={selectedType === filter.name ? 'active' : ''}
                            onClick={() => handleTagChange(filter.name)}
                            disabled={idx === 0}
                        >
                            {filter.icon && <span className='icon'>{filter.icon}</span>}
                            <span className='name'>{filter.name}</span>
                        </button>
                    ))}
                </div>
            </div>
            <div className="filters">
                <div className="filterGroup">
                    <button onClick={onCreateClick} >
                        <span className='icon-lg'><MdOutlineAddchart /></span>
                        <span className='name'>Create Property</span>

                    </button>
                </div>
            </div>
            {
                modalOpen &&
                <AgentDetailsModal
                    isOpen={modalOpen}
                    onClose={closeModal}
                    userDetails={userDetails}
                />
            }
        </>
    );
};

export default Filter;
