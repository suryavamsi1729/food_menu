import { useCallback, useMemo, useState, useDeferredValue } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '@/components/layout/Header';
import FilterBar from '@/components/layout/FilterBar';

import useAuth from '@/hooks/useAuth';

import { MenuItems } from '@/data/MenuItems';
import MenuItemCard from '../components/common/MenuItemCard';

import { filterMenuItems } from '@/utils/menuUtils';

const CATEGORY_OPTIONS = [
  { label: 'All', value: 'all' },
  { label: 'Starter', value: 'starter' },
  { label: 'Main', value: 'main' },
  { label: 'Sides', value: 'sides' },
  { label: 'Dessert', value: 'dessert' },
];

const DIET_OPTIONS = [
  { label: 'All', value: 'all' },
  { label: 'Veg', value: 'veg' },
  { label: 'Non Veg', value: 'nonveg' },
];

const MenuPage = () => {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [items] = useState(MenuItems);

  const [search, setSearch] = useState('');
  const [searchKey, setSearchKey] = useState('');
  const [category, setCategory] = useState('all');
  const [diet, setDiet] = useState('all');

  const filteredItems = useMemo(
    () =>
      filterMenuItems(items, {
        search: searchKey,
        category,
        diet,
      }),
    [category, diet, searchKey, items]
  );

  const handleSavedRecipes = useCallback(() => {
    navigate('/saved-recipes');
  }, [navigate]);

  const handleLogout = useCallback(() => {
    logout();
    navigate('/signin', { replace: true });
  }, [logout, navigate]);

  const handleCardClick = useCallback(
    (id) => {
      navigate(`/menu/${id}`);
    },
    [navigate]
  );

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <Header
          user={user}
          savedCount={0}
          onSavedRecipes={handleSavedRecipes}
          onLogout={handleLogout}
        />
        <FilterBar
          search={search}
          onSearchChange={setSearch}
          onSearchKeyChange={setSearchKey}
          category={category}
          onCategoryChange={setCategory}
          diet={diet}
          onDietChange={setDiet}
          categoryOptions={CATEGORY_OPTIONS}
          dietOptions={DIET_OPTIONS}
        />
        {filteredItems.length > 0 && (
          <p className="mt-6 text-sm text-text-secondary">
            {`${filteredItems.length} items found`}
          </p>
        )}
        <section className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredItems.length > 0 && (
            <>
              {filteredItems.map((item) => (
                <div key={item.id} className="w-full">
                  <MenuItemCard item={item} onClick={handleCardClick} />
                </div>
              ))}
            </>
          )}
          {filteredItems.length === 0 && (
            <div className="mt-8 col-span-full h-72 flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-card-border bg-[#1A1A22]/20 p-8 text-center shadow-2xl shadow-black/20">
              <p className=" font-medium uppercase tracking-[0.25em] text-text-muted">
                No items found
              </p>
              <p className="text-sm text-text-secondary">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default MenuPage;
