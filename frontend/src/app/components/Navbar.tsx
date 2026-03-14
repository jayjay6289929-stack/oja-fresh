import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { ShoppingCart, Search, User, Menu, X, Leaf } from "lucide-react";
import { useCart } from "../store/CartContext";
import { motion, AnimatePresence } from "motion/react";

export const Navbar: React.FC = () => {
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Clear search input whenever the route changes
  useEffect(() => {
    setSearchQuery("");
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-emerald-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-emerald-700 p-1.5 rounded-lg">
              <Leaf className="w-6 h-6 text-amber-400" />
            </div>
            <span className="text-2xl tracking-tight text-gray-900">
              Ọjà<span className="text-emerald-700">Fresh</span>
            </span>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                placeholder="Search for yam, tomatoes, fish..."
                className="w-full bg-emerald-50 border border-emerald-200 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-900 placeholder:text-emerald-700/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-emerald-600" />
            </form>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/products" className="text-gray-600 hover:text-emerald-700 transition-colors">
              All Products
            </Link>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-emerald-700 transition-colors">
                <User className="w-6 h-6" />
              </button>
              <Link to="/cart" className="relative text-gray-600 hover:text-emerald-700 transition-colors">
                <ShoppingCart className="w-6 h-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-500 text-emerald-950 text-[10px] px-1.5 py-0.5 rounded-full min-w-[18px] flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/cart" className="relative text-gray-600">
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-500 text-emerald-950 text-[10px] px-1.5 py-0.5 rounded-full min-w-[18px] flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="text-gray-600 focus:outline-none"
            >
              {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-emerald-100 overflow-hidden"
          >
            <div className="px-4 pt-4 pb-6 space-y-4">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search ingredients..."
                  className="w-full bg-emerald-50 border border-emerald-200 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 w-5 h-5 text-emerald-600" />
              </form>
              <div className="flex flex-col space-y-4">
                <Link to="/"                                              className="text-gray-700 hover:text-emerald-700">Home</Link>
                <Link to="/products"                                      className="text-gray-700 hover:text-emerald-700">All Products</Link>
                <Link to="/products?category=Tubers%20%26%20Grains"      className="text-gray-700 hover:text-emerald-700">Tubers & Grains</Link>
                <Link to="/products?category=Fresh%20Vegetables"         className="text-gray-700 hover:text-emerald-700">Fresh Vegetables</Link>
                <Link to="/products?category=Proteins"                   className="text-gray-700 hover:text-emerald-700">Proteins</Link>
                <Link to="/products?category=Spices%20%26%20Seasonings"  className="text-gray-700 hover:text-emerald-700">Spices & Seasonings</Link>
                <div className="pt-4 border-t border-emerald-100">
                  <button className="flex items-center space-x-2 text-gray-700">
                    <User className="w-5 h-5 text-gray-400" />
                    <span>My Account</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};