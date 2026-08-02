import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { ArrowLeft } from "lucide-react";

import MenuItemCard from "@/components/common/MenuItemCard";
import useSavedRecipes from "@/hooks/useSavedRecipes";

const SavedRecipesPage = () => {
  const navigate = useNavigate();

  const { savedRecipes, removeRecipe } = useSavedRecipes();

  const handleBack = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const handleCardClick = useCallback((id) => {
      navigate(`/menu/${id}`);
    },[navigate]);

  const handleRemove = useCallback((id) => {
      removeRecipe(id);
    },[removeRecipe]);

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-start md:justify-between">

          <div>
            <h1 className="text-2xl font-bold text-text">
              Saved Recipes
            </h1>

            <p className="mt-2 text-text-secondary">
              {savedRecipes.length} recipe
              {savedRecipes.length !== 1 && "s"} saved
            </p>
          </div>

          <button
            onClick={handleBack}
            className="w-fit flex flex-row items-center gap-2 rounded-lg border border-card-border bg-card-bg px-2 py-2 text-sm font-semibold transition-colors hover:border-primary hover:text-primary cursor-pointer"
          >
            <ArrowLeft size={18} />
            Back to Menu
          </button>
        </div>

        {savedRecipes.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-card-border py-20">

            <h2 className="text-2xl font-semibold">
              No saved recipes yet
            </h2>

            <p className="mt-3 text-text-secondary">
              Save your favourite dishes to access them later.
            </p>

            <button
              className="mt-6 bg-primary text-sm px-4 py-2 rounded-xl cursor-pointer"
              onClick={handleBack}
            >
              Browse Menu
            </button>

          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {savedRecipes.map((recipe) => (
              <MenuItemCard
                key={recipe.id}
                item={recipe}
                onClick={handleCardClick}
                onDelete={handleRemove}
              />
            ))}

          </div>
        )}

      </div>
    </main>
  );
};

export default SavedRecipesPage;