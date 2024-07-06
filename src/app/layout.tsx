"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Inter } from 'next/font/google';
import { Wifi, Volume2, Battery, Star } from 'lucide-react';
import { usePathname } from 'next/navigation';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

const Navbar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <nav className="absolute top-0 left-0 right-0 z-10 bg-gray-900 bg-opacity-50 backdrop-blur-lg">
      <div className="bg-gray-900 bg-opacity-50 backdrop-blur-lg shadow-md px-4 py-1 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href="/" passHref>
            <div className="flex items-center space-x-2 cursor-pointer">
              <span className="text-white"><Star height={18} /></span>
              <span className="font-semibold text-white">Liz Hagearty</span>
            </div>
          </Link>
          <div className="hidden md:flex space-x-4 text-white">
            <span>File</span>
            <span>Edit</span>
            <span>Window</span>
            <span>Go</span>
            <span>View</span>
            <span>Help</span>
          </div>
        </div>
        <div className="flex items-center space-x-4 text-white">
          <div className="hidden md:flex items-center space-x-4">
            <Wifi size={16} />
            <Volume2 size={16} />
            <Battery size={16} />
          </div>
          <span>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>
    </nav>
  );
};

const AppBar = () => {
  const appIcons = [
    { src: "https://via.placeholder.com/48", alt: "Resume", route: "/resume", label: "Resume" },
    { src: "https://via.placeholder.com/48", alt: "Photo App", route: "/art", label: "Art" },
    { src: "https://via.placeholder.com/48", alt: "TikTok", route: "/tiktok", label: "TikTok" },
    { src: "https://via.placeholder.com/48", alt: "Notes", route: "/thoughts", label: "Thoughts" },
    { src: "https://via.placeholder.com/48", alt: "Email", route: "/contact", label: "Contact" },
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center mb-4">
      <div className="bg-white bg-opacity-30 backdrop-blur-md rounded-full px-8 py-2 flex space-x-4">
        {appIcons.map((icon, index) => (
          <Link key={index} href={icon.route} passHref>
            <motion.div
              whileHover={{ scale: 1.15 }}
              transition={{ type: "spring", stiffness: 300 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="relative flex flex-col items-center cursor-pointer"
            >
              <Image
                src={icon.src}
                alt={icon.alt}
                width={48}
                height={48}
                className="w-12 h-12 rounded-xl"
              />
              {hoveredIndex === index && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute bottom-14 bg-gray-800 text-white text-xs rounded py-1 px-2"
                >
                  {icon.label}
                </motion.div>
              )}
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <body className={`${inter.className} bg-blue-500 h-screen overflow-hidden`}>
      <AnimatePresence mode="wait" initial={false}>
        <div className="relative h-full flex flex-col">
          <div className="absolute inset-0 backdrop-blur-sm"></div>
          <Navbar />
          
            <motion.main
              key={pathname}
              initial={{ opacity: 1, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="relative flex-grow pt-8 pb-16 flex justify-center items-center w-full"
            >
              {children}
            </motion.main>
          

          <AppBar />
        </div>
        </AnimatePresence>
      </body>
    </html>
  );
}
