import React, { useState, useRef, useEffect } from "react";
import { useCart } from "../store/CartContext";
import { Link, useNavigate } from "react-router";
import { ShieldCheck, MapPin, CreditCard, ChevronLeft, CheckCircle, Truck, PackageCheck, Smartphone } from "lucide-react";
import { motion } from "motion/react";
import confetti from "canvas-confetti";
import { toast } from "sonner";
import { createOrder, buildOrderPayload, OrderResponse } from "../api/orders";

export const Checkout: React.FC = () => {
  const { cart, grandTotal, totalPrice, vat, clearCart } = useCart();
  const navigate = useNavigate();
  const [isOrdered, setIsOrdered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const redirectTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (redirectTimer.current) clearTimeout(redirectTimer.current);
    };
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const payload = buildOrderPayload(
      {
        customer_name: (form.elements.namedItem("fullName") as HTMLInputElement).value,
        phone:         (form.elements.namedItem("phone")    as HTMLInputElement).value,
        address:       (form.elements.namedItem("address")  as HTMLInputElement).value,
        city:          (form.elements.namedItem("city")     as HTMLSelectElement).value,
      },
      cart
    );

    try {
      const order: OrderResponse = await createOrder(payload);
      setOrderId(order.id);
      setIsOrdered(true);
      setTimeout(() => clearCart(), 0);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#047857", "#f59e0b", "#ffffff"],
      });
      redirectTimer.current = setTimeout(() => navigate("/"), 5000);
    } catch (err) {
      toast.error("Order failed — please check your details and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0 && !isOrdered) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl mb-4">Your cart is empty</h2>
        <Link to="/products" className="text-emerald-700 hover:underline">
          Go back to shop
        </Link>
      </div>
    );
  }

  if (isOrdered) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-32 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-12 rounded-[3rem] border-2 border-emerald-100 shadow-2xl flex flex-col items-center"
        >
          <div className="bg-emerald-100 p-6 rounded-full mb-8">
            <CheckCircle className="w-16 h-16 text-emerald-700" />
          </div>
          <h1 className="text-4xl text-gray-900 mb-4">Order Confirmed!</h1>
          <p className="text-gray-600 mb-6 text-lg leading-relaxed">
            Your fresh ingredients are being prepared! We'll notify you when they're on the way.
          </p>
          {orderId && (
            <p className="text-sm text-emerald-700 mb-8 font-mono bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200">
              Order ID: {orderId}
            </p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full mb-12">
            <div className="bg-emerald-50 p-4 rounded-2xl flex flex-col items-center">
              <PackageCheck className="w-6 h-6 text-emerald-700 mb-2" />
              <span className="text-xs text-gray-900">Order Confirmed</span>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl flex flex-col items-center">
              <Truck className="w-6 h-6 text-gray-400 mb-2" />
              <span className="text-xs text-gray-400">On its way</span>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl flex flex-col items-center">
              <MapPin className="w-6 h-6 text-gray-400 mb-2" />
              <span className="text-xs text-gray-400">Delivered</span>
            </div>
          </div>
          <p className="text-sm text-gray-500">Redirecting to home page...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/cart" className="inline-flex items-center space-x-2 text-gray-600 hover:text-emerald-700 mb-8 transition-colors">
        <ChevronLeft className="w-4 h-4" />
        <span>Return to cart</span>
      </Link>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1">
          <h1 className="text-4xl text-gray-900 mb-12">Checkout</h1>

          <form onSubmit={handleOrder} className="space-y-12">
            {/* Delivery Details */}
            <section className="bg-white p-8 rounded-[2.5rem] border-2 border-emerald-100 shadow-sm">
              <div className="flex items-center space-x-3 mb-8">
                <div className="bg-emerald-50 p-2.5 rounded-xl">
                  <MapPin className="w-6 h-6 text-emerald-700" />
                </div>
                <h2 className="text-2xl text-gray-900">Delivery Details</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="fullName" className="text-xs text-gray-500 uppercase tracking-widest px-1">Full Name</label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    placeholder="Adebayo Oluwaseun"
                    className="w-full bg-emerald-50 border-2 border-emerald-200 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-gray-900"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-xs text-gray-500 uppercase tracking-widest px-1">Phone Number</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="+234 800 000 0000"
                    className="w-full bg-emerald-50 border-2 border-emerald-200 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-gray-900"
                  />
                </div>
                <div className="sm:col-span-2 space-y-2">
                  <label htmlFor="address" className="text-xs text-gray-500 uppercase tracking-widest px-1">Delivery Address</label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    required
                    placeholder="Street address, Apartment, Building"
                    className="w-full bg-emerald-50 border-2 border-emerald-200 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-gray-900"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="city" className="text-xs text-gray-500 uppercase tracking-widest px-1">City</label>
                  <select
                    id="city"
                    name="city"
                    className="w-full bg-emerald-50 border-2 border-emerald-200 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-gray-900"
                  >
                    <option>Lagos</option>
                    <option>Abuja</option>
                    <option>Port Harcourt</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="state" className="text-xs text-gray-500 uppercase tracking-widest px-1">State</label>
                  <input
                    id="state"
                    name="state"
                    type="text"
                    required
                    placeholder="Lagos State"
                    className="w-full bg-emerald-50 border-2 border-emerald-200 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-gray-900"
                  />
                </div>
              </div>
            </section>

            {/* Payment Method */}
            <section className="bg-white p-8 rounded-[2.5rem] border-2 border-emerald-100 shadow-sm">
              <div className="flex items-center space-x-3 mb-8">
                <div className="bg-emerald-50 p-2.5 rounded-xl">
                  <CreditCard className="w-6 h-6 text-emerald-700" />
                </div>
                <h2 className="text-2xl text-gray-900">Payment Method</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: "card",     name: "Credit / Debit Card",  icon: CreditCard  },
                  { id: "transfer", name: "Bank Transfer",         icon: ShieldCheck },
                  { id: "mobile",   name: "USSD / Mobile Money",   icon: Smartphone  },
                ].map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setPaymentMethod(method.id)}
                    className={`flex items-center justify-between p-6 rounded-3xl border-2 transition-all ${
                      paymentMethod === method.id
                        ? "border-emerald-700 bg-emerald-50 text-emerald-900 shadow-lg shadow-emerald-100"
                        : "border-emerald-100 bg-white text-gray-600 hover:border-emerald-200"
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <method.icon className="w-6 h-6" />
                      <span>{method.name}</span>
                    </div>
                    {paymentMethod === method.id && <CheckCircle className="w-5 h-5 fill-emerald-700 text-white" />}
                  </button>
                ))}
              </div>
            </section>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 disabled:cursor-not-allowed text-white py-6 rounded-3xl shadow-2xl shadow-emerald-200 transition-all text-xl hover:scale-[1.01] active:scale-[0.99]"
            >
              {isSubmitting ? "Placing order..." : `Pay ${formatPrice(grandTotal)}`}
            </button>
          </form>
        </div>

        {/* Order Review */}
        <div className="w-full lg:w-[450px]">
          <div className="bg-white p-10 rounded-[3rem] border-2 border-emerald-100 shadow-2xl sticky top-24">
            <h2 className="text-2xl text-gray-900 mb-8">Order Review</h2>
            <div className="max-h-[300px] overflow-y-auto pr-4 mb-8 space-y-6 no-scrollbar">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-emerald-50 rounded-xl overflow-hidden shrink-0 border-2 border-emerald-100 shadow-inner">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-900 leading-snug">{item.name}</p>
                      <p className="text-xs text-gray-500 mt-1">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-900">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-8 border-t border-emerald-100 mb-10">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="text-gray-900">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Delivery Fee</span>
                <span className="text-gray-900">{formatPrice(1500)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">VAT (7.5%)</span>
                <span className="text-gray-900">{formatPrice(vat)}</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-emerald-50 mt-4">
                <span className="text-xl text-gray-900">Grand Total</span>
                <span className="text-2xl text-emerald-700">{formatPrice(grandTotal)}</span>
              </div>
            </div>

            <div className="bg-emerald-50 p-6 rounded-3xl flex items-start space-x-4">
              <ShieldCheck className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5" />
              <p className="text-xs text-emerald-900 leading-relaxed">
                Your payment is processed securely by Paystack. We do not store your card details on our servers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};