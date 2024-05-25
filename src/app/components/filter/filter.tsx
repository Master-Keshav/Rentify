import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa6';
import { FiGrid, FiList } from 'react-icons/fi';
import { MdDensityMedium } from 'react-icons/md';
import { TbUrgent } from 'react-icons/tb';

import './index.scss';

interface FilterProps {
    onTypeChange: (type: string) => void;
    onViewChange: (view: string) => void;
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

const Filter: React.FC<FilterProps> = ({ onTypeChange, onViewChange }) => {
    const [selectedType, setSelectedType] = useState('All');
    const [selectedView, setSelectedView] = useState('Grid');

    const handleTypeChange = (type: string) => {
        setSelectedType(type);
        onTypeChange(type);
    };

    const handleViewChange = (view: string) => {
        setSelectedView(view);
        onViewChange(view);
    };

    return (
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
    );
};

export default Filter;
