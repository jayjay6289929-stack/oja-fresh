import React from "react";
import { Leaf, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-emerald-950 text-emerald-200 py-12 border-t border-emerald-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-emerald-700 p-1.5 rounded-lg">
                <Leaf className="w-5 h-5 text-amber-400" />
              </div>
              <span className="text-xl tracking-tight text-white">
                Ọjà<span className="text-emerald-400">Fresh</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs text-emerald-300">
              Premium traditional Nigerian ingredients delivered fresh from farm to your table. Experience authentic Nigerian cooking with the finest raw ingredients.
            </p>
            <div className="flex items-center space-x-4">
              <Link to="#" className="hover:text-amber-400 transition-colors"><Facebook className="w-5 h-5" /></Link>
              <Link to="#" className="hover:text-amber-400 transition-colors"><Twitter className="w-5 h-5" /></Link>
              <Link to="#" className="hover:text-amber-400 transition-colors"><Instagram className="w-5 h-5" /></Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white mb-6">Shop by Category</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/products" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link to="/products?category=Tubers%20%26%20Grains" className="hover:text-white transition-colors">Tubers & Grains</Link></li>
              <li><Link to="/products?category=Fresh%20Vegetables" className="hover:text-white transition-colors">Fresh Vegetables</Link></li>
              <li><Link to="/products?category=Proteins" className="hover:text-white transition-colors">Fresh Proteins</Link></li>
              <li><Link to="/products?category=Spices%20%26%20Seasonings" className="hover:text-white transition-colors">Spices & Seasonings</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white mb-6">Customer Service</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="#" className="hover:text-white transition-colors">Track Your Order</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Delivery Information</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Freshness Guarantee</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">FAQs</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white mb-6">Get In Touch</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-emerald-300">15 Adeola Odeku Street, Victoria Island, Lagos, Nigeria</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-amber-400 shrink-0" />
                <span className="text-emerald-300">+234 (0) 800-OJA-FRESH</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-amber-400 shrink-0" />
                <span className="text-emerald-300">hello@ojafresh.ng</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-emerald-900 text-center">
          <p className="text-xs text-emerald-300">
            © {new Date().getFullYear()} Ọjà Fresh. All rights reserved. 
            <span className="block sm:inline mt-2 sm:mt-0 sm:ml-4">Privacy Policy | Terms of Service</span>
          </p>
        </div>
      </div>
    </footer>
  );
};