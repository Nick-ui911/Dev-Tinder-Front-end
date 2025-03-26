import React from 'react';
import { Users, Code, Shield, Rocket } from 'lucide-react';

const FeaturesSection = () => {
  return (
    <div className="relative w-full bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white py-16 px-6 text-center overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-grid-white/[0.02]"></div>
      </div>

      {/* Gradient overlays */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-white">
          What We Offer
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {/* Feature 1 */}
          <div 
            className="relative bg-gray-800/60 backdrop-blur-sm p-6 rounded-2xl shadow-2xl flex flex-col items-center transition-all duration-300 hover:scale-105 hover:bg-gray-800/80"
          >
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-red-500/20 rounded-full blur-2xl"></div>
            <Users className="text-red-500 text-4xl mb-3 relative z-10" />
            <h3 className="text-lg font-semibold mb-2">Community</h3>
            <p className="text-sm text-gray-300">Connect with developers worldwide.</p>
          </div>

          {/* Feature 2 */}
          <div 
            className="relative bg-gray-800/60 backdrop-blur-sm p-6 rounded-2xl shadow-2xl flex flex-col items-center transition-all duration-300 hover:scale-105 hover:bg-gray-800/80"
          >
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-blue-500/20 rounded-full blur-2xl"></div>
            <Code className="text-blue-500 text-4xl mb-3 relative z-10" />
            <h3 className="text-lg font-semibold mb-2">Experts</h3>
            <p className="text-sm text-gray-300">Learn From Experts Who Work on Real-World Projects.</p>
          </div>

          {/* Feature 3 */}
          <div 
            className="relative bg-gray-800/60 backdrop-blur-sm p-6 rounded-2xl shadow-2xl flex flex-col items-center transition-all duration-300 hover:scale-105 hover:bg-gray-800/80"
          >
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-green-500/20 rounded-full blur-2xl"></div>
            <Shield className="text-green-500 text-4xl mb-3 relative z-10" />
            <h3 className="text-lg font-semibold mb-2">Security</h3>
            <p className="text-sm text-gray-300">Your Data Is Safe with Us.</p>
          </div>

          {/* Feature 4 */}
          <div 
            className="relative bg-gray-800/60 backdrop-blur-sm p-6 rounded-2xl shadow-2xl flex flex-col items-center transition-all duration-300 hover:scale-105 hover:bg-gray-800/80"
          >
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-500/20 rounded-full blur-2xl"></div>
            <Rocket className="text-yellow-500 text-4xl mb-3 relative z-10" />
            <h3 className="text-lg font-semibold mb-2">Growth</h3>
            <p className="text-sm text-gray-300">Boost Your Skills & Career.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;