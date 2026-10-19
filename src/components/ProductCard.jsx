
import { useState } from "react";

function ProductCard({ product }) {
  const [imageError, setImageError] = useState(false);

  const {
    title,
    description,
    price,
    category,
    thumbnail,
    rating,
    discountPercentage,
  } = product;

  const formattedPrice =
    typeof price === "number" && Number.isFinite(price)
      ? `$${price.toFixed(2)}`
      : "Price unavailable";

  const formattedRating =
    typeof rating === "number" && Number.isFinite(rating)
      ? rating.toFixed(1)
      : "N/A";

  const formattedCategory = category
    ? category.replace(/-/g, " ")
    : "Uncategorized";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Product Image */}
      <div className="relative flex h-56 items-center justify-center bg-slate-100 p-5 sm:h-60">
        {thumbnail && !imageError ? (
          <img
            src={thumbnail}
            alt={title || "Product"}
            loading="lazy"
            onError={() => setImageError(true)}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div
            role="img"
            aria-label="Product image unavailable"
            className="flex h-full items-center justify-center text-center text-sm text-slate-400"
          >
            No Image Available
          </div>
        )}

        {typeof discountPercentage === "number" &&
          discountPercentage > 0 && (
            <span className="absolute right-3 top-3 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
              -{discountPercentage.toFixed(0)}%
            </span>
          )}
      </div>

      {/* Product Information */}
      <div className="flex flex-1 flex-col p-5">
        <span className="w-fit rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium capitalize text-indigo-600">
          {formattedCategory}
        </span>

        <h3 className="mt-3 line-clamp-2 min-h-12 text-lg font-semibold text-slate-900">
          {title || "Untitled Product"}
        </h3>

        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-500">
          {description || "No description available."}
        </p>

        <div className="mt-auto pt-5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-4">
            <p className="text-2xl font-bold text-indigo-600">
              {formattedPrice}
            </p>

            <span className="rounded-lg bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700">
              ⭐ {formattedRating}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
