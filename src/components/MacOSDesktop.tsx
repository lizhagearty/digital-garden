"use client";

import React, { ReactNode, useState, useEffect } from 'react';
import { Wifi, Volume2, Battery } from 'lucide-react';

interface MacOSDesktopProps {
  children: ReactNode;
}

const MacOSDesktop: React.FC<MacOSDesktopProps> = ({ children }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-blue-100 to-blue-300">
      {/* Main Content Area */}
      <div className="flex-grow">
        {children}
      </div>
    </div>
  );
};

export default MacOSDesktop;
