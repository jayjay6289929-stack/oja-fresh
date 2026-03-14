import { RouterProvider } from "react-router";
import { router } from "./routes";
import { CartProvider } from "./store/CartContext";
import { Toaster } from "sonner";

function App() {
  return (
    <CartProvider>
      <Toaster position="top-right" richColors closeButton />
      <RouterProvider router={router} />
    </CartProvider>
  );
}

export default App;
