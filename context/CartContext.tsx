"use client";
import React, { createContext, useMemo, useState, useEffect } from "react";

type CartItem = { id: string; name: string; price: number; quantity: number; description?: string };
type CartContextType = {
  cartItems: CartItem[];
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  setQuantity: (id: string, qty: number) => void;
  total: number;
  itemCount: number;
};

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
  setQuantity: () => {},
  total: 0,
  itemCount: 0,
});

const STORAGE_KEY = "kamoune_cart_v1";

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    console.log("[CartProvider] mount");
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setCartItems(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch {}
  }, [cartItems]);

  const addItem: CartContextType["addItem"] = (item) => {
    console.log("[CartProvider] addItem", item);
    setCartItems((prev) => {
      const idx = prev.findIndex((p) => p.id === item.id);
      if (idx !== -1) {
        const updated = [...prev];
        updated[idx] = { ...updated[idx], quantity: updated[idx].quantity + (item.quantity ?? 1) };
        return updated;
      }
      return [...prev, { ...item, quantity: item.quantity ?? 1, price: item.price ?? 0 }];
    });
  };

  const removeItem = (id: string) => setCartItems((prev) => prev.filter((p) => p.id !== id));
  const clearCart = () => setCartItems([]);
  const setQuantity = (id: string, qty: number) =>
    setCartItems((prev) => prev.map((p) => (p.id === id ? { ...p, quantity: Math.max(1, qty) } : p)));

  const total = useMemo(() => cartItems.reduce((s, it) => s + it.price * it.quantity, 0), [cartItems]);
  const itemCount = useMemo(() => cartItems.reduce((s, it) => s + it.quantity, 0), [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, addItem, removeItem, clearCart, setQuantity, total, itemCount }}>
      {children}
    </CartContext.Provider>
  );
}
