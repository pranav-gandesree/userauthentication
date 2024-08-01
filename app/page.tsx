'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { setToken, setUser, clearAuth } from '@/redux/auth/auth.slice';
import useAuthSession from '../hooks/useAuthSession';
import { useAppDispatch } from '@/redux/store';
import axios from 'axios';
import Toast from '@/app/components/Toast';

type LoginFormInputs = {
  username: string;
  password: string;
};

const HomePage = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<LoginFormInputs>();
  const dispatch = useAppDispatch();
  const user = useAuthSession();
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const response = await axios.post('/api/login', data);
      const { token } = response.data;
      localStorage.setItem('token', token);
      dispatch(setToken(token));

      const userResponse = await axios.get('/api/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setUser(userResponse.data));
      setToast({ message: 'Login successful!', type: 'success' });
    } catch (error) {
      console.error('Login failed:', error);
      setToast({ message: 'Login failed. Please check your credentials.', type: 'error' });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(clearAuth());
    setToast({ message: 'Logout successful!', type: 'success' });
    reset(); // Reset the form fields
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        {user ? (
          <div>
            <h2 className="text-xl font-bold text-slate-600">Welcome, {user.username}</h2>
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 mt-6 font-bold text-white bg-red-500 rounded-md"
            >
              Logout
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-2xl font-bold text-center">Login</h2>
            <input
              type="text"
              {...register('username', { required: 'Username is required' })}
              placeholder="testuser"
              className="w-full px-4 py-2 mt-4 border rounded-md text-slate-600"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
            <input
              type="password"
              {...register('password', { required: 'Password is required' })}
              placeholder="password123"
              className="w-full px-4 py-2 mt-4 border rounded-md text-slate-600"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
            <button
              type="submit"
              className="w-full px-4 py-2 mt-6 font-bold text-white bg-blue-500 rounded-md"
            >
              Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default HomePage;
