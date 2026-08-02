import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/utils/cn";

const Select = ({
  options = [],
  value,
  onChange,
  placeholder = "Select",
  className,
}) => {
  const [open, setOpen] = useState(false);

  const selected = options.find((option) => option.value === value);

  return (
    <div
      tabIndex={0}
      onBlur={() => setOpen(false)}
      className={cn("relative w-full", className)}
    >
      {/* Trigger */}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="
          flex h-11 w-full items-center justify-between
          rounded-lg border border-card-border
          bg-card
          px-4
          text-sm
          text-text
          transition-all
          hover:border-primary
          focus:border-primary
          outline-none
          cursor-pointer
        "
      >
        <span className="truncate">
          {selected?.label || placeholder}
        </span>

        <ChevronDown
          size={18}
          className={cn(
            "transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      {/* Menu */}

      <div
        className={cn(
          `
          absolute left-0 right-0 top-full z-50 mt-2
          origin-top
          overflow-hidden
          rounded-lg
          border border-card-border
          bg-card
          shadow-xl

          transition-all duration-200 ease-out
          `,
          open
            ? "translate-y-0 scale-100 opacity-100"
            : "-translate-y-2 pointer-events-none scale-95 opacity-0"
        )}
      >
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onMouseDown={() => {
              onChange(option.value);
              setOpen(false);
            }}
            className={cn(
              `
              flex w-full items-center justify-between
              px-4 py-3
              text-left text-sm
              transition-colors
              hover:bg-white/5
              `,
              value === option.value &&
                "bg-primary/10 text-primary"
            )}
          >
            {option.label}

            {value === option.value && (
              <Check size={16} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Select;