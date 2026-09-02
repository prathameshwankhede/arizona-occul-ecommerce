"use client";

import { useState, useCallback } from "react";
import type { CartItem } from "@/types";

interface CartState {
  items: CartItem[];
  subtotal: string;
  loading: boolean;
  error: string | null;
}

export function useCart() {
  const [state, setState] = useState<CartState>({
    items: [],
    subtotal: "0.00",
    loading: false,
    error: null,
  });

  const fetchCart = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const res = await fetch("/api/cart");
      const data = await res.json();
      if (data.success) {
        setState((s) => ({
          ...s,
          items: data.data.items,
          subtotal: data.data.subtotal,
          loading: false,
        }));
      }
    } catch {
      setState((s) => ({ ...s, error: "Failed to load cart", loading: false }));
    }
  }, []);

  const addToCart = useCallback(async (productId: number, quantity = 1) => {
    try {
      const res = await fetch("/api/cart/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      await fetchCart();
      return { success: true };
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : "Failed to add item" };
    }
  }, [fetchCart]);

  const updateQuantity = useCallback(async (itemId: number, quantity: number) => {
    try {
      const res = await fetch(`/api/cart/items/${itemId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      await fetchCart();
    } catch (err) {
      console.error("Update quantity error:", err);
    }
  }, [fetchCart]);

  const removeItem = useCallback(async (itemId: number) => {
    try {
      const res = await fetch(`/api/cart/items/${itemId}`, { method: "DELETE" });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      await fetchCart();
    } catch (err) {
      console.error("Remove item error:", err);
    }
  }, [fetchCart]);

  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    ...state,
    itemCount,
    fetchCart,
    addToCart,
    updateQuantity,
    removeItem,
  };
}
