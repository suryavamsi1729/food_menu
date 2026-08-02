import { Heart, LogOut } from 'lucide-react';
import { memo } from 'react';
import { cn } from '@/utils/cn';

const Header = ({ user, savedCount = 0, onSavedRecipes, onLogout, className }) => {
  return (
    <header
      className={cn(
        'flex flex-col gap-6 md:flex-row md:items-center md:justify-between',
        className
      )}
    >
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12  md:h-14 md:w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <img src="/food_icon.png" alt="Logo" className="h-7 w-7 md:h-8 md:w-8" />
        </div>

        <div>
          <h1 className="text-xl md:text-2xl font-bold text-text sm:text-3xl">Party Menu</h1>

          <p className="mt-0.5 md:mt-1 text-sm md:text-sm text-text-secondary sm:text-base">
            Welcome, {user?.name}
          </p>
        </div>
      </div>

      <div className="flex w-full flex-row items-center justify-between gap-4 md:w-auto md:justify-end">
        <button
          onClick={onSavedRecipes}
          className="
            relative
            flex w-full items-center justify-center gap-2
            rounded-lg
            border border-card-border
            bg-card
            px-4 py-3
            text-xs md:text-sm font-medium
            transition-all
            hover:border-primary
            hover:bg-card/80
            sm:w-auto
            cursor-pointer
          "
        >
          <Heart size={18} />

          <span>Saved Recipes</span>

          {savedCount > 0 && (
            <span
              className="
                absolute
                -right-2
                -top-2
                flex h-5 min-w-5 items-center justify-center
                rounded-full
                bg-primary
                px-1
                text-[10px] md:text-[11px]
                font-semibold
                text-white
              "
            >
              {savedCount}
            </span>
          )}
        </button>

        <button
          onClick={onLogout}
          className="
            flex w-full items-center justify-center gap-2
            rounded-lg
            border border-card-border
            bg-card
            px-4 py-3
            text-sm font-medium
            transition-all
            hover:border-red-500
            hover:text-red-500
            sm:w-auto
            cursor-pointer
          "
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </header>
  );
};

export default memo(Header);
