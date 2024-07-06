"use client";
import React, { useState } from 'react';
import { ChevronDown, Share2, Heart, Maximize2, Search, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';
import { motion } from 'framer-motion';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const WindowTopBar = () => (
  <div className="bg-gray-200 p-2 flex items-center space-x-2">
    <div className="flex space-x-2">
        <Link href="/" passHref>
            <div className="w-3 h-3 rounded-full bg-red-500" />
        </Link>
      <div className="w-3 h-3 rounded-full bg-yellow-500" />
      <div className="w-3 h-3 rounded-full bg-green-500" />
    </div>
  </div>
);

const AppContentTopBar = ({ isCarouselOpen, closeCarousel }: { isCarouselOpen: boolean, closeCarousel: () => void }) => (
  <div className="flex items-center justify-between p-2 bg-gray-100 border-b border-gray-200">
    {isCarouselOpen ? (
      <button onClick={closeCarousel} className="p-1 rounded hover:bg-gray-200">
        <ArrowLeft size={16} />
      </button>
    ) : (
      <div className="flex items-center space-x-2">
        <button className="p-1 rounded hover:bg-gray-200">
          <ChevronDown size={16} />
        </button>
        <span className="text-sm font-semibold">All Photos</span>
      </div>
    )}
    <div className="flex items-center space-x-2">
      <button className="p-1 rounded hover:bg-gray-200">
        <Share2 size={16} />
      </button>
      <button className="p-1 rounded hover:bg-gray-200">
        <Heart size={16} />
      </button>
      <button className="p-1 rounded hover:bg-gray-200">
        <Maximize2 size={16} />
      </button>
      <button className="p-1 rounded hover:bg-gray-200">
        <Search size={16} />
      </button>
    </div>
  </div>
);

const PhotosApp = () => {
  const [filterBy, setFilterBy] = useState('All Items');
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const placeholderImages = [
    { src: 'https://via.placeholder.com/300x400', alt: 'Portrait 1' },
    { src: 'https://via.placeholder.com/400x600', alt: 'Portrait 2' },
    { src: 'https://via.placeholder.com/600x400', alt: 'Landscape 1' },
    { src: 'https://via.placeholder.com/400x300', alt: 'Landscape 2' },
    { src: 'https://via.placeholder.com/300x300', alt: 'Square 1' },
    { src: 'https://via.placeholder.com/600x600', alt: 'Square 2' },
    { src: 'https://via.placeholder.com/400x500', alt: 'Portrait 3' },
    { src: 'https://via.placeholder.com/500x400', alt: 'Landscape 3' },
    { src: 'https://via.placeholder.com/300x500', alt: 'Portrait 4' },
  ];

  const openCarousel = (index) => {
    setSelectedImageIndex(index);
    setIsCarouselOpen(true);
  };

  const closeCarousel = () => {
    setIsCarouselOpen(false);
  };

  return (
    <div className="w-full max-w-4xl h-[66vh] mx-2 my-2 bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col m-auto relative">
      <WindowTopBar />

      <div className="flex flex-col flex-grow overflow-auto">
        <AppContentTopBar isCarouselOpen={isCarouselOpen} closeCarousel={closeCarousel} />

        <div className="flex-1 overflow-auto p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {placeholderImages.map((image, index) => (
              <motion.div
                key={index}
                className="relative w-full aspect-[4/3] bg-gray-100 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    layout="fill"
                    objectFit="contain"
                    className="rounded-lg cursor-pointer"
                    onClick={() => openCarousel(index)}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex justify-between p-2 bg-gray-100 border-t border-gray-200">
          <Link href="/" passHref>
            <button className="text-gray-600 hover:text-gray-900">X</button>
          </Link>
          <div className="relative">
            <button
              className="flex items-center space-x-1 px-2 py-1 bg-white rounded shadow"
              onClick={() => setFilterBy(filterBy === 'All Items' ? 'Photos' : 'All Items')}
            >
              <span className="text-sm">Filter By: {filterBy}</span>
              <ChevronDown size={16} />
            </button>
          </div>
        </div>
      </div>

      {isCarouselOpen && (
        <div className="absolute inset-0 bg-white flex flex-col items-center justify-center z-10 mt-16">
          <div className="mt-8 w-full">
            <Carousel
              selectedItem={selectedImageIndex}
              onChange={(index) => setSelectedImageIndex(index)}
              showThumbs={false}
              showStatus={false}
              infiniteLoop
              useKeyboardArrows
              emulateTouch
              className="w-full"
            >
              {placeholderImages.map((image, index) => (
                <div key={index} className="relative w-full h-[60vh] flex items-center justify-center">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    layout="fill"
                    objectFit="contain"
                    className="rounded-lg"
                  />
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotosApp;
