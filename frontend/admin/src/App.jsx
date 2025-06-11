import { Routes, Route } from "react-router-dom";
import Product from "./components/product";
import ProductEdit from "./pages/productEdit";
import Home from "./pages/Home";
import DeleteProductPage from "./pages/deleteProduct";
import ProductSlide from "./pages/addProductSlider";
import AddTrustBadges from "./pages/addTrustBadges";
import Logout from "./pages/logout";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Admin-only protected routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/post-perfume"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Product />
          </ProtectedRoute>
        }
      />
      <Route
        path="/products/edit/:id"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <ProductEdit />
          </ProtectedRoute>
        }
      />
      <Route
        path="/products/delete/:id"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <DeleteProductPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ProductSlide"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <ProductSlide />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ShowTrustBadges"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AddTrustBadges />
          </ProtectedRoute>
        }
      />
      <Route
        path="/Logout"
        element={
          <ProtectedRoute allowedRoles={["admin", "client"]}>
            <Logout />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
