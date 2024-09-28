'use client'

import React from 'react';
import { Cursor, useTypewriter } from 'react-simple-typewriter';
import { useRouter } from 'next/navigation';

import Button from '@/components/button';
import Carousel from '@/components/carousel';
import { slides, typeWriterWords } from '@/constants/hero';

import './index.scss'

export default function Home() {
  const router = useRouter();

  const [text] = useTypewriter({
    words: typeWriterWords,
    loop: true,
    typeSpeed: 120,
    deleteSpeed: 80
  });

  const onExploreClick = (() => {
    router.push("/properties");
  })

  const onAboutClick = (() => {
    router.push("#");
  })

  return (
    <div className='hero'>
      <div className="hero-text">
        <h1>
          We turn spaces into <span>{text}</span>
          <span className="cursor">
            <Cursor cursorStyle='|' />
          </span>
        </h1>
        <div className='text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum odit alias incidunt! Non sit eius libero repudiandae, labore deserunt beatae odio at rerum, a error facere cumque quo magnam. Voluptates.</div>
        <div className="btns">
          <Button
            handleOnClick={onExploreClick}
            text="Explore"
            color='var(--white)'
            backgroundColor='var(--turquoise-blue)'
          />
          <Button
            handleOnClick={onAboutClick}
            text="About Us"
            color='var(--charcoal-blue)'
            backgroundColor='transparent'
            borderColor='var(--charcoal-blue)'
          />
        </div>
      </div>
      <div className="carousel">
        <Carousel slides={slides} />
      </div>
    </div>
  );
};

// interface MetadataProps {
//   title: string;
//   description: string;
// }

// export function generateMetadata(): MetadataProps {
//   return {
//       title: 'Agents',
//       description: 'Rentify Agents page',
//   }
// };