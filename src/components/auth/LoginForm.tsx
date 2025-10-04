import { useState } from 'react';
import type { FormEvent } from 'react';
import { useAuth } from '../../contexts/AuthContext.js';
import { EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

interface LoginFormProps {
  onLoginSuccess: () => void;
}

export const LoginForm = ({ onLoginSuccess }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    const result = await login(email, password);
    if (result.success) {
      onLoginSuccess();
    } else {
      setError(result.message || 'Login gagal. Silakan periksa kembali kredensial Anda.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-indigo-300/30 to-purple-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-300/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-blue-300/10 to-indigo-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="w-full max-w-md relative z-10 animate-fade-in">
        <div className="relative overflow-hidden rounded-3xl bg-white/70 supports-[backdrop-filter]:bg-white/50 backdrop-blur-xl shadow-2xl border border-white/20">
          {/* Glassmorphism overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 pointer-events-none"></div>
          
          <div className="relative px-8 pt-10 pb-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 text-sm font-bold shadow-lg">
                <span className="relative">
                  Transellia Admin
                </span>
              </div>
              <h2 className="mt-6 text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Welcome Back
              </h2>
              <p className="mt-2 text-sm text-gray-600 font-medium">Sign in to access your admin dashboard</p>
            </div>
            <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="rounded-2xl bg-red-50/80 backdrop-blur-sm p-4 text-sm text-red-700 border border-red-200/50 animate-slide-up">
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {error}
                  </div>
                </div>
              )}
              <div className="space-y-5">
                <div className="group">
                  <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-2">Email address</label>
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 z-10">
                      <EnvelopeIcon className="h-5 w-5 text-gray-500 group-focus-within:text-indigo-600 transition-colors duration-200" />
                    </span>
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="block w-full rounded-2xl border-0 bg-white/60 backdrop-blur-sm pl-12 pr-4 py-3.5 text-gray-900 placeholder-gray-400 ring-1 ring-gray-200/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white/80 transition-all duration-200 text-sm shadow-sm"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="group">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 z-10">
                      <LockClosedIcon className="h-5 w-5 text-gray-500 group-focus-within:text-indigo-600 transition-colors duration-200" />
                    </span>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-2xl border-0 bg-white/60 backdrop-blur-sm pl-12 pr-12 py-3.5 text-gray-900 placeholder-gray-400 ring-1 ring-gray-200/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white/80 transition-all duration-200 text-sm shadow-sm"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 hover:text-indigo-600 focus:text-indigo-600 transition-colors duration-200"
                      onClick={() => setShowPassword((s) => !s)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                {/* <label className="flex items-center text-sm text-gray-600 font-medium">
                  <input type="checkbox" className="mr-3 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500/50 focus:ring-2" />
                  Remember me
                </label>
                <a className="text-sm font-semibold text-indigo-600 hover:text-indigo-500 transition-colors duration-200" href="#">
                  Forgot password?
                </a> */}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 text-sm font-bold text-white shadow-xl hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-200 hover:scale-[1.02] hover:shadow-2xl"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in…
                  </>
                ) : (
                  <>
                    Sign in to dashboard
                    <svg className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
        <p className="mt-8 text-center text-sm text-gray-500 font-medium">
          Secured by industry-standard encryption
          <span className="block mt-1 text-xs opacity-75">© 2024 Transellia. All rights reserved.</span>
        </p>
      </div>
    </div>
  );
};
