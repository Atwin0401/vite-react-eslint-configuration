import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isLoading) {
        navigate(user ? '/home' : '/login');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate, user, isLoading]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-figma-purple to-figma-blue flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 mx-auto mb-8"
        >
          <svg viewBox="0 0 200 300" className="w-full h-full">
            <path d="M50 0h100a50 50 0 0 1 0 100H50V0z" fill="#f24e1e"/>
            <path d="M50 100h100a50 50 0 0 1 0 100H50V100z" fill="#ff7262"/>
            <path d="M50 200h100a50 50 0 0 1 0 100H50V200z" fill="#1abcfe"/>
            <path d="M150 100a50 50 0 1 1 0 100 50 50 0 0 1 0-100z" fill="#0acf83"/>
            <path d="M100 0a50 50 0 1 1 0 100 50 50 0 0 1 0-100z" fill="#a259ff"/>
          </svg>
        </motion.div>
        
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-4xl font-bold text-white mb-4"
        >
          Figma
        </motion.h1>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-white/80 text-lg"
        >
          Design. Prototype. Collaborate.
        </motion.p>
        
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, duration: 0.4 }}
          className="mt-8"
        >
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SplashScreen;