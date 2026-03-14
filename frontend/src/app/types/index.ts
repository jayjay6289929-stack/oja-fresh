export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Tubers & Grains' | 'Fresh Vegetables' | 'Proteins' | 'Spices & Seasonings';
  image: string;
  rating: number;
  reviews: number;
  tags: string[];
}

export interface CartItem extends Product {
  quantity: number;
}