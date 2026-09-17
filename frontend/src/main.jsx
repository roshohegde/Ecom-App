import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./context/AuthContext";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { LoginPage, RegisterPage } from "./pages/AuthPages";
import { ProductDetail, ProductList } from "./pages/CatalogPages";
import { CartPage, OrderDetail, OrdersPage } from "./pages/CommercePages";
import { AdminCatalog } from "./pages/AdminPages";
import { SellerCatalog } from "./pages/SellerPages";
import "./styles.css";
const Denied = () => (
  <section className="state">
    <h1>Access denied</h1>
    <p>Your account does not have permission for that screen.</p>
  </section>
);
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Navigate to="/products" replace />} />
          <Route path="products" element={<ProductList />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route
            path="cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="orders"
            element={
              <ProtectedRoute>
                <OrdersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="orders/:id"
            element={
              <ProtectedRoute>
                <OrderDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin/catalog"
            element={
              <ProtectedRoute role="ADMIN">
                <AdminCatalog />
              </ProtectedRoute>
            }
          />
          <Route
            path="seller/catalog"
            element={
              <ProtectedRoute role="SELLER">
                <SellerCatalog />
              </ProtectedRoute>
            }
          />
          <Route path="access-denied" element={<Denied />} />
          <Route path="*" element={<Navigate to="/products" replace />} />
        </Route>
      </Routes>
    </AuthProvider>
  </BrowserRouter>,
);
