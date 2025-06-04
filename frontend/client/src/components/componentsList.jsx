import { useEffect, useState } from "react";
import api from "../services/api";
import { FiShoppingCart, FiHeart, FiStar } from "react-icons/fi";
import "../styles/productList.css"; // Create this CSS file

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  if (loading) return <div className="loading-spinner"></div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="product-list-container">
      <h1 className="product-list-title">Our Premium Perfumes</h1>
      <p className="product-list-subtitle">Discover your signature scent</p>

      <div className="product-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <div className="product-image-container">
              <img
                src={product.image}
                alt={product.title}
                className="product-image"
                loading="lazy"
              />
              <button
                className={`wishlist-button ${
                  wishlist.includes(product._id) ? "active" : ""
                }`}
                onClick={() => toggleWishlist(product._id)}
              >
                <FiHeart />
              </button>
              {product.isNew && <span className="new-badge">New</span>}
              {product.discount && (
                <span className="discount-badge">-{product.discount}%</span>
              )}
            </div>

            <div className="product-info">
              <div className="product-header">
                <h3 className="product-title">{product.title}</h3>
                <div className="product-rating">
                  <FiStar className="star-icon" />
                  <span>{product.rating || "4.5"}</span>
                </div>
              </div>

              <p className="product-description">{product.shortDescription}</p>

              <div className="product-footer">
                <div className="price-container">
                  {product.originalPrice && (
                    <span className="original-price">
                      ${product.originalPrice}
                    </span>
                  )}
                  <span className="current-price">${product.price}</span>
                </div>
                <button className="add-to-cart-button">
                  <FiShoppingCart className="cart-icon" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
