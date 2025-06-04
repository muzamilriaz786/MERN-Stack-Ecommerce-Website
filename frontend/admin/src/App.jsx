import { Routes, Route } from "react-router-dom";
import Product from "./components/product";
import ProductEdit from './pages/productEdit'
import Home from "./pages/Home";
import DeleteProductPage from "./pages/deleteProduct";
import ProductSlide from './pages/addProductSlider'
import AddTrustBadges from "./pages/addTrustBadges";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/post-perfume" element={<Product />} />
      <Route path="/products/edit/:id" element={<ProductEdit />} />
      <Route path="/products/delete/:id" element={<DeleteProductPage />} />
      <Route path="/ProductSlide" element={<ProductSlide />} />
      <Route path="/ShowTrustBadges" element={<AddTrustBadges />} />
    </Routes>
  );
}

export default App;
