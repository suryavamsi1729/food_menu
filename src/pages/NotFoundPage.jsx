import { useNavigate } from 'react-router-dom';
import { SearchX } from 'lucide-react';

import useAuth from '@/hooks/useAuth';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient px-4 py-8">
      <div className="w-full max-w-lg flex flex-col items-center justify-center gap-4 rounded-2xl border border-card-border bg-card p-8 text-center shadow-2xl shadow-black/20">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <SearchX size={32} />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-text-muted">
            404 Error
          </p>
          <h1 className="text-3xl font-semibold text-text">Page Not Found</h1>
          <p className="text-sm leading-6 text-text-secondary">
            The page you’re looking for doesn’t exist or may have been moved.
          </p>
        </div>

        {isAuthenticated ? (
          <button
            type="button"
            onClick={() => navigate('/', { replace: true })}
            className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-text transition hover:bg-primary-hover active:bg-primary-active"
          >
            Back to Home
          </button>
        ) : (
          <button
            type="button"
            onClick={() => navigate('/signin', { replace: true })}
            className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-text transition hover:bg-primary-hover active:bg-primary-active"
          >
            Back to Login
          </button>
        )}
      </div>
    </div>
  );
};

export default NotFoundPage;
