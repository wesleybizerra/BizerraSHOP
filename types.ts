
export interface Variation {
  name: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  variations: Variation[];
}

export interface CartItem {
  id: string; // ID único: productId_variationName
  productId: string;
  name: string;
  variationName: string;
  price: number;
  image: string;
  quantity: number;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, variation: Variation) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}
