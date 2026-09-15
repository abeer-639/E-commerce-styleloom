"use client";

import { ReactNode, useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { useAppDispatch } from "@/store/hooks";
import { hydrateAuth } from "@/store/slices/authSlice";
import { hydrateCart } from "@/store/slices/cartSlice";
import { hydrateProducts } from "@/store/slices/productsSlice";
import { hydrateOrders } from "@/store/slices/ordersSlice";
import { I18nProvider } from "@/i18n/I18nContext";
import { ThemeProvider } from "@/components/ThemeToggle";

function StoreHydrator({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(hydrateAuth());
    dispatch(hydrateCart());
    dispatch(hydrateProducts());
    dispatch(hydrateOrders());
  }, [dispatch]);

  return <>{children}</>;
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <I18nProvider>
          <StoreHydrator>{children}</StoreHydrator>
        </I18nProvider>
      </ThemeProvider>
    </Provider>
  );
}
