import React from "react";
import { Users, Code, Shield, Rocket } from "lucide-react";

const FeaturesSection = () => {
  return (
    <div className="relative w-full  text-white py-16 px-6 text-center">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-12">What We Offer</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {/* Feature 1 */}
          <div className="p-6 rounded-2xl shadow-lg flex flex-col items-center bg-black/40 backdrop-blur-md transition-all duration-300 hover:scale-105">
            <Users className="text-red-500 text-4xl mb-3" />
            <h3 className="text-lg font-semibold mb-2">Community</h3>
            <p className="text-sm text-gray-300">Connect with developers worldwide.</p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 rounded-2xl shadow-lg flex flex-col items-center bg-black/40 backdrop-blur-md transition-all duration-300 hover:scale-105">
            <Code className="text-blue-500 text-4xl mb-3" />
            <h3 className="text-lg font-semibold mb-2">Experts</h3>
            <p className="text-sm text-gray-300">Learn From Experts Who Work on Real-World Projects.</p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 rounded-2xl shadow-lg flex flex-col items-center bg-black/40 backdrop-blur-md transition-all duration-300 hover:scale-105">
            <Shield className="text-green-500 text-4xl mb-3" />
            <h3 className="text-lg font-semibold mb-2">Security</h3>
            <p className="text-sm text-gray-300">Your Data Is Safe with Us.</p>
          </div>

          {/* Feature 4 */}
          <div className="p-6 rounded-2xl shadow-lg flex flex-col items-center bg-black/40 backdrop-blur-md transition-all duration-300 hover:scale-105">
            <Rocket className="text-yellow-500 text-4xl mb-3" />
            <h3 className="text-lg font-semibold mb-2">Growth</h3>
            <p className="text-sm text-gray-300">Boost Your Skills & Career.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
