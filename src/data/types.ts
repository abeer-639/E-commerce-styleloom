

export type UserRole = "guest" | "user" | "admin";

export interface Product {
  id: string;
  nameKey: string;
  descriptionKey: string;

  name?: {
    ar: string;
    en: string;
  };

  description?: {
    ar: string;
    en: string;
  };
  fit?: {
    ar: string;
    en: string;
  };
  price: number;
  image: string;
  category: "womenswear" | "menswear" | "kidswear" | "accessories";
  audience: "mens" | "womens" | "kids";
  
  stock: number;
  rating: number;
}

export interface MockUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  priceAtPurchase: number;
}

export type OrderStatus = "processing" | "shipped" | "delivered" | "cancelled";

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
