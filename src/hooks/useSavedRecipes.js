import { useContext } from "react";

import { SavedRecipesContext } from "@/context/SavedRecipesContext";

const useSavedRecipes = () => {
  const context = useContext(SavedRecipesContext);

  if (!context) {
    throw new Error(
      "useSavedRecipes must be used within SavedRecipesProvider"
    );
  }

  return context;
};

export default useSavedRecipes;