import { memo } from "react";
import { Users } from "lucide-react";
import { cn } from "@/utils/cn";

const MenuItemCard = ({ item, onClick, className }) => {
  return (
    <article
      onClick={() => onClick(item.id)}
      className={cn(
        `
        group
        cursor-pointer
        overflow-hidden
        rounded-xl
        border border-card-border
        bg-card
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-primary
        hover:shadow-xl
        `,
        className
      )}
    >
      {/* Image */}

      <div className="relative overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="
            h-56
            w-full
            object-cover
            transition-transform
            duration-500
            group-hover:scale-105
          "
        />

        {/* Diet Badge */}

        <span
          className={cn(
            `
            absolute
            right-3
            top-3
            rounded-full
            px-3
            py-1
            text-xs
            font-semibold
            text-white
            `,
            item.isVeg
              ? "bg-green-600"
              : "bg-red-600"
          )}
        >
          {item.isVeg ? "Veg" : "Non Veg"}
        </span>
      </div>

      {/* Content */}

      <div className="space-y-3 p-5">
        {/* Category */}

        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
          {item.category}
        </p>

        {/* Name */}

        <h3 className="text-xl font-semibold text-text line-clamp-1">
          {item.name}
        </h3>

        {/* Description */}

        <p className="line-clamp-2 text-sm leading-6 text-text-secondary">
          {item.description}
        </p>

        {/* Servings */}

        <div className="flex items-center gap-2 text-sm text-text-muted">
          <Users size={16} />

          <span>{item.servings}</span>
        </div>
      </div>
    </article>
  );
};

export default memo(MenuItemCard);