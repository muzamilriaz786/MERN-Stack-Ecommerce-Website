import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/ProductEdit.css";

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    title: "",
    price: "",
    shortDescription: "",
    stock: 0,
    category: "",
    weight: [],
    color: [],
    image: "",
  });

  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        const p = res.data;
        setProduct({
          title: p.title || "",
          price: p.price || 0,
          shortDescription: p.shortDescription || "",
          stock: p.stock || 0,
          category: p.category || "",
          weight: p.weight || [],
          color: p.color || [],
          image: p.image || "",
        });
      } catch (err) {
        console.log("Error fetching product", err);
      }
    };

    fetchProduct();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleWeightChange = (i, value) => {
    const newWeights = [...product.weight];
    newWeights[i] = value;
    setProduct((prev) => ({ ...prev, weight: newWeights }));
  };

  const handleColorChange = (i, field, value) => {
    const newColors = [...product.color];
    newColors[i][field] = value;
    setProduct((prev) => ({ ...prev, color: newColors }));
  };

  const handleColorImageChange = (i, file) => {
    const newColors = [...product.color];
    newColors[i].newImage = file;
    setProduct((prev) => ({ ...prev, color: newColors }));
  };

  const addWeight = () => {
    setProduct((prev) => ({ ...prev, weight: [...prev.weight, ""] }));
  };

  const removeWeight = (i) => {
    const newWeights = [...product.weight];
    newWeights.splice(i, 1);
    setProduct((prev) => ({ ...prev, weight: newWeights }));
  };

  const addColor = () => {
    setProduct((prev) => ({
      ...prev,
      color: [...prev.color, { name: "", code: "", image: "" }],
    }));
  };

  const removeColor = (i) => {
    const newColors = [...product.color];
    newColors.splice(i, 1);
    setProduct((prev) => ({ ...prev, color: newColors }));
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
    formData.append("stock", product.stock);
    formData.append("category", product.category);
    formData.append("weight", JSON.stringify(product.weight));
    formData.append(
      "color",
      JSON.stringify(product.color.map(({ name, code }) => ({ name, code })))
    );

    if (imageFile) {
      formData.append("image", imageFile);
    }

    product.color.forEach((c) => {
      if (c.newImage) {
        formData.append("colorImages", c.newImage);
      }
    });

    try {
      await api.put(`/updateProducts/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Product updated!");
      navigate("/");
    } catch (err) {
      console.error("Update failed", err);
      alert("❌ Update failed");
    }
  };

  return (
    <div className="product-edit-container">
      <h2>Edit Product</h2>
      <form
        onSubmit={handleSubmit}
        className="product-form"
        encType="multipart/form-data"
      >
        <div className="form-group">
          <input
            name="title"
            placeholder="Title"
            value={product.title}
            onChange={handleInputChange}
            required
          />
          <input
            name="price"
            type="number"
            placeholder="Price"
            value={product.price}
            onChange={handleInputChange}
            required
          />
        </div>

        <textarea
          name="shortDescription"
          placeholder="Short Description"
          value={product.shortDescription}
          onChange={handleInputChange}
          required
        />

        <div className="form-group">
          <input
            name="stock"
            type="number"
            placeholder="Stock"
            value={product.stock}
            onChange={handleInputChange}
          />
          <input
            name="category"
            placeholder="Category"
            value={product.category}
            onChange={handleInputChange}
          />
        </div>

        <div className="dynamic-section">
          <label>Weights:</label>
          {product.weight.map((w, i) => (
            <div key={i} className="inline-input">
              <input
                value={w}
                onChange={(e) => handleWeightChange(i, e.target.value)}
              />
              <button type="button" onClick={() => removeWeight(i)}>
                ❌
              </button>
            </div>
          ))}
          <button type="button" onClick={addWeight}>
            ➕ Add Weight
          </button>
        </div>

        <div className="dynamic-section">
          <label>Colors:</label>
          {product.color.map((c, i) => (
            <div key={i} className="color-box">
              <input
                placeholder="Color Name"
                value={c.name}
                onChange={(e) => handleColorChange(i, "name", e.target.value)}
              />
              <input
                type="file"
                onChange={(e) => handleColorImageChange(i, e.target.files[0])}
              />
              <div className="image-preview">
                {c.image && !c.newImage && <img src={c.image} alt="Old" />}
                {c.newImage && (
                  <img src={URL.createObjectURL(c.newImage)} alt="New" />
                )}
              </div>
              <button type="button" onClick={() => removeColor(i)}>
                ❌ Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addColor}>
            ➕ Add Color
          </button>
        </div>

        <div className="form-group">
          <label>Main Product Image:</label>
          <input type="file" onChange={handleImageChange} />
          <div className="image-preview">
            {product.image && !imageFile && (
              <img src={product.image} alt="Old" />
            )}
            {imageFile && (
              <img src={URL.createObjectURL(imageFile)} alt="New" />
            )}
          </div>
        </div>

        <button type="submit" className="submit-button">
          Update Product ✅
        </button>
      </form>
    </div>
  );
};

export default ProductEdit;
