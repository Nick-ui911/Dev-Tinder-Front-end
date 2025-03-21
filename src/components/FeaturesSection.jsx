import { FaUsers, FaCode, FaShieldAlt, FaRocket } from "react-icons/fa";
import { motion } from "framer-motion";

const FeaturesSection = () => {
  return (
    <div className="w-full bg-gray-900 text-white py-16 px-6 text-center">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">What We Offer</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {/* Feature 1 */}
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center"
        >
          <FaUsers className="text-red-500 text-4xl mb-3" />
          <h3 className="text-lg font-semibold">Community</h3>
          <p className="text-sm opacity-80">Connect with developers worldwide.</p>
        </motion.div>

        {/* Feature 2 */}
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center"
        >
          <FaCode className="text-blue-500 text-4xl mb-3" />
          <h3 className="text-lg font-semibold">Experts</h3>
          <p className="text-sm opacity-80">Learn From Expert Who Work on real-world projects.</p>
        </motion.div>

        {/* Feature 3 */}
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center"
        >
          <FaShieldAlt className="text-green-500 text-4xl mb-3" />
          <h3 className="text-lg font-semibold">Security</h3>
          <p className="text-sm opacity-80">Your data is safe with us.</p>
        </motion.div>

        {/* Feature 4 */}
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center"
        >
          <FaRocket className="text-yellow-500 text-4xl mb-3" />
          <h3 className="text-lg font-semibold">Growth</h3>
          <p className="text-sm opacity-80">Boost your skills & career.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default FeaturesSection;
