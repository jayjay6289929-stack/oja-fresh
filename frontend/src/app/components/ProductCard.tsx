import React from "react";
import { Link } from "react-router";
import { ShoppingCart, Star } from "lucide-react";
import { Product } from "../types";
import { useCart } from "../store/CartContext";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl border-2 border-emerald-100 shadow-sm overflow-hidden group h-full flex flex-col hover:shadow-md transition-all"
    >
      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-emerald-50">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.tags.length > 0 && (
          <div className="absolute top-2 left-2 flex flex-wrap gap-1">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="bg-amber-500 text-emerald-950 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center space-x-1 mb-2">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="text-xs text-gray-600">{product.rating} ({product.reviews})</span>
        </div>
        <Link
          to={`/product/${product.id}`}
          className="text-gray-900 mb-1 group-hover:text-emerald-700 transition-colors line-clamp-1"
        >
          {product.name}
        </Link>
        <p className="text-gray-500 text-xs line-clamp-2 mb-4 flex-1">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-emerald-50">
          <span className="text-lg text-gray-900">{formatPrice(product.price)}</span>
          <button
            onClick={() => addToCart(product)}
            className="bg-emerald-700 hover:bg-emerald-800 text-white p-2 rounded-xl transition-colors shadow-sm"
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};