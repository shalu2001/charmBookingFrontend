import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import AuthProvider from "react-auth-kit";
import store from "./AuthStore.tsx";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider store={store}>
        <NextUIProvider>
          <App />
        </NextUIProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
