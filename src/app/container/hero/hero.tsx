'use client'

import React from 'react';
import Carousel from '@/app/components/carousel/carousel';
import './index.scss'
import { useRouter } from 'next/navigation';

const slides = [
    {
        image: '/car1.jpg',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit saepe voluptatibus amet.',
    },
    {
        image: '/car2.jpg',
        text: 'Qui, asperiores ex iusto voluptatum dolores quaerat, veritatis ipsum ipsa incidunt.',
    },
    {
        image: '/car3.jpg',
        text: 'Nostrum aut, sequi quo error voluptatum fuga ratione vitae repudiandae dolorem..',
    },
];

const Hero = () => {
    const router = useRouter();
    const onExploreClick = (() => {
        router.push("/properties");
    })

    const onAboutClick = (() => {
        router.push("/about");
    })
    return (
        <div className='hero'>
            <div className="hero-text">
                <h1>Find Your Perfect Home</h1>
                <div className='text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum odit alias incidunt! Non sit eius libero repudiandae, labore deserunt beatae odio at rerum, a error facere cumque quo magnam. Voluptates.</div>
                <div className="btns">
                    <button onClick={onExploreClick} className="btn explore">Explore</button>
                    <button onClick={onAboutClick} className="btn about">About Us</button>
                </div>
            </div>
            <div className="carousel">
                <Carousel slides={slides} />
            </div>
        </div>
    );
};

export default Hero;
