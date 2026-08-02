import { memo, useState } from 'react';
import { ChevronDown } from 'lucide-react';

import { cn } from '@/utils/cn';

const IngredientsSection = ({ ingredients = [] }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <section className="rounded-2xl border border-card-border bg-card">
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className="
          flex w-full items-center justify-between
          border-b border-card-border
          px-6 py-5
          text-left
        "
      >
        <h2 className="text-2xl font-semibold text-text">Ingredients</h2>

        <ChevronDown
          size={22}
          className={cn('transition-transform duration-300', expanded && 'rotate-180')}
        />
      </button>

      <div
        className={cn(
          'grid transition-all duration-300 ease-in-out',
          expanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        )}
      >
        <div className="overflow-hidden">
          <ul className="px-6 py-2">
            {ingredients.map((ingredient) => (
              <li
                key={ingredient.name}
                className="
                  flex items-center justify-between
                  border-b border-card-border
                  py-5
                  last:border-none
                "
              >
                <span className="font-medium text-text">{ingredient.name}</span>

                <span className="text-text-secondary">{ingredient.quantity}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default memo(IngredientsSection);
