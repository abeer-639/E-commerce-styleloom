import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthUser } from "@/data/types";

interface AuthState {
  currentUser: AuthUser | null;
  isAuthenticated: boolean;
  hydrated: boolean;
}

const STORAGE_KEY = "app-auth-user";

function loadInitialUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

const initialState: AuthState = {
  currentUser: null,
  isAuthenticated: false,
  hydrated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    hydrateAuth(state) {
      const user = loadInitialUser();
      state.currentUser = user;
      state.isAuthenticated = !!user;
      state.hydrated = true;
    },
    loginSuccess(state, action: PayloadAction<AuthUser>) {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(action.payload));
      } catch {
        // localStorage unavailable (private browsing, quota, etc.) - state still holds in memory
      }
    },
    logout(state) {
      state.currentUser = null;
      state.isAuthenticated = false;
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch {
        // localStorage unavailable (private browsing, quota, etc.) - state still holds in memory
      }
    },
  },
});

export const { hydrateAuth, loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
