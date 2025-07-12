import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * LoginForm Component
 * --------------------
 * A responsive login form for the clinic appointment calendar.
 * Accepts a hardcoded login (email: staff@clinic.com, password: 123456).
 * On successful login, it triggers the `onLogin` callback.
 */
export default function LoginForm({ onLogin }) {
  // State for email, password, and error message
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Handle login authentication (demo credentials)
  const handleLogin = () => {
    if (email === 'staff@clinic.com' && password === '123456') {
      setError('');
      onLogin(); // Call parent login callback
    } else {
      setError('Invalid credentials. Use staff@clinic.com / 123456');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f2fe] to-[#c7d2fe] dark:from-[#111827] dark:to-[#1e293b] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="backdrop-blur-lg bg-white/70 dark:bg-gray-800/80 border border-white/20 dark:border-gray-700 p-10 rounded-3xl shadow-xl w-full max-w-md"
      >
        {/* Header Section */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-blue-200 dark:bg-blue-900 rounded-full shadow-md mb-4"
          >
            <Calendar className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Clinic Calendar</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
            Login to manage appointments
          </p>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="staff@clinic.com"
              className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-sm dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-sm dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-600 text-sm bg-red-100 dark:bg-red-900/30 p-3 rounded-lg"
            >
              {error}
            </motion.div>
          )}

          {/* Login Button */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.02 }}
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition duration-200 shadow-md"
          >
            Sign In
          </motion.button>
        </div>

        {/* Demo Credentials Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Demo: <code>staff@clinic.com</code> / <code>123456</code>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
