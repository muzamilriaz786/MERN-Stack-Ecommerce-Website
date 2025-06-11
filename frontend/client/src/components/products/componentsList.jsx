import { useEffect, useState } from "react";
import api from "../../services/api";
import { FiShoppingCart, FiHeart, FiStar } from "react-icons/fi";
import "../../styles/productList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Load cart from localStorage on first render
  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(localCart);
  }, []);

  // Load products
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

  const openCartModal = (product) => {
    setSelectedProduct(product);
    setQuantity(1); // Reset quantity on each open
    setShowModal(true);
  };

  const confirmAddToCart = () => {
    if (!selectedProduct) return;

    const existing = cart.find(
      (item) => item.productId === selectedProduct._id
    );
    let updatedCart;

    if (existing) {
      updatedCart = cart.map((item) =>
        item.productId === selectedProduct._id
          ? {
              ...item,
              quantity: Math.min(
                item.quantity + quantity,
                selectedProduct.stock
              ),
            }
          : item
      );
    } else {
      updatedCart = [
        ...cart,
        {
          productId: selectedProduct._id,
          quantity,
          title: selectedProduct.title,
          price: selectedProduct.price,
          image: selectedProduct.image,
        },
      ];
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setShowModal(false);
  };

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
                <button
                  className="add-to-cart-button"
                  onClick={() => openCartModal(product)}
                >
                  <FiShoppingCart className="cart-icon" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ======================= MODAL ======================= */}
      {showModal && selectedProduct && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{selectedProduct.title}</h2>
            <img
              src={selectedProduct.image}
              alt={selectedProduct.title}
              className="modal-image"
            />
            <p>{selectedProduct.shortDescription}</p>
            <p>
              <strong>Price:</strong> ${selectedProduct.price}
            </p>
            <p>
              <strong>Available Stock:</strong> {selectedProduct.stock}
            </p>

            <label>
              Quantity:
              <input
                type="number"
                min="1"
                max={selectedProduct.stock}
                value={quantity}
                onChange={(e) =>
                  setQuantity(
                    Math.max(
                      1,
                      Math.min(Number(e.target.value), selectedProduct.stock)
                    )
                  )
                }
              />
            </label>

            <div className="modal-buttons">
              <button className="modal-confirm" onClick={confirmAddToCart}>
                Add to Cart
              </button>
              <button
                className="modal-cancel"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
