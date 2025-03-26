import React, { useState, useEffect } from 'react';
import { Users, Globe, Code, TrendingUp, Award, PieChart, Server, Activity } from 'lucide-react';

const UsersCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const stats = [
    {
      icon: <Users className="text-4xl text-red-500" />,
      number: "10,000+",
      label: "Active Developers"
    },
    {
      icon: <Globe className="text-4xl text-blue-500" />,
      number: "50+",
      label: "Countries Represented"
    },
    {
      icon: <Code className="text-4xl text-green-500" />,
      number: "25,000+",
      label: "Projects Created"
    },
    {
      icon: <TrendingUp className="text-4xl text-purple-500" />,
      number: "95%",
      label: "User Satisfaction"
    },
    {
      icon: <Award className="text-4xl text-yellow-500" />,
      number: "15+",
      label: "Industry Awards"
    },
    {
      icon: <PieChart className="text-4xl text-indigo-500" />,
      number: "200M+",
      label: "Lines of Code"
    },
    {
      icon: <Server className="text-4xl text-teal-500" />,
      number: "99.9%",
      label: "Uptime Guarantee"
    },
    {
      icon: <Activity className="text-4xl text-pink-500" />,
      number: "24/7",
      label: "Community Support"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        (prevIndex + 4) % stats.length
      );
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const visibleStats = stats.slice(currentIndex, currentIndex + 4).concat(
    stats.slice(0, Math.max(0, (currentIndex + 4) - stats.length))
  );

  return (
    <div className="relative w-full bg-gradient-to-br from-gray-900 via-black to-gray-900 opacity-90 z-0 py-16 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto relative">
        <h2 className="text-center text-white text-3xl md:text-4xl font-bold mb-12 tracking-tight">
          DevWorld by the Numbers
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative">
          {visibleStats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 text-center transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
              style={{
                animation: 'fadeIn 0.5s ease-in-out',
                animationFillMode: 'both',
                animationDelay: `${index * 0.2}s`
              }}
            >
              <div className="mb-4">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">
                {stat.number}
              </h3>
              <p className="text-gray-400 text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Global styles */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default UsersCarousel;