import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-centerbg-gradient-to-br from-gray-900 via-black to-gray-900">
      <motion.div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-5 h-5 bg-blue-500 rounded-full"
            animate={{
              y: [0, -10, 0], // Bouncing effect
              opacity: [0.3, 1, 0.3], // Fade effect
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              repeatDelay: 0.2,
              ease: "easeInOut",
              delay: i * 0.2, // Stagger effect
            }}
          ></motion.span>
        ))}
      </motion.div>
    </div>
  );
};

export default Loader;
