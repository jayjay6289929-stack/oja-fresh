import { createBrowserRouter } from "react-router";
import { MainLayout } from "./layouts/MainLayout";
import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { ProductDetail } from "./pages/ProductDetail";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { AuthPage } from "./pages/AuthPage";
import { OrderHistory } from "./pages/OrderHistory";
import { AdminSummary } from "./pages/AdminSummary";
import { NotFound } from "./pages/NotFound";

const RegisterPage = () => <AuthPage mode="register" />;

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true,          Component: Home          },
      { path: "products",     Component: Products      },
      { path: "product/:id",  Component: ProductDetail },
      { path: "cart",         Component: Cart          },
      { path: "checkout",     Component: Checkout      },
      { path: "login",        Component: AuthPage      },
      { path: "register",     Component: RegisterPage },
      { path: "orders",       Component: OrderHistory  },
      { path: "admin",        Component: AdminSummary  },
      { path: "*",            Component: NotFound      },
    ],
  },
]);