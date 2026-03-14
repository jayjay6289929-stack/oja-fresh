import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { ArrowRight, Truck, Leaf, ShieldCheck, Clock } from "lucide-react";
import { Product } from "../types";
import { fetchProducts } from "../api/products";
import { ProductCard } from "../components/ProductCard";
import { motion } from "motion/react";

const featureStyles: Record<string, { bg: string; icon: string }> = {
  emerald: { bg: "bg-emerald-50", icon: "text-emerald-700" },
  green:   { bg: "bg-green-50",   icon: "text-green-700"   },
  amber:   { bg: "bg-amber-50",   icon: "text-amber-700"   },
  teal:    { bg: "bg-teal-50",    icon: "text-teal-700"    },
};

export const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts({ sort: "popularity" })
      .then((data) => setFeaturedProducts(data.slice(0, 4)))
      .catch(() => setFeaturedProducts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden bg-emerald-950">
        <div className="absolute inset-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1761370980657-22586ea44093?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwbWFya2V0JTIwcHJvZHVjZXxlbnwxfHx8fDE3NzM0ODgyNjh8MA"
            alt="Fresh Nigerian Market Produce"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-900/60 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white space-y-6"
          >
            <div className="flex items-center space-x-3">
              <Leaf className="w-8 h-8 text-amber-400" />
              <span className="bg-amber-500 text-emerald-950 text-xs px-4 py-1.5 rounded-full uppercase tracking-widest">
                Farm-to-Table Excellence
              </span>
            </div>
            <h1 className="text-6xl md:text-7xl font-black leading-tight">
              Ọjà <span className="text-amber-400">Fresh</span>
            </h1>
            <p className="text-2xl text-emerald-100 leading-relaxed max-w-xl">
              Premium Traditional Nigerian Ingredients, Delivered Fresh to Your Doorstep
            </p>
            <p className="text-lg text-emerald-200 leading-relaxed max-w-xl">
              Authentic, unprocessed ingredients sourced directly from Nigerian farms. Experience the true taste of home with every order.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
              <Link
                to="/products"
                className="bg-amber-500 hover:bg-amber-600 text-emerald-950 px-8 py-4 rounded-full transition-all shadow-lg flex items-center justify-center space-x-2 group"
              >
                <span>Shop Fresh Ingredients</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/products?category=Proteins"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full transition-all border border-white/20 flex items-center justify-center"
              >
                Browse Proteins
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { icon: Truck,       title: "Same-Day Delivery",  desc: "Fresh ingredients delivered within hours.", color: "emerald" },
            { icon: Leaf,        title: "100% Organic",        desc: "No pesticides or artificial additives.",   color: "green"   },
            { icon: ShieldCheck, title: "Quality Guaranteed",  desc: "Farm-fresh or your money back.",           color: "amber"   },
            { icon: Clock,       title: "24/7 Support",        desc: "We're here whenever you need us.",         color: "teal"    },
          ].map((feature, i) => {
            const styles = featureStyles[feature.color];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-2xl border-2 border-emerald-100 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center space-y-3"
              >
                <div className={`${styles.bg} p-3 rounded-xl`}>
                  <feature.icon className={`w-6 h-6 ${styles.icon}`} />
                </div>
                <h3 className="text-gray-900">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Shop by Category */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-4xl text-gray-900 mb-2">Shop by Category</h2>
            <p className="text-gray-600 text-lg">Fresh ingredients for every traditional dish</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: "Tubers & Grains",     img: "https://images.unsplash.com/photo-1607786221722-a7cde2cdb5e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxOaWdlcmlhbiUyMHlhbSUyMHR1YmVycyUyMGZyZXNofGVufDF8fHx8MTc3MzQ4ODI2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", category: "Tubers & Grains"     },
            { name: "Fresh Vegetables",    img: "https://images.unsplash.com/photo-1665315302321-46989ca7829a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtJTIwZnJlc2glMjB2ZWdldGFibGVzfGVufDF8fHx8MTc3MzM4ODEzNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", category: "Fresh Vegetables"    },
            { name: "Premium Proteins",    img: "https://images.unsplash.com/photo-1674066620888-4878aad91094?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGZpc2glMjBtYXJrZXR8ZW58MXx8fHwxNzczNDg4MjY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", category: "Proteins"            },
            { name: "Spices & Seasonings", img: "https://images.unsplash.com/photo-1758745464235-ccb8c1253074?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMEFmcmljYW4lMjBzcGljZXN8ZW58MXx8fHwxNzczNDg4MjY4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", category: "Spices & Seasonings" },
          ].map((cat, i) => (
            <Link
              key={i}
              to={`/products?category=${encodeURIComponent(cat.category)}`}
              className="relative aspect-square rounded-3xl overflow-hidden group shadow-lg"
            >
              <img
                src={cat.img}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-900/30 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-white text-xl">{cat.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-4xl text-gray-900 mb-2">Farm Fresh Favorites</h2>
            <p className="text-gray-600 text-lg">Most popular ingredients this week</p>
          </div>
          <Link to="/products" className="text-emerald-700 flex items-center space-x-1 hover:underline">
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border-2 border-emerald-100 h-80 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Why Choose Us */}
      <section className="bg-gradient-to-br from-emerald-50 to-amber-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl text-gray-900 mb-4">Why Choose Ọjà Fresh?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're committed to bringing you the finest traditional Nigerian ingredients with uncompromising quality
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Direct from Farms",      desc: "We work directly with local farmers across Nigeria, ensuring fair prices and maximum freshness.",                       icon: "🌾" },
              { title: "Zero Preservatives",     desc: "All our ingredients are 100% natural with no artificial additives or preservatives.",                                  icon: "🍃" },
              { title: "Cultural Authenticity",  desc: "Traditional ingredients sourced from the regions they're originally grown, preserving authentic flavors.",              icon: "🇳🇬" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-emerald-100"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-gradient-to-r from-emerald-700 to-emerald-900 rounded-[2.5rem] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between overflow-hidden relative">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500 rounded-full blur-3xl opacity-20 -mr-40 -mt-40"></div>
          <div className="relative z-10 space-y-6 max-w-lg">
            <h2 className="text-4xl md:text-5xl text-white leading-tight">
              Join the <span className="text-amber-400">Ọjà Fresh</span> Family
            </h2>
            <p className="text-emerald-50 text-lg leading-relaxed">
              Get exclusive access to seasonal ingredients, traditional recipes, and special discounts. Experience authentic Nigerian cooking like never before.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="bg-white rounded-full px-6 py-4 flex-1 focus:outline-none focus:ring-2 focus:ring-amber-400 text-gray-900"
              />
              <button className="bg-amber-500 hover:bg-amber-600 text-emerald-950 px-8 py-4 rounded-full transition-colors whitespace-nowrap">
                Get Started
              </button>
            </div>
            <p className="text-emerald-200 text-sm">
              🎁 New customers get ₦2,000 off their first order!
            </p>
          </div>
          <div className="hidden md:block relative z-10 mt-8 md:mt-0">
            <img
              src="https://images.unsplash.com/photo-1665315302321-46989ca7829a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtJTIwZnJlc2glMjB2ZWdldGFibGVzfGVufDF8fHx8MTc3MzM4ODEzNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Fresh Vegetables"
              className="w-80 h-80 object-cover rounded-3xl shadow-2xl rotate-3 border-4 border-white"
            />
          </div>
        </div>
      </section>
    </div>
  );
};