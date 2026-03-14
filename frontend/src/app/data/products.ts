import { Product } from "../types";

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Premium White Yam (1 Tuber)",
    description: "Fresh, organic white yam sourced directly from farms in Benue State. Rich in complex carbohydrates, perfect for pounded yam, boiled yam, or yam porridge.",
    price: 2500,
    category: "Tubers & Grains",
    image: "https://images.unsplash.com/photo-1607786221722-a7cde2cdb5e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxOaWdlcmlhbiUyMHlhbSUyMHR1YmVycyUyMGZyZXNofGVufDF8fHx8MTc3MzQ4ODI2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.9,
    reviews: 187,
    tags: ["Best Seller", "Farm Fresh", "Organic"]
  },
  {
    id: "2",
    name: "Fresh Roma Tomatoes (2kg)",
    description: "Sun-ripened Roma tomatoes perfect for stews, jollof rice, and traditional sauces. Harvested at peak freshness and delivered within 24 hours.",
    price: 1800,
    category: "Fresh Vegetables",
    image: "https://images.unsplash.com/photo-1591171551239-80a5eddd627a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHRvbWF0b2VzJTIwbWFya2V0fGVufDF8fHx8MTc3MzQ4ODI2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.8,
    reviews: 245,
    tags: ["Premium", "Farm-to-Table"]
  },
  {
    id: "3",
    name: "Fresh Red Peppers (500g)",
    description: "Vibrant red chili peppers (Atarodo) with authentic heat. Essential for Nigerian pepper soup, stews, and traditional sauces.",
    price: 1200,
    category: "Spices & Seasonings",
    image: "https://images.unsplash.com/photo-1640490201159-b3ae61c54747?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjBjaGlsaSUyMHBlcHBlcnMlMjBmcmVzaHxlbnwxfHx8fDE3NzMzNzAzMzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.7,
    reviews: 156,
    tags: ["Spicy", "Essential"]
  },
  {
    id: "4",
    name: "Fresh Catfish (Whole, 2-3kg)",
    description: "Live catfish caught fresh from local fish farms. Cleaned and prepared to your specification. Perfect for pepper soup, grilled fish, or traditional fish stew.",
    price: 4500,
    category: "Proteins",
    image: "https://images.unsplash.com/photo-1674066620888-4878aad91094?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGZpc2glMjBtYXJrZXR8ZW58MXx8fHwxNzczNDg4MjY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.9,
    reviews: 98,
    tags: ["Fresh Catch", "High Protein"]
  },
  {
    id: "5",
    name: "Ugu (Fluted Pumpkin Leaves) - 1 Bundle",
    description: "Fresh Ugu leaves (fluted pumpkin) handpicked from organic farms. Rich in vitamins and perfect for vegetable soup, egusi, and traditional dishes.",
    price: 800,
    category: "Fresh Vegetables",
    image: "https://images.unsplash.com/photo-1759344114577-b6c32e4d68c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwdmVnZXRhYmxlcyUyMGZyZXNofGVufDF8fHx8MTc3MzQ4ODI2NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.6,
    reviews: 134,
    tags: ["Organic", "Nutrient-Rich"]
  },
  {
    id: "6",
    name: "Fresh Cassava Roots (5 Tubers)",
    description: "Premium cassava tubers perfect for making garri, fufu, or cassava flour. Freshly harvested from farms in Cross River State.",
    price: 1500,
    category: "Tubers & Grains",
    image: "https://images.unsplash.com/photo-1757283961570-682154747d9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXNzYXZhJTIwcm9vdCUyMHZlZ2V0YWJsZXxlbnwxfHx8fDE3NzM0MDkzNjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.7,
    reviews: 89,
    tags: ["Staple", "Versatile"]
  },
  {
    id: "7",
    name: "Fresh Plantains (Bunch of 6-8)",
    description: "Green or ripe plantains sourced from Delta State plantations. Perfect for boiled plantain, fried dodo, or plantain porridge.",
    price: 1000,
    category: "Tubers & Grains",
    image: "https://images.unsplash.com/photo-1750601455197-a7ba46fb1544?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBsYW50YWluJTIwYmFuYW5hc3xlbnwxfHx8fDE3NzM0ODgyNjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.8,
    reviews: 203,
    tags: ["Popular", "Sweet"]
  },
  {
    id: "8",
    name: "Local Rice (5kg Bag)",
    description: "Premium stone-free local rice from Ebonyi State. Rich in nutrients, perfect for jollof rice, fried rice, or native jollof.",
    price: 6500,
    category: "Tubers & Grains",
    image: "https://images.unsplash.com/photo-1646980990815-1e97d5ee932f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxOaWdlcmlhbiUyMHJpY2UlMjBncmFpbnN8ZW58MXx8fHwxNzczNDg4MjY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.9,
    reviews: 167,
    tags: ["Best Seller", "Stone-Free", "Local"]
  },
  {
    id: "9",
    name: "Dried Crayfish (250g)",
    description: "Premium sun-dried Nigerian crayfish. Ground or whole. Essential for authentic Nigerian soups and stews with rich umami flavor.",
    price: 2200,
    category: "Spices & Seasonings",
    image: "https://images.unsplash.com/photo-1674066616776-ab20c69f0d50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmllZCUyMGNyYXlmaXNoJTIwQWZyaWNhbnxlbnwxfHx8fDE3NzM0ODgyNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.8,
    reviews: 121,
    tags: ["Premium", "Authentic"]
  },
  {
    id: "10",
    name: "Fresh Ginger Root (500g)",
    description: "Organic Nigerian ginger with intense flavor. Perfect for pepper soup, tea, smoothies, and traditional remedies.",
    price: 900,
    category: "Spices & Seasonings",
    image: "https://images.unsplash.com/photo-1717769071502-e9b5d06c5fc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGdpbmdlciUyMHJvb3R8ZW58MXx8fHwxNzczNDg4MjY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.7,
    reviews: 78,
    tags: ["Organic", "Medicinal"]
  },
  {
    id: "11",
    name: "Stockfish (Okporoko) - 1kg",
    description: "Premium Norwegian stockfish, dried to perfection. Essential for traditional soups like Banga, Edikaikong, and Afang.",
    price: 8500,
    category: "Proteins",
    image: "https://images.unsplash.com/photo-1690365712053-9c27a4abaa6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdG9ja2Zpc2glMjBkcmllZCUyMGZpc2h8ZW58MXx8fHwxNzczNDg4MjY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.9,
    reviews: 92,
    tags: ["Premium", "Import Quality"]
  },
  {
    id: "12",
    name: "Fresh Waterleaf (1 Bundle)",
    description: "Fresh waterleaf (Gbure) harvested daily. Perfect for traditional vegetable soups, Edikaikong, and Afang soup.",
    price: 700,
    category: "Fresh Vegetables",
    image: "https://images.unsplash.com/photo-1653301652759-62291a91f6a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHNwaW5hY2glMjBncmVlbnN8ZW58MXx8fHwxNzczNDMwNjY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.6,
    reviews: 156,
    tags: ["Fresh Daily", "Nutritious"]
  },
  {
    id: "13",
    name: "Free-Range Chicken (Whole, 2-2.5kg)",
    description: "Fresh free-range local chicken raised naturally without antibiotics. Perfect for pepper soup, native jollof, or traditional stews.",
    price: 5500,
    category: "Proteins",
    image: "https://images.unsplash.com/photo-1642102903996-cdad15f5dcdd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYXclMjBjaGlja2VuJTIwbWVhdHxlbnwxfHx8fDE3NzM0ODA4NDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.9,
    reviews: 143,
    tags: ["Free-Range", "Antibiotic-Free"]
  },
  {
    id: "14",
    name: "Fresh Garlic (250g)",
    description: "Aromatic fresh garlic cloves perfect for seasoning soups, stews, and marinades. Adds depth to any traditional dish.",
    price: 800,
    category: "Spices & Seasonings",
    image: "https://images.unsplash.com/photo-1758988480872-1f22e7910a14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJsaWMlMjBjbG92ZXMlMjBmcmVzaHxlbnwxfHx8fDE3NzM0ODgyNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.7,
    reviews: 87,
    tags: ["Aromatic", "Essential"]
  },
  {
    id: "15",
    name: "Fresh Goat Meat (1kg)",
    description: "Premium fresh goat meat from local farms. Perfect for pepper soup, asun, or traditional stews. Cut to your preference.",
    price: 4800,
    category: "Proteins",
    image: "https://images.unsplash.com/photo-1573426513193-6293d1527c39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYXclMjBnb2F0JTIwbWVhdHxlbnwxfHx8fDE3NzM0ODgyNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.8,
    reviews: 112,
    tags: ["Premium Cut", "Fresh Daily"]
  },
  {
    id: "16",
    name: "Traditional Spice Mix (200g)",
    description: "Authentic blend of Nigerian spices including Uda, Uziza, Ehuru, and Negro pepper. Perfect for pepper soup and traditional dishes.",
    price: 1500,
    category: "Spices & Seasonings",
    image: "https://images.unsplash.com/photo-1758745464235-ccb8c1253074?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMEFmcmljYW4lMjBzcGljZXN8ZW58MXx8fHwxNzczNDg4MjY4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.9,
    reviews: 165,
    tags: ["Authentic", "Chef's Choice"]
  }
];