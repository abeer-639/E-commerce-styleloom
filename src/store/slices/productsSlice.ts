import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/data/types";
import { products as seedProducts } from "@/data/products";

interface ProductsState {
  items: Product[];
}

const STORAGE_KEY = "app-products";

function loadInitialProducts(): Product[] {
  if (typeof window === "undefined") return seedProducts;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Product[]) : seedProducts;
  } catch {
    return seedProducts;
  }
}

function persist(items: Product[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // localStorage unavailable (private browsing, quota, etc.) - state still holds in memory
  }
}

const initialState: ProductsState = { items: seedProducts };

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    hydrateProducts(state) {
      state.items = loadInitialProducts();
    },
    addProduct(state, action: PayloadAction<Product>) {
      state.items.unshift(action.payload);
      persist(state.items);
    },
    updateProduct(state, action: PayloadAction<Product>) {
      const index = state.items.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) state.items[index] = action.payload;
      persist(state.items);
    },
    removeProduct(state, action: PayloadAction<string>) {
      state.items = state.items.filter((p) => p.id !== action.payload);
      persist(state.items);
    },
  },
});

export const { hydrateProducts, addProduct, updateProduct, removeProduct } = productsSlice.actions;
export default productsSlice.reducer;
