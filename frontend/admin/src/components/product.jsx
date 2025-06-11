import { useState } from "react";
import api from "../services/api";
import "../styles/ProductPublish.css";

const Product_Publish = () => {
  const [colorOptions, setColorOptions] = useState([{ name: "", image: null }]);
  const [weights, setWeights] = useState([""]);

  const handleColorChange = (index, field, value) => {
    const updated = [...colorOptions];
    updated[index][field] = value;
    setColorOptions(updated);
  };

  const addColorField = () => {
    setColorOptions([...colorOptions, { name: "", image: null }]);
  };

  const removeColorField = (index) => {
    const updated = colorOptions.filter((_, i) => i !== index);
    setColorOptions(updated.length ? updated : [{ name: "", image: null }]);
  };

  const handleWeightChange = (index, value) => {
    const updated = [...weights];
    updated[index] = value;
    setWeights(updated);
  };

  const addWeightField = () => {
    setWeights([...weights, ""]);
  };

  const removeWeightField = (index) => {
    const updated = weights.filter((_, i) => i !== index);
    setWeights(updated.length ? updated : [""]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Append weights as JSON string
    const filteredWeights = weights.filter((w) => w.trim() !== "");
    formData.set("weight", JSON.stringify(filteredWeights));

    // Append color names as JSON string
    const colorNames = colorOptions
      .map((c) => c.name.trim())
      .filter((name) => name !== "");
    formData.set("color", JSON.stringify(colorNames));

    // Append color images manually
    colorOptions.forEach((color) => {
      if (color.image) {
        formData.append("colorImages", color.image);
      }
    });

    try {
      const res = await api.post("/upload-product", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.status === 200) {
        alert("✅ Product Published Successfully!");
        e.target.reset();
        setColorOptions([{ name: "", image: null }]);
        setWeights([""]);
      } else {
        alert("❌ Failed to publish product");
      }
    } catch (error) {
      console.error("Upload error", error);
      alert("❌ Failed to publish product");
    }
  };

  const isLastColorFilled = () => {
    const last = colorOptions[colorOptions.length - 1];
    return last.name.trim() !== "" && last.image !== null;
  };

  const isLastWeightFilled = () => {
    const last = weights[weights.length - 1];
    return last.trim() !== "";
  };

  return (
    <section className="publish-section">
      <div className="form-container">
        <h2>Publish New Product</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Main product image */}
          <div className="form-group">
            <label htmlFor="image">Product Image:</label>
            <input type="file" name="image" id="image" required />
          </div>

          {/* Product fields */}
          <div className="form-group">
            <label htmlFor="title">Product Title:</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Product Title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Product Price:</label>
            <input
              type="number"
              name="price"
              id="price"
              placeholder="Product Price"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="shortDescription">Product Description:</label>
            <textarea
              name="shortDescription"
              id="shortDescription"
              placeholder="Product description"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              name="category"
              id="category"
              placeholder="Category"
            />
          </div>

          <div className="form-group">
            <label htmlFor="stock">Stock:</label>
            <input type="number" name="stock" id="stock" placeholder="Stock" />
          </div>

          {/* Weights */}
          <div className="form-group">
            <label>Weights:</label>
            {weights.map((weight, i) => (
              <div key={i} style={{ marginBottom: "0.5rem" }}>
                <input
                  type="text"
                  placeholder="e.g. 250g, 500g, 1kg"
                  value={weight}
                  onChange={(e) => handleWeightChange(i, e.target.value)}
                  required
                />
                {weights.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeWeightField(i)}
                    style={{ marginLeft: "0.5rem" }}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            {isLastWeightFilled() && (
              <button type="button" onClick={addWeightField}>
                + Add Another Weight
              </button>
            )}
          </div>

          {/* Colors */}
          <div className="form-group">
            <label>Color Variants:</label>
            {colorOptions.map((color, i) => (
              <div key={i} style={{ marginBottom: "1rem" }}>
                <input
                  type="text"
                  placeholder="Color Name"
                  value={color.name}
                  onChange={(e) => handleColorChange(i, "name", e.target.value)}
                  required
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleColorChange(i, "image", e.target.files[0])
                  }
                  required
                />
                {colorOptions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeColorField(i)}
                    style={{ marginLeft: "0.5rem" }}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            {isLastColorFilled() && (
              <button type="button" onClick={addColorField}>
                + Add Another Color
              </button>
            )}
          </div>

          <button type="submit" className="submit-btn">
            Publish Product
          </button>
        </form>
      </div>
    </section>
  );
};

export default Product_Publish;
