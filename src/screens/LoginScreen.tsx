import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(email, password);
      navigate('/home');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-figma-gray-50 to-figma-gray-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4">
              <svg viewBox="0 0 200 300" className="w-full h-full">
                <path d="M50 0h100a50 50 0 0 1 0 100H50V0z" fill="#f24e1e"/>
                <path d="M50 100h100a50 50 0 0 1 0 100H50V100z" fill="#ff7262"/>
                <path d="M50 200h100a50 50 0 0 1 0 100H50V200z" fill="#1abcfe"/>
                <path d="M150 100a50 50 0 1 1 0 100 50 50 0 0 1 0-100z" fill="#0acf83"/>
                <path d="M100 0a50 50 0 1 1 0 100 50 50 0 0 1 0-100z" fill="#a259ff"/>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-figma-gray-900 mb-2">Welcome back</h1>
            <p className="text-figma-gray-600">Sign in to continue to Figma</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-figma-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-figma-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-figma-gray-300 rounded-lg focus:ring-2 focus:ring-figma-purple focus:border-transparent transition-all"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-figma-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-figma-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-figma-gray-300 rounded-lg focus:ring-2 focus:ring-figma-purple focus:border-transparent transition-all"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-figma-gray-400 hover:text-figma-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-figma-gray-300 text-figma-purple focus:ring-figma-purple" />
                <span className="ml-2 text-sm text-figma-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-figma-purple hover:text-figma-purple/80">
                Forgot password?
              </a>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-figma-purple text-white py-3 rounded-lg font-medium hover:bg-figma-purple/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign in'
              )}
            </motion.button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-figma-gray-600">
              Don't have an account?{' '}
              <a href="#" className="text-figma-purple hover:text-figma-purple/80 font-medium">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginScreen;