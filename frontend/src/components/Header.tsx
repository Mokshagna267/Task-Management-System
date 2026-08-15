import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const { token, isAuthenticated, logout, user } = useAuth();
  return (
    <header className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 shadow-lg text-white py-5 px-8 flex justify-between items-center rounded-b-3xl border-b-4 border-indigo-300">
      <Link 
        to={isAuthenticated ? "/dashboard" : "/"} 
        className="text-3xl font-extrabold tracking-tight drop-shadow-lg hover:text-yellow-200 transition-all duration-200"
      >
        🎯 Task Manager
      </Link>
      <nav className="flex items-center gap-6">
        {isAuthenticated ? (
          <>
            <Link to="/calendar" className="px-4 py-2 rounded-full bg-white/20 hover:bg-white/40 transition-all font-semibold shadow">Calendar</Link>
            <span className="hidden sm:inline text-lg font-medium bg-white/10 px-3 py-1 rounded-full shadow-inner">👋 <span className="font-bold text-yellow-200">{user?.name}</span></span>
            <button
              onClick={logout}
              className="bg-gradient-to-r from-yellow-300 to-pink-400 text-indigo-900 px-5 py-2 rounded-full shadow-md hover:scale-105 hover:from-yellow-400 hover:to-pink-500 transition-all font-bold border-2 border-white/30"
            >Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="px-4 py-2 rounded-full bg-white/20 hover:bg-white/40 transition-all font-semibold shadow">Login</Link>
            <Link to="/register" className="px-4 py-2 rounded-full bg-yellow-300 text-indigo-900 font-bold shadow hover:bg-yellow-400 transition-all">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;