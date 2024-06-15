import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa6';
import { FiGrid, FiList } from 'react-icons/fi';
import { MdDensityMedium, MdOutlineAddchart } from 'react-icons/md';
import { TbUrgent } from 'react-icons/tb';

import AgentDetailsModal from '../modal/AgentDetailsModal';

import './index.scss';

interface UserDetailsInterface {
    username?: string;
    name?: string;
    email?: string;
    phonenumber?: string | number;
    experience?: string | number;
    about?: string;
    imageUrl?: string;
}

interface FilterProps {
    onTypeChange: (type: string) => void;
    onViewChange: (view: string) => void;
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
    }
]

const showFilter = [
    {
        name: 'Show as',
        icon: null
    },
    {
        name: 'Grid',
        icon: <FiGrid />
    },
    {
        name: 'List',
        icon: <FiList />
    },
]

const Filter: React.FC<FilterProps> = ({ onTypeChange, onViewChange, userDetails }) => {
    const router = useRouter()

    const [selectedType, setSelectedType] = useState('All');
    const [selectedView, setSelectedView] = useState('Grid');
    const [modalOpen, setModalOpen] = useState(false);

    const handleTypeChange = (type: string) => {
        setSelectedType(type);
        onTypeChange(type);
    };

    const handleViewChange = (view: string) => {
        setSelectedView(view);
        onViewChange(view);
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
                            onClick={() => handleTypeChange(filter.name)}
                            disabled={idx === 0}
                        >
                            {filter.icon && <span className='icon'>{filter.icon}</span>}
                            <span className='name'>{filter.name}</span>
                        </button>
                    ))}
                </div>
                <div className="filterGroup">
                    {showFilter.map((filter, idx) => (
                        <button
                            key={idx}
                            className={selectedView === (idx === 1 ? 'Grid' : 'List') ? 'active' : ''}
                            onClick={() => handleViewChange(idx === 1 ? 'Grid' : 'List')}
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
