import { RouterProvider } from "react-router";
import { router } from "./routes";
import { CartProvider } from "./store/CartContext";
import { AuthProvider } from "./store/AuthContext";
import { Toaster } from "sonner";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Toaster position="top-right" richColors closeButton />
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;