import { memo } from "react";
import { ArrowLeft, Bookmark, Check, Heart } from "lucide-react";

import { cn } from "@/utils/cn";

const FoodDetailHeader = ({
  savedCount = 0,
  isSaved = false,
  onBack,
  onSavedRecipes,
  onSaveRecipe,
  className,
}) => {
  return (
    <header
      className={cn(
        "flex flex-col gap-4 md:flex-row md:items-center md:justify-between",
        className
      )}
    >

      <button
        onClick={onBack}
        className="w-fit flex flex-row items-center gap-2 rounded-lg border border-card-border bg-card-bg px-2 py-2 text-sm font-semibold transition-colors hover:border-primary hover:text-primary cursor-pointer"
      >
        <ArrowLeft size={18} />
        Back to Menu
      </button>

      <div className="flex flex-col gap-6 sm:flex-row">
        <button
          onClick={onSavedRecipes}
          className="relative w-fit flex flex-row items-center gap-2 rounded-lg border border-card-border bg-card-bg px-2 py-2 text-sm font-semibold transition-colors hover:border-primary hover:text-primary cursor-pointer"
        >
          <Bookmark size={18} />
          Saved Recipes
          {savedCount > 0 && (
            <span
              className="
                absolute
                -right-2
                -top-2
                flex
                h-5
                min-w-5
                items-center
                justify-center
                rounded-full
                bg-primary
                px-1
                text-[11px]
                font-semibold
                text-white
              "
            >
              {savedCount}
            </span>
          )}
        </button>

        <button
            onClick={onSaveRecipe}
            className={cn(
                "w-fit flex flex-row items-center gap-2 rounded-lg border border-card-border bg-card-bg px-2 py-2 text-sm font-semibold transition-colors hover:border-primary hover:text-primary cursor-pointer",  
                isSaved && "px-4 border-success text-success hover:border-success/80 hover:text-success/80"
            )}
        >
          {isSaved ? (
            <>
              <Check size={18} />

              Saved
            </>
          ) : (
            <>
              <Heart size={18} />

              Save Recipe
            </>
          )}
        </button>
      </div>
    </header>
  );
};

export default memo(FoodDetailHeader);