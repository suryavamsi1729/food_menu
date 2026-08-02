import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { STORAGE_KEYS } from "@/config/storage";

const SavedRecipesContext = createContext(null);

const initializeSavedRecipes = () => {
  try {
    const savedRecipes = localStorage.getItem(
      STORAGE_KEYS.SAVED_RECIPES
    );

    return savedRecipes ? JSON.parse(savedRecipes) : [];
  } catch (error) {
    console.error("Failed to load saved recipes:", error);
    return [];
  }
};

const SavedRecipesProvider = ({ children }) => {
  const [savedRecipes, setSavedRecipes] = useState(initializeSavedRecipes());

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.SAVED_RECIPES,
      JSON.stringify(savedRecipes)
    );
  }, [savedRecipes]);

  const addRecipe = useCallback((recipe) => {
    setSavedRecipes((prev) => {
      if (prev.some((item) => item.id === recipe.id)) {
        return prev;
      }

      return [...prev, recipe];
    });
  }, []);

  const removeRecipe = useCallback((id) => {
    setSavedRecipes((prev) =>
      prev.filter((item) => item.id !== id)
    );
  }, []);

  const toggleRecipe = useCallback((recipe) => {
    setSavedRecipes((prev) => {
      const exists = prev.some(
        (item) => item.id === recipe.id
      );

      if (exists) {
        return prev.filter(
          (item) => item.id !== recipe.id
        );
      }

      return [...prev, recipe];
    });
  }, []);

  const isSaved = useCallback(
    (id) => {
      return savedRecipes.some(
        (item) => item.id === id
      );
    },
    [savedRecipes]
  );

  const clearSavedRecipes = useCallback(() => {
    setSavedRecipes([]);
  }, []);

  const value = useMemo(
    () => ({
      savedRecipes,

      savedCount: savedRecipes.length,

      addRecipe,

      removeRecipe,

      toggleRecipe,

      isSaved,

      clearSavedRecipes,
    }),
    [
      savedRecipes,
      addRecipe,
      removeRecipe,
      toggleRecipe,
      isSaved,
      clearSavedRecipes,
    ]
  );

  return (
    <SavedRecipesContext.Provider value={value}>
      {children}
    </SavedRecipesContext.Provider>
  );
};

export {
  SavedRecipesProvider,
  SavedRecipesContext,
};