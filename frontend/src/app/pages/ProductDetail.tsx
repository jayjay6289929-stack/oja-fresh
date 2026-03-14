import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { Product } from "../types";
import { fetchProductById } from "../api/products";
import { useCart } from "../store/CartContext";
import { Star, Minus, Plus, ShoppingCart, ArrowLeft, ShieldCheck, Truck, Leaf, Heart } from "lucide-react";
import { motion } from "motion/react";
import { ProductCard } from "../components/ProductCard";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { fetchProducts } from "../api/products";

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isWishlist, setIsWishlist] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setQuantity(1);

    fetchProductById(id)
      .then((data) => {
        setProduct(data);
        // fetch related products in the same category
        return fetchProducts({ category: data.category });
      })
      .then((all) => {
        setRelatedProducts(all.filter((p) => p.id !== id).slice(0, 4));
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-700 rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl mb-4">Product not found</h2>
        <Link to="/products" className="text-emerald-700 hover:underline">
          Back to shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/products" className="inline-flex items-center space-x-2 text-gray-600 hover:text-emerald-700 mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to products</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-24">
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative rounded-3xl overflow-hidden aspect-square md:aspect-[4/3] lg:aspect-square bg-emerald-50 shadow-2xl border-2 border-emerald-100"
        >
          <ImageWithFallback
            src={product.image ?? ""}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={() => setIsWishlist(!isWishlist)}
            className="absolute top-4 right-4 bg-white/80 backdrop-blur-md p-3 rounded-full hover:bg-white transition-colors shadow-lg"
          >
            <Heart className={`w-6 h-6 ${isWishlist ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
          </button>
          {product.tags && product.tags.length > 0 && (
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-amber-500 text-emerald-950 text-xs px-3 py-1 rounded-full uppercase tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </motion.div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col h-full"
        >
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <span className="bg-emerald-100 text-emerald-800 text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                {product.category}
              </span>
              <div className="flex items-center space-x-1 border-l border-gray-200 ml-2 pl-3">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-sm text-gray-900">{product.rating}</span>
                <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl text-gray-900 mb-4">{product.name}</h1>
            <p className="text-3xl text-emerald-700">{formatPrice(product.price)}</p>
          </div>

          <div className="prose prose-sm text-gray-600 max-w-none mb-10 leading-relaxed text-lg">
            <p>{product.description}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 border-t border-b border-emerald-100 py-8">
            <div className="flex items-center space-x-3">
              <div className="bg-emerald-50 p-2 rounded-lg">
                <Truck className="w-5 h-5 text-emerald-700" />
              </div>
              <div>
                <p className="text-sm text-gray-900">Same-Day Delivery</p>
                <p className="text-xs text-gray-500">Delivered within hours</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-emerald-50 p-2 rounded-lg">
                <Leaf className="w-5 h-5 text-emerald-700" />
              </div>
              <div>
                <p className="text-sm text-gray-900">Farm Fresh</p>
                <p className="text-xs text-gray-500">100% organic & natural</p>
              </div>
            </div>
          </div>

          <div className="mt-auto space-y-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center border-2 border-emerald-200 rounded-2xl px-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 text-gray-400 hover:text-emerald-700 transition-colors"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="w-12 text-center text-xl">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 text-gray-400 hover:text-emerald-700 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <button
                onClick={() => addToCart(product, quantity)}
                className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white py-4 rounded-2xl flex items-center justify-center space-x-3 shadow-xl shadow-emerald-200 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <ShoppingCart className="w-6 h-6" />
                <span>Add to Cart — {formatPrice(product.price * quantity)}</span>
              </button>
            </div>
            <div className="flex items-center justify-center space-x-2 text-gray-500 text-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>Secure checkout powered by Paystack</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-24">
          <h2 className="text-3xl text-gray-900 mb-8">Similar Ingredients</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};