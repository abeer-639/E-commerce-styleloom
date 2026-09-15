import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order, OrderStatus } from "@/data/types";
import { orders as mockOrders } from "@/data/orders";

interface OrdersState {
  orders: Order[];
}

const STORAGE_KEY = "app-orders";

function loadInitialOrders(): Order[] {
  if (typeof window === "undefined") return mockOrders;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Order[]) : mockOrders;
  } catch {
    return mockOrders;
  }
}

function persist(orders: Order[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  } catch {
    // localStorage unavailable (private browsing, quota, etc.) - state still holds in memory
  }
}

const initialState: OrdersState = {
  orders: mockOrders,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    hydrateOrders(state) {
      state.orders = loadInitialOrders();
    },
    placeOrder(state, action: PayloadAction<Order>) {
      state.orders.unshift(action.payload);
      persist(state.orders);
    },
    updateOrderStatus(state, action: PayloadAction<{ id: string; status: OrderStatus }>) {
      const order = state.orders.find((o) => o.id === action.payload.id);
      if (order) order.status = action.payload.status;
      persist(state.orders);
    },
  },
});

export const { hydrateOrders, placeOrder, updateOrderStatus } = ordersSlice.actions;
export default ordersSlice.reducer;