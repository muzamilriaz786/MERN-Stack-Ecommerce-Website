import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data.products);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  // Open modal and store product to delete
  const openDeleteModal = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  // Close modal without deleting
  const closeDeleteModal = () => {
    setProductToDelete(null);
    setShowDeleteModal(false);
  };

  // Delete product API call + update UI
  const confirmDelete = async () => {
    if (!productToDelete) return;
    try {
      await api.delete(`/deleteProducts/${productToDelete._id}`);
      setProducts(products.filter((p) => p._id !== productToDelete._id));
      closeDeleteModal();
    } catch (error) {
      console.error("Failed to delete product:", error);
      alert("Failed to delete product. Please try again.");
    }
  };

  return (
    <div className="product-list">
      {products.map((product) => (
        <div className="product-card" key={product._id}>
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
          />
          <h2 className="product-title">{product.title}</h2>
          <p className="product-description">{product.shortDescription}</p>
          <p className="product-price">${product.price}</p>
          <div className="product-actions">
            <a href={`/products/edit/${product._id}`} className="btn edit-btn">
              Edit
            </a>
            <button
              className="btn delete-btn"
              onClick={() => openDeleteModal(product)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirm Delete</h3>
            <p>
              Are you sure you want to delete{" "}
              <strong>{productToDelete.title}</strong>?
            </p>
            <div className="modal-actions">
              <button className="btn cancel-btn" onClick={closeDeleteModal}>
                Cancel
              </button>
              <button className="btn delete-btn" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add modal CSS in ProductList.css */}
      {/* See below for example */}
    </div>
  );
};

export default ProductList;
