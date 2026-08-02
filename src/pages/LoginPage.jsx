import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';

import useAuth from '@/hooks/useAuth';
import usePasswordToggle from '@/hooks/usePasswordToggle';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),

  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

const LogInPage = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const { showPassword, inputType, togglePassword } = usePasswordToggle();

  const [apiError, setApiError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    setApiError('');

    const result = await login(data.email, data.password);

    if (result.success) {
      navigate('/');
    } else {
      setApiError(result.message);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient">
      <form
        className="w-auto h-auto flex flex-col justify-start items-center gap-4 p-6 md:p-8 rounded-2xl bg-card border border-card-border"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col justify-center items-center gap-2 mb-2">
          <img src="/food_icon.png" alt="Logo" className="w-10 h-10" />
          <h1 className="text-xl font-semibold">Party Menu</h1>
          <p className="text-xs text-text-secondary ">Sign in to explore our delicious menu</p>

          {apiError && <p className="text-xs text-error">{apiError}</p>}
        </div>

        <div className="flex flex-col justify-center items-start gap-2 w-full">
          <label className="text-xs font-medium text-text-muted" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className={`w-full min-w-64 md:min-w-72 py-2 px-3 border rounded-xl text-sm bg-black focus-within:outline-none focus-within:border-card-border focus-within:ring-2 focus-within:ring-primary ${errors.email ? 'border-error' : 'border-card-border'}`}
            {...register('email')}
          />
          {errors.email && <span className="text-xs text-error">{errors.email.message}</span>}
        </div>

        <div className="flex flex-col justify-center items-start gap-2 w-full">
          <label className="text-xs font-medium text-text-muted" htmlFor="password">
            Password
          </label>
          <div className="relative w-full">
            <input
              id="password"
              type={inputType}
              placeholder="Enter your password"
              className={`w-full min-w-64 md:min-w-72 py-2 px-3 pr-10 border rounded-xl text-sm bg-black focus-within:outline-none focus-within:border-card-border focus-within:ring-2 focus-within:ring-primary ${errors.password ? 'border-error' : 'border-card-border'}`}
              {...register('password')}
            />
            <button
              type="button"
              className="absolute right-3 top-[calc(50%-8px)]  text-xs font-medium text-text-muted"
              onClick={togglePassword}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && <span className="text-xs text-error">{errors.password.message}</span>}
        </div>

        <button
          className="w-full min-w-64 md:min-w-72 py-2 px-3 mb-2 bg-primary hover:bg-primary-hover active:bg-primary-active text-xs font-medium text-text rounded-xl mt-2 cursor-pointer"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
};

export default LogInPage;
