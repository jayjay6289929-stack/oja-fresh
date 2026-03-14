import React from "react";
import { Link } from "react-router";

export const NotFound: React.FC = () => (
  <div className="max-w-7xl mx-auto px-4 py-32 text-center">
    <div className="bg-emerald-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
      <span className="text-4xl">🌿</span>
    </div>
    <h1 className="text-4xl text-gray-900 mb-4">Page not found</h1>
    <p className="text-gray-600 mb-10 max-w-sm mx-auto text-lg leading-relaxed">
      This page doesn't exist. Let's get you back to the market.
    </p>
    <Link
      to="/"
      className="bg-emerald-700 hover:bg-emerald-800 text-white px-10 py-4 rounded-full shadow-xl shadow-emerald-200 transition-all inline-flex items-center space-x-2"
    >
      <span>Back to Home</span>
    </Link>
  </div>
);