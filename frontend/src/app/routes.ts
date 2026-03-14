import { createBrowserRouter } from "react-router";
import { MainLayout } from "./layouts/MainLayout";
import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { ProductDetail } from "./pages/ProductDetail";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true,         Component: Home          },
      { path: "products",    Component: Products      },
      { path: "product/:id", Component: ProductDetail },
      { path: "cart",        Component: Cart          },
      { path: "checkout",    Component: Checkout      },
      { path: "*",           Component: NotFound      },
    ],
  },
]);