import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import React from 'react';
import Image from 'next/image';

import { RootState } from '@/redux/store';

import './index.scss';

const LoaderModal: React.FC = () => {
    const isOpen = useSelector((state: RootState) => state.loader.loading);

    const loaderVariants = {
        hidden: {
            opacity: 0,
            display: 'none',
        },
        visible: {
            opacity: 1,
            display: 'block',
        },
    };

    return (
        <motion.div
            className="loader-modal"
            variants={loaderVariants}
            initial="hidden"
            animate={isOpen ? 'visible' : 'hidden'}
        >
            <div className="loader-content">
                <Image src="/loader.gif" alt="Loading..." width={300} height={300} />
            </div>
        </motion.div>
    );
};

export default LoaderModal;
