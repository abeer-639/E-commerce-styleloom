import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "@/data/types";

interface CartState {
  items: CartItem[];
}

const STORAGE_KEY = "app-cart";

function loadInitialCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function persist(items: CartItem[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // localStorage unavailable (private browsing, quota, etc.) - state still holds in memory
  }
}

const initialState: CartState = { items: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    hydrateCart(state) {
      state.items = loadInitialCart();
    },

    addToCart(state, action: PayloadAction<{ productId: string; stock: number; quantity?: number }>) {
      const { productId, stock, quantity = 1 } = action.payload;
      const existing = state.items.find((i) => i.productId === productId);
      const currentQty = existing?.quantity ?? 0;
      const nextQty = Math.min(currentQty + quantity, stock);

      if (existing) {
        existing.quantity = nextQty;
      } else if (stock > 0) {
        state.items.push({ productId, quantity: Math.min(quantity, stock) });
      }
      persist(state.items);
    },
    updateQuantity(state, action: PayloadAction<{ productId: string; quantity: number; stock: number }>) {
      const { productId, quantity, stock } = action.payload;
      const item = state.items.find((i) => i.productId === productId);
      if (!item) return;

      if (quantity <= 0) {
        state.items = state.items.filter((i) => i.productId !== productId);
      } else {
        item.quantity = Math.min(quantity, stock);
      }
      persist(state.items);
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.productId !== action.payload);
      persist(state.items);
    },
    clearCart(state) {
      state.items = [];
      persist(state.items);
    },
  },
});

export const { hydrateCart, addToCart, updateQuantity, removeFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
