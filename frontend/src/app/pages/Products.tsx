import React, { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router";
import { Product } from "../types";
import { fetchProducts } from "../api/products";
import { ProductCard } from "../components/ProductCard";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const CATEGORIES = ["All", "Tubers & Grains", "Fresh Vegetables", "Proteins", "Spices & Seasonings"] as const;

const SORT_MAP: Record<string, string> = {
  "Popularity":          "popularity",
  "Rating":              "rating",
  "Price: Low to High":  "price_asc",
  "Price: High to Low":  "price_desc",
};

export const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("Popularity");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const filterRef = useRef<HTMLDivElement>(null);

  const activeCategory = searchParams.get("category") || "All";
  const searchQuery    = searchParams.get("search")   || "";

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Fetch products whenever filters or sort change
  useEffect(() => {
    setLoading(true);
    fetchProducts({
      category: activeCategory !== "All" ? activeCategory : undefined,
      search:   searchQuery || undefined,
      sort:     SORT_MAP[sortBy] ?? "popularity",
    })
      .then(setProducts)
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [activeCategory, searchQuery, sortBy]);

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams);
    if (category === "All") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    setSearchParams(params);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl text-gray-900 mb-2">Farm Fresh Ingredients</h1>
          <p className="text-gray-600">
            {loading ? "Loading..." : `${products.length} products available`}
            {!loading && searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <div ref={filterRef} className="relative">
            <button
              onClick={() => setIsFilterOpen((prev) => !prev)}
              className="flex items-center space-x-2 bg-white border-2 border-emerald-200 px-4 py-2.5 rounded-xl text-sm hover:border-emerald-600 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Sort: {sortBy}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-48 bg-white border-2 border-emerald-100 rounded-xl shadow-xl z-20 py-2"
                >
                  {["Popularity", "Rating", "Price: Low to High", "Price: High to Low"].map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSortBy(option);
                        setIsFilterOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-emerald-50 hover:text-emerald-700 transition-colors ${
                        sortBy === option ? "text-emerald-700 bg-emerald-50" : "text-gray-600"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center space-x-2 mb-12 overflow-x-auto pb-4 no-scrollbar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-6 py-3 rounded-full text-sm whitespace-nowrap transition-all ${
              activeCategory === cat
                ? "bg-emerald-700 text-white shadow-lg shadow-emerald-200"
                : "bg-white border-2 border-emerald-200 text-gray-700 hover:border-emerald-600 hover:text-emerald-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border-2 border-emerald-100 h-80 animate-pulse" />
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border-2 border-emerald-100">
          <div className="bg-emerald-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-10 h-10 text-emerald-300" />
          </div>
          <h3 className="text-2xl text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600 mb-8 max-w-sm mx-auto">
            We couldn't find any ingredients matching your search or filters. Try adjusting them or clear everything.
          </p>
          <button
            onClick={() => {
              setSearchParams({});
              setSortBy("Popularity");
            }}
            className="bg-emerald-700 text-white px-8 py-3 rounded-full hover:bg-emerald-800 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Recommended Section (mobile only) */}
      {!loading && products.length > 0 && (
        <div className="md:hidden mt-20">
          <h2 className="text-2xl mb-6">You might also like</h2>
          <div className="flex space-x-4 overflow-x-auto pb-6 no-scrollbar">
            {products.slice(0, 4).map((p) => (
              <div key={p.id} className="min-w-[280px]">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};