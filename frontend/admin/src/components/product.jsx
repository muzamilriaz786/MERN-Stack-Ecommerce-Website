import api from "../services/api";
import "../styles/ProductPublish.css"; // make sure this file exists

const Product_Publish = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const res = await api.post("/upload-product", formData);
      if (res.status === 200) {
        alert("✅ Product Published Successfully!");
        e.target.reset(); // clear the form
      } else {
        alert("❌ Failed to publish product");
      }
    } catch (error) {
      console.error("Upload error", error);
      alert("❌ Failed to publish product");
    }
  };

  return (
    <section className="publish-section">

      <div className="form-container">
        <h2>Publish New Product</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="image">Product Image:</label>
            <input type="file" name="image" id="image" required />
          </div>

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

          <button type="submit" className="publish-btn">
            Publish
          </button>
        </form>
      </div>
    </section>
  );
};

export default Product_Publish;
