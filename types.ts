export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  images: string[];
  description: string;
  highlights: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ShippingInfo {
    name: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
}

export interface Order {
    id: string;
    items: CartItem[];
    shippingInfo: ShippingInfo;
    subtotal: number;
    shippingCost: number;
    total: number;
}