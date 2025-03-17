import React from 'react';
import { motion } from 'framer-motion';
import Captcha from '../Components/Captcha';

const App = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 to-purple-800 p-4">
      {/* Background Gradient Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 blur-[150px] opacity-30"
      />

      {/* Animated Container */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100 }}
        className="relative z-10 backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl rounded-2xl p-6 md:p-8 w-full max-w-[400px]"
      >
        {/* Header Text */}
        <motion.h2
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-extrabold text-center text-white mb-4 md:mb-6 tracking-wide"
        >
          ✅ Verify your Telegram Account
        </motion.h2>

        {/* Gradient Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.4 }}
          className="h-[2px] bg-gradient-to-r from-blue-400 to-purple-500 mb-4 md:mb-6 origin-left"
        />

        {/* Captcha Component */}
        <Captcha />

        
   
      </motion.div>

      {/* Floating Glow Effect */}
      <motion.div
        animate={{
          x: [0, 20, -20, 0],
          y: [0, -20, 20, 0],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute w-32 h-32 md:w-40 md:h-40 bg-blue-400 rounded-full opacity-30 blur-3xl bottom-8 left-8"
      />

      <motion.div
        animate={{
          x: [0, -20, 20, 0],
          y: [0, 20, -20, 0],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute w-32 h-32 md:w-40 md:h-40 bg-purple-400 rounded-full opacity-30 blur-3xl top-8 right-8"
      />
    </div>
  );
};

export default App;
