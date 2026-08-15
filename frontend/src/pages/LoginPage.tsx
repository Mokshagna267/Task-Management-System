import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useAuth, User } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const loginSchema = yup.object({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().required('Password is required'),
}).required();

type LoginFormData = yup.InferType<typeof loginSchema>;

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const responseData = await res.json();
      if (!res.ok) throw new Error(responseData.message || 'Login failed');
      login(responseData.token, responseData.user as User);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (err: any) {
      toast.error(err.message);
      setError('root', { message: err.message });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white/90 p-10 rounded-3xl shadow-2xl w-full max-w-md border-2 border-blue-200">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 drop-shadow-lg">Login</h2>
        
        {errors.root && (
          <div className="text-red-500 mb-4 text-center font-semibold">{errors.root.message}</div>
        )}

        <div className="mb-5">
          <input
            type="email"
            placeholder="Email"
            {...register('email')}
            className={`w-full p-3 border-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg ${errors.email ? 'border-red-300' : 'border-blue-200'}`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1 ml-3">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            {...register('password')}
            className={`w-full p-3 border-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg ${errors.password ? 'border-red-300' : 'border-blue-200'}`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1 ml-3">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold p-3 rounded-full shadow hover:from-blue-600 hover:to-indigo-600 transition-all text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
        
        <p className="mt-6 text-center text-indigo-700 font-semibold">
          Don't have an account? <Link to="/register" className="text-blue-600 underline hover:text-indigo-600">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;