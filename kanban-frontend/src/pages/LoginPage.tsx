


import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const { login, register, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (isRegister) {
        await register(email, password, username);
      } else {
        await login(email, password);
      }
      navigate('/board'); 
    } catch (err: any) {
      
      setError(err.response?.data?.message || 'Authentication failed. Please check your credentials.');
      console.error('Authentication error:', err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800 text-white">
      <div className="bg-white-800 p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-400">
          {isRegister ? 'Register' : 'Login'}
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-red-300 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-800 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {isRegister && (
            <div>
              <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required={isRegister}
              />
            </div>
          )}
          <div>
            <label className="block text-white-300 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : (isRegister ? 'Register' : 'Login')}
          </button>
        </form>
        <p className="text-center text-gray-400 text-sm mt-6">
          {isRegister ? 'Already have an account?' : 'Don\'t have an account?'}
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-blue-400 hover:text-blue-300 ml-1 font-bold"
          >
            {isRegister ? 'Login here.' : 'Register here.'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;