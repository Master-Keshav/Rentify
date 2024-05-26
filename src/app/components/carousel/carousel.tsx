import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';

import './index.scss';

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

    useEffect(() => {
        const interval = setInterval(goToNextSlide, 3000);
        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSlide]);

    return (
        <div className={"carousel"}>
            <div className={"imageContainer"}>
                <Image
                    src={slides[currentSlide].image}
                    alt={`Slide ${currentSlide}`}
                    width={1000}
                    height={700}
                />
            </div>
            <div className={"overlay"}>
                <h3>{slides[currentSlide].text}</h3>
            </div>
            <button onClick={goToPrevSlide} className={"prevBtn"}><FaArrowLeft /></button>
            <button onClick={goToNextSlide} className={"nextBtn"}><FaArrowRight /></button>
            <div className={"dots"}>
                {slides.map((slide: any, index: number) => (
                    <span
                        key={index}
                        className={`${"dot"} ${index === currentSlide ? '' : "active"}`}
                        onClick={() => goToSlide(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;
