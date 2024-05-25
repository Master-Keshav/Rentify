import React from 'react';
import Image from 'next/image';
import styles from './index.module.scss';

const PropertyCard = ({ property }: any) => {
    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                <Image src={property.image} alt="Property Image" className={styles.image} width={500} height={300} />
                <div className={styles.heartIcon}>❤️</div>
            </div>
            <div className={styles.details}>
                <div className={styles.rating}>
                    ⭐ {property.rating} ({property.totalRatings})
                </div>
                <div className={styles.info}>
                    {property.houseType} in {property.location}
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;
