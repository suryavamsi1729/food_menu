import { memo } from 'react';
import { Search } from 'lucide-react';

import Select from '@/components/ui/Select';

const FilterBar = ({
  search,
  onSearchChange,
  onSearchKeyChange,

  category,
  onCategoryChange,

  diet,
  onDietChange,

  categoryOptions,
  dietOptions,
}) => {
  return (
    <section className="mt-6">
      <div className="grid gap-4 md:grid-cols-[1fr_380px]">
        <div className="relative max-w-lg">
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search dishes..."
            className={`peer w-full h-full min-w-64  md:min-w-72 py-3 md:py-2 px-4 pr-10 border border-card-border rounded-full text-sm text-text-muted bg-black focus-within:outline-none focus-within:border-card-border focus-within:ring-2 focus-within:ring-primary`}
          />
          <button
            onClick={() => onSearchKeyChange(search)}
            className="absolute right-1.75 top-1/2 -translate-y-1/2 flex items-center p-2 bg-primary rounded-full cursor-pointer"
          >
            <Search size={16} className="" />
          </button>
        </div>

        <div className="flex flex-row justify-center items-center gap-4">
          <Select
            value={category}
            onChange={onCategoryChange}
            options={categoryOptions}
            placeholder="Category"
          />

          <Select value={diet} onChange={onDietChange} options={dietOptions} placeholder="Diet" />
        </div>
      </div>
    </section>
  );
};

export default memo(FilterBar);
