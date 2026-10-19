
import { useState, useEffect } from "react";
import ProductCard from "./components/ProductCard";

const API_URL = "https://dummyjson.com/products?limit=0";

function App() {
  // Product data
  const [products, setProducts] = useState([]);

  // Search and category filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("all");

  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch products from DummyJSON API
  useEffect(() => {
    const controller = new AbortController();

    async function fetchProducts() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(
            "Failed to fetch products. Please try again."
          );
        }

        const data = await response.json();

        if (!controller.signal.aborted) {
          setProducts(data.products || []);
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(
            err.message || "Something went wrong."
          );
          setProducts([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchProducts();

    return () => controller.abort();
  }, []);

  // Create category list from product data
  const categories = [
    "all",
    ...new Set(
      products
        .map((product) => product.category)
        .filter(Boolean)
    ),
  ];

  // Format category names
  const formatCategory = (category) => {
    if (category === "all") {
      return "All Products";
    }

    return category
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  // Filter by search query and selected category
  const filteredProducts = products.filter((product) => {
    const query = searchQuery.trim().toLowerCase();

    const matchesSearch =
      (product.title || "")
        .toLowerCase()
        .includes(query) ||
      (product.description || "")
        .toLowerCase()
        .includes(query) ||
      (product.category || "")
        .toLowerCase()
        .includes(query);

    const matchesCategory =
      selectedCategory === "all" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Clear search only
  const handleClearSearch = () => {
    setSearchQuery("");
  };

  // Reset both filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">

      {/* NAVIGATION BAR */}
      <nav className="border-b border-slate-200 bg-white px-5 py-5 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">

          <h1 className="text-xl font-bold text-indigo-600 sm:text-2xl">
            🛍️ Product Explorer
          </h1>

          <p className="hidden text-sm text-slate-500 sm:block">
            Discover Products Easily
          </p>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6">

        {/* PAGE HEADING */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Explore Our Products
          </h2>

          <p className="mt-3 text-slate-500">
            Search and discover products across
            different categories.
          </p>
        </div>

        {/* PRODUCT SEARCH */}
        <div className="mx-auto mb-10 max-w-2xl">

          <label
            htmlFor="product-search"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Search Products
          </label>

          <div className="flex flex-col gap-3 sm:flex-row">

            <input
              id="product-search"
              type="search"
              placeholder="Search by name, description, or category..."
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(e.target.value)
              }
              className="w-full min-w-0 flex-1 rounded-xl border border-slate-300 bg-white px-5 py-4 text-slate-900 shadow-sm outline-none placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="rounded-xl border border-indigo-200 bg-indigo-50 px-6 py-4 font-semibold text-indigo-600 transition hover:bg-indigo-100"
              >
                Clear Search
              </button>
            )}
          </div>
        </div>

        {/* PRODUCT LAYOUT */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">

          {/* CATEGORY SIDEBAR */}
          <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:self-start">

            <h3 className="mb-5 text-lg font-semibold">
              Categories
            </h3>

            <div
              className="max-h-96 space-y-2 overflow-y-auto"
              aria-label="Product categories"
            >
              {categories.map((category) => {
                const isSelected =
                  selectedCategory === category;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() =>
                      setSelectedCategory(category)
                    }
                    aria-pressed={isSelected}
                    className={`block w-full rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                      isSelected
                        ? "bg-indigo-600 text-white shadow-md"
                        : "bg-slate-50 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600"
                    }`}
                  >
                    {formatCategory(category)}
                  </button>
                );
              })}
            </div>

            {(selectedCategory !== "all" ||
              searchQuery.trim()) && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="mt-6 w-full rounded-xl border border-indigo-200 px-4 py-3 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50"
              >
                Reset All Filters
              </button>
            )}
          </aside>

          {/* PRODUCT SECTION */}
          <section className="min-w-0 lg:col-span-3">

            {/* RESULTS HEADING */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">

              <h3 className="text-xl font-semibold">
                {selectedCategory === "all"
                  ? searchQuery.trim()
                    ? "Search Results"
                    : "All Products"
                  : formatCategory(selectedCategory)}
              </h3>

              {!loading && !error && (
                <span
                  role="status"
                  className="text-sm text-slate-500"
                >
                  {filteredProducts.length} products found
                </span>
              )}
            </div>

            {/* LOADING MESSAGE */}
            {loading && (
              <div
                role="status"
                className="py-16 text-center"
              >
                <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />

                <p className="text-slate-500">
                  Loading products...
                </p>
              </div>
            )}

            {/* API ERROR */}
            {!loading && error && (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-600"
              >
                {error}
              </div>
            )}

            {/* NO MATCHING PRODUCTS */}
            {!loading &&
              !error &&
              filteredProducts.length === 0 && (
                <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">

                  <div className="mb-4 text-5xl">
                    🔍
                  </div>

                  <h3 className="text-xl font-semibold">
                    No products found
                  </h3>

                  <p className="mt-2 text-slate-500">
                    Try a different search or category.
                  </p>

                  {(searchQuery ||
                    selectedCategory !== "all") && (
                    <button
                      type="button"
                      onClick={handleResetFilters}
                      className="mt-5 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
                    >
                      Reset Filters
                    </button>
                  )}
                </div>
              )}

            {/* FILTERED PRODUCT GRID */}
            {!loading &&
              !error &&
              filteredProducts.length > 0 && (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">

                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                    />
                  ))}

                </div>
              )}
          </section>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white px-4 py-6 text-center text-sm text-slate-500">

        <p>
          Product Explorer | React.js & Tailwind CSS
        </p>

        <p className="mt-2">
          Product data provided by DummyJSON
        </p>
      </footer>
    </div>
  );
}

export default App;
