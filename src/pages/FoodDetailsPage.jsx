import { useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Users, Leaf } from "lucide-react";

import FoodDetailHeader from "@/components/foodDetails/FoodDetailHeader";
import useSavedRecipes from "@/hooks/useSavedRecipes";

import { MenuItems } from "@/data/MenuItems";
import { getMenuItemById } from "@/utils/menuUtils";
import IngredientsSection from "../components/foodDetails/IngredientsSection";

const FoodDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    savedCount,
    addRecipe,
    isSaved,
  } = useSavedRecipes();

  const menuItem = useMemo(() => {
    return getMenuItemById(MenuItems, id);
  }, [id]);

  const saved = useMemo(() => {
    if (!menuItem) return false;

    return isSaved(menuItem.id);
  }, [menuItem, isSaved]);

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleSavedRecipes = useCallback(() => {
    navigate("/saved-recipes");
  }, [navigate]);

  const handleSaveRecipe = useCallback(() => {
    if (!menuItem) return;

    if(!isSaved(menuItem.id)) {
      addRecipe(menuItem);
    }
  }, [menuItem, isSaved, addRecipe]);

  if (!menuItem) {
    return (
      <main className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6">
        <h1 className="text-3xl font-bold">
          Menu Item Not Found
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-8 sm:px-6 lg:px-8">

        <FoodDetailHeader
          savedCount={savedCount}
          isSaved={saved}
          onBack={handleBack}
          onSavedRecipes={handleSavedRecipes}
          onSaveRecipe={handleSaveRecipe}
        />

        <section className="grid gap-10 lg:grid-cols-2">

          <img
            src={menuItem.image}
            alt={menuItem.name}
            className="aspect-video w-full rounded-xl object-cover"
          />

          <div className="flex flex-col gap-6">

            <div className="flex gap-3">

              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                {menuItem.category}
              </span>

              <span
                className={`rounded-full px-3 py-1 text-sm font-medium ${
                  menuItem.isVeg
                    ? "bg-green-500/15 text-green-500"
                    : "bg-red-500/15 text-red-500"
                }`}
              >
                {menuItem.isVeg ? <><Leaf size={12} className="inline-block mr-1" /> Veg</> : "Non-Veg"}
              </span>

            </div>

            <h1 className="text-5xl font-bold text-text">
              {menuItem.name}
            </h1>

            <p className="text-lg text-text-secondary">
              <Users size={20} className="inline-block" />
              &nbsp;{menuItem.servings} servings
            </p>

            <p className="text-lg leading-8 text-text-secondary">
              {menuItem.fullDescription}
            </p>

          </div>

        </section>

        <IngredientsSection ingredients={menuItem.ingredients} />

      </div>
    </main>
  );
};

export default FoodDetailPage;