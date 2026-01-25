export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  categorySlug: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  featured: boolean;
  isNew: boolean;
  isSale: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export const categories: Category[] = [
  {
    id: "1",
    name: "Electronics",
    slug: "electronics",
    description: "Latest gadgets and tech essentials",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&q=80",
    productCount: 24,
  },
  {
    id: "2",
    name: "Fashion",
    slug: "fashion",
    description: "Trendy apparel and accessories",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&q=80",
    productCount: 56,
  },
  {
    id: "3",
    name: "Home & Living",
    slug: "home-living",
    description: "Furniture and home decor",
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
    productCount: 38,
  },
  {
    id: "4",
    name: "Sports",
    slug: "sports",
    description: "Athletic gear and equipment",
    image:
      "https://images.unsplash.com/photo-1461896836934- voices-a4e4c0facc?w=600&q=80",
    productCount: 19,
  },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    description:
      "Experience crystal-clear audio with our premium wireless headphones. Features active noise cancellation, 30-hour battery life, and premium comfort padding for extended listening sessions.",
    price: 299.99,
    originalPrice: 349.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&q=80",
      "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=600&q=80",
    ],
    category: "Electronics",
    categorySlug: "electronics",
    rating: 4.8,
    reviewCount: 234,
    inStock: true,
    colors: [
      { name: "Midnight Black", hex: "#1a1a1a" },
      { name: "Cloud White", hex: "#f5f5f5" },
      { name: "Navy Blue", hex: "#1e3a5f" },
    ],
    featured: true,
    isNew: true,
    isSale: true,
  },
  {
    id: "2",
    name: "Minimalist Leather Watch",
    description:
      "A timeless piece that combines elegance with functionality. Crafted with genuine Italian leather and Swiss movement for precision timekeeping.",
    price: 189.99,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=600&q=80",
    ],
    category: "Fashion",
    categorySlug: "fashion",
    rating: 4.9,
    reviewCount: 189,
    inStock: true,
    colors: [
      { name: "Brown", hex: "#8B4513" },
      { name: "Black", hex: "#1a1a1a" },
    ],
    featured: true,
    isNew: false,
    isSale: false,
  },
  {
    id: "3",
    name: "Smart Home Speaker",
    description:
      "Transform your home with intelligent voice control. Premium 360° audio, smart home integration, and a sleek design that fits any room.",
    price: 149.99,
    originalPrice: 179.99,
    image:
      "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=600&q=80",
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&q=80",
    ],
    category: "Electronics",
    categorySlug: "electronics",
    rating: 4.6,
    reviewCount: 312,
    inStock: true,
    colors: [
      { name: "Charcoal", hex: "#36454F" },
      { name: "Sand", hex: "#C2B280" },
    ],
    featured: true,
    isNew: false,
    isSale: true,
  },
  {
    id: "4",
    name: "Canvas Backpack",
    description:
      "Durable and stylish backpack perfect for daily commute or weekend adventures. Features water-resistant material and ergonomic design.",
    price: 79.99,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600&q=80",
    ],
    category: "Fashion",
    categorySlug: "fashion",
    rating: 4.5,
    reviewCount: 156,
    inStock: true,
    colors: [
      { name: "Olive", hex: "#556B2F" },
      { name: "Navy", hex: "#000080" },
      { name: "Gray", hex: "#808080" },
    ],
    featured: false,
    isNew: true,
    isSale: false,
  },
  {
    id: "5",
    name: "Ceramic Table Lamp",
    description:
      "Handcrafted ceramic lamp with warm ambient lighting. Perfect for creating a cozy atmosphere in any room.",
    price: 129.99,
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80",
    ],
    category: "Home & Living",
    categorySlug: "home-living",
    rating: 4.7,
    reviewCount: 89,
    inStock: true,
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Terra Cotta", hex: "#E2725B" },
    ],
    featured: true,
    isNew: false,
    isSale: false,
  },
  {
    id: "6",
    name: "Running Shoes Pro",
    description:
      "Lightweight performance running shoes with responsive cushioning. Designed for both casual joggers and competitive athletes.",
    price: 159.99,
    originalPrice: 189.99,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&q=80",
    ],
    category: "Sports",
    categorySlug: "sports",
    rating: 4.8,
    reviewCount: 445,
    inStock: true,
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: [
      { name: "Coral Red", hex: "#FF6B6B" },
      { name: "Ocean Blue", hex: "#4ECDC4" },
      { name: "Black", hex: "#1a1a1a" },
    ],
    featured: true,
    isNew: true,
    isSale: true,
  },
  {
    id: "7",
    name: "Organic Cotton T-Shirt",
    description:
      "Ultra-soft organic cotton t-shirt with a relaxed fit. Sustainably sourced and ethically manufactured.",
    price: 39.99,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80",
    ],
    category: "Fashion",
    categorySlug: "fashion",
    rating: 4.4,
    reviewCount: 278,
    inStock: true,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Black", hex: "#1a1a1a" },
      { name: "Heather Gray", hex: "#9CA3AF" },
    ],
    featured: false,
    isNew: false,
    isSale: false,
  },
  {
    id: "8",
    name: "Smart Fitness Tracker",
    description:
      "Track your fitness journey with precision. Features heart rate monitoring, sleep tracking, and 7-day battery life.",
    price: 99.99,
    image:
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&q=80",
    ],
    category: "Electronics",
    categorySlug: "electronics",
    rating: 4.5,
    reviewCount: 521,
    inStock: true,
    colors: [
      { name: "Black", hex: "#1a1a1a" },
      { name: "Rose Gold", hex: "#B76E79" },
    ],
    featured: false,
    isNew: true,
    isSale: false,
  },
];

export const mockUser: User = {
  id: "1",
  email: "demo@example.com",
  name: "John Doe",
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
};

export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id);
};

export const getProductsByCategory = (categorySlug: string): Product[] => {
  return products.filter((p) => p.categorySlug === categorySlug);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter((p) => p.featured);
};

export const getNewProducts = (): Product[] => {
  return products.filter((p) => p.isNew);
};

export const getSaleProducts = (): Product[] => {
  return products.filter((p) => p.isSale);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowercaseQuery) ||
      p.description.toLowerCase().includes(lowercaseQuery) ||
      p.category.toLowerCase().includes(lowercaseQuery),
  );
};
