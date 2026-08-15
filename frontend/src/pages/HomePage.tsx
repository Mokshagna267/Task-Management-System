import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-100">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center">
          <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 mb-8">
            🎯 Task Manager
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Organize your life, boost your productivity, and achieve your goals with our intuitive task management platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              to="/register"
              className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transition-all transform hover:scale-105"
            >
              Get Started Free
            </Link>
            <Link
              to="/login"
              className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full text-lg shadow-lg border-2 border-blue-200 hover:bg-blue-50 transition-all transform hover:scale-105"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📝</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Easy Task Management</h3>
            <p className="text-gray-600">Create, organize, and track your tasks with our intuitive interface.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📅</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Calendar View</h3>
            <p className="text-gray-600">Visualize your tasks on a calendar to better plan your schedule.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Smart Filtering</h3>
            <p className="text-gray-600">Filter and search tasks by priority, status, and due date.</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-indigo-700 mb-4">Ready to boost your productivity?</h2>
          <p className="text-gray-600 mb-8">Join thousands of users who have transformed their task management.</p>
          <Link
            to="/register"
            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transition-all transform hover:scale-105"
          >
            Start Managing Tasks Today
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 