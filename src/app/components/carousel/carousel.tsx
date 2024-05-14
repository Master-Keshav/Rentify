'use client'

import React, { useState } from 'react';
import styles from './Carousel.module.scss';
import Image from 'next/image';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';

const Carousel = ({ slides }: any) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const goToNextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
    };

    const goToPrevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
    };

    const goToSlide = (slideIndex: number) => {
        setCurrentSlide(slideIndex);
    };

    return (
        <div className={styles.carousel}>
            <div className={styles.imageContainer}>
                <Image
                    src={slides[currentSlide].image}
                    alt={`Slide ${currentSlide}`}
                    width={1000}
                    height={700}
                />
            </div>
            <div className={styles.overlay}>
                <h3>{slides[currentSlide].text}</h3>
            </div>
            <button onClick={goToPrevSlide} className={styles.prevBtn}><FaArrowLeft /></button>
            <button onClick={goToNextSlide} className={styles.nextBtn}><FaArrowRight /></button>
            <div className={styles.dots}>
                {slides.map((slide: any, index: number) => (
                    <span
                        key={index}
                        className={`${styles.dot} ${index === currentSlide ? styles.active : ''}`}
                        onClick={() => goToSlide(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;
