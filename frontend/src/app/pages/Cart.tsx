import React from "react";
import { Link, useNavigate } from "react-router";
import { useCart, DELIVERY_FEE } from "../store/CartContext";
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems, vat, grandTotal } = useCart();
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <div className="bg-emerald-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
          <ShoppingBag className="w-12 h-12 text-emerald-300" />
        </div>
        <h1 className="text-4xl text-gray-900 mb-4">Your cart is empty</h1>
        <p className="text-gray-600 mb-10 max-w-sm mx-auto text-lg leading-relaxed">
          Ready to stock up on fresh Nigerian ingredients?
        </p>
        <Link
          to="/products"
          className="bg-emerald-700 hover:bg-emerald-800 text-white px-10 py-4 rounded-full shadow-xl shadow-emerald-200 transition-all inline-flex items-center space-x-2"
        >
          <span>Browse Ingredients</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-emerald-100">
            <h1 className="text-4xl text-gray-900">Your Cart</h1>
            <span className="text-gray-600">{totalItems} items</span>
          </div>

          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex flex-col sm:flex-row items-center bg-white p-6 rounded-3xl border-2 border-emerald-100 shadow-sm"
                >
                  <div className="w-full sm:w-24 h-24 rounded-2xl overflow-hidden bg-emerald-50 mb-4 sm:mb-0 sm:mr-6 shrink-0 shadow-inner">
                    <ImageWithFallback src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 text-center sm:text-left mb-4 sm:mb-0">
                    <Link to={`/product/${item.id}`} className="text-lg text-gray-900 hover:text-emerald-700 transition-colors">
                      {item.name}
                    </Link>
                    <p className="text-gray-500 text-sm mt-1">{item.category}</p>
                    <p className="text-emerald-700 mt-1">{formatPrice(item.price)}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8">
                    <div className="flex items-center border-2 border-emerald-100 rounded-xl px-2 bg-emerald-50">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 text-gray-400 hover:text-emerald-700 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 text-gray-400 hover:text-emerald-700 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-right min-w-[100px]">
                      <p className="text-lg text-gray-900">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <Link to="/products" className="inline-flex items-center space-x-2 text-emerald-700 mt-12 hover:underline">
            <ChevronLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {/* Summary Card — uses the same computed values as Checkout */}
        <div className="w-full lg:w-96">
          <div className="bg-white p-8 rounded-[2.5rem] border-2 border-emerald-100 shadow-2xl sticky top-24">
            <h2 className="text-2xl text-gray-900 mb-8">Order Summary</h2>
            <div className="space-y-6 text-sm mb-10 pb-8 border-b border-emerald-100">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Estimated Delivery</span>
                <span className="text-gray-900">{formatPrice(DELIVERY_FEE)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">VAT (7.5%)</span>
                <span className="text-gray-900">{formatPrice(vat)}</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-10">
              <span className="text-lg text-gray-900">Total</span>
              <span className="text-2xl text-emerald-700">{formatPrice(grandTotal)}</span>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-5 rounded-2xl shadow-xl shadow-emerald-200 transition-all flex items-center justify-center space-x-3 text-lg"
              >
                <span>Secure Checkout</span>
                <ArrowRight className="w-6 h-6" />
              </button>
              <p className="text-[10px] text-gray-500 text-center px-4 leading-relaxed">
                By proceeding, you agree to our Terms of Service and Privacy Policy. Delivery is currently limited to Lagos, Abuja, and Port Harcourt.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};