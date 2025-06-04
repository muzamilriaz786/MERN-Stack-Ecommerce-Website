import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/ProductEdit.css";

const ProductEdit = () => {
  const { id } = useParams(); // Get product ID from the route
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    title: "",
    price: "",
    shortDescription: "",
    image: "",
  });

  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Fetch product data via GET request
        const res = await api.get(`/products/${id}`);
        setProduct(res.data.product);
      } catch (error) {
        console.error("Failed to load product", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("price", product.price);
    formData.append("shortDescription", product.shortDescription);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      // Use the correct PUT endpoint
      const res = await api.put(`/updateProducts/${id}`, formData);
      if (res.status === 200) {
        alert("✅ Product updated successfully!");
        navigate("/"); // redirect to product list
      } else {
        alert("❌ Failed to update product");
      }
    } catch (error) {
      console.error("Update error", error);
      alert("❌ Failed to update product");
    }
  };

  const handleCancel = () => {
    navigate("/"); // redirect back to product list (better than "/")
  };

  return (
    <section className="edit-section">
      <div className="form-container">
        <h2>Edit Product</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="title">Product Title:</label>
            <input
              type="text"
              name="title"
              id="title"
              value={product.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Product Price:</label>
            <input
              type="number"
              name="price"
              id="price"
              value={product.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="shortDescription">Description:</label>
            <textarea
              name="shortDescription"
              id="shortDescription"
              value={product.shortDescription}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Product Image (upload new to change):</label>
            <input
              type="file"
              name="image"
              id="image"
              onChange={handleImageChange}
            />
          </div>

          <div className="button-group">
            <button type="submit" className="update-btn">
              Update
            </button>
            <button type="button" className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ProductEdit;
