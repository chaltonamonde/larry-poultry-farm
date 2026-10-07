import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, DeliveryTown } from '../types';
import { DELIVERY_TOWNS, FARM_CONFIG } from '../data/farmData';
import { useToast } from './ToastContext';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number, isPreOrder?: boolean, batchId?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  selectedTown: DeliveryTown;
  setSelectedTown: (town: DeliveryTown) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutModalOpen: boolean;
  setIsCheckoutModalOpen: (open: boolean) => void;
  selectedProductForDetail: Product | null;
  setSelectedProductForDetail: (product: Product | null) => void;

  // Calculations
  totalItemsCount: number;
  subtotalKes: number;
  effectiveDeliveryFeeKes: number;
  grandTotalKes: number;
  depositTotalKes: number; // For chick reservations
  amountToFreeDelivery: number;
  freeDeliveryProgressPercent: number;
  isFreeDeliveryEligible: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { addToast } = useToast();
  
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('lpf_cart_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [selectedTown, setSelectedTown] = useState<DeliveryTown>(() => {
    return DELIVERY_TOWNS[1]; // Default to Nairobi CBD
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('lpf_cart_items', JSON.stringify(cartItems));
    } catch {
      // Storage unavailable fallback
    }
  }, [cartItems]);

  const addToCart = (product: Product, quantity = 1, isPreOrder = false, batchId?: string) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, isPreOrder, batchId }];
    });

    addToast({
      type: 'success',
      title: 'Added to Cart',
      message: `${quantity}x ${product.name} ready in your order.`
    });
  };

  const removeFromCart = (productId: string) => {
    const item = cartItems.find(i => i.product.id === productId);
    setCartItems(prev => prev.filter(i => i.product.id !== productId));
    if (item) {
      addToast({
        type: 'info',
        title: 'Item Removed',
        message: `${item.product.name} removed from cart.`
      });
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Calculations
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const subtotalKes = cartItems.reduce((acc, item) => {
    return acc + item.product.priceKes * item.quantity;
  }, 0);

  // Free delivery logic: If subtotal >= threshold (KES 3500) and not farm pickup
  const isFreeDeliveryEligible = subtotalKes >= FARM_CONFIG.freeDeliveryThresholdKes && !selectedTown.isFarmPickup;
  
  const effectiveDeliveryFeeKes = selectedTown.isFarmPickup
    ? 0
    : isFreeDeliveryEligible
    ? 0
    : selectedTown.feeKes;

  const grandTotalKes = subtotalKes + effectiveDeliveryFeeKes;

  // Deposit calculation for pre-orders (e.g. 30% for day-old chicks)
  const depositTotalKes = cartItems.reduce((acc, item) => {
    if (item.product.depositRequiredPercent) {
      const fullItemPrice = item.product.priceKes * item.quantity;
      return acc + (fullItemPrice * item.product.depositRequiredPercent) / 100;
    }
    return acc;
  }, 0);

  const amountToFreeDelivery = Math.max(0, FARM_CONFIG.freeDeliveryThresholdKes - subtotalKes);
  const freeDeliveryProgressPercent = Math.min(
    100,
    Math.round((subtotalKes / FARM_CONFIG.freeDeliveryThresholdKes) * 100)
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        selectedTown,
        setSelectedTown,
        isCartOpen,
        setIsCartOpen,
        isCheckoutModalOpen,
        setIsCheckoutModalOpen,
        selectedProductForDetail,
        setSelectedProductForDetail,
        totalItemsCount,
        subtotalKes,
        effectiveDeliveryFeeKes,
        grandTotalKes,
        depositTotalKes,
        amountToFreeDelivery,
        freeDeliveryProgressPercent,
        isFreeDeliveryEligible
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
