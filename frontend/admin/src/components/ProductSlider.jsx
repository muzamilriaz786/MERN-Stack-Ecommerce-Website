import api from "../services/api";
import "../styles/addProductSlide.css"; // Import the CSS file

const AddProductSlide = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
      const response = await api.post("/addSlidePosts", formData);
      if (response.status === 200) {
        alert("Slide added successfully");
      } else {
        alert("Error adding slide");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="add-slide-section">
      <div className="form-container">
        <h1>Add Slides</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="slideTitle"
            placeholder="Enter Slide Title"
            required
          />
          <input
            type="text"
            name="subTitle"
            placeholder="Enter the Slide Subtitle"
            required
          />
          <input
            type="text"
            name="button.text"
            placeholder="Button Text"
            required
          />
          <input
            type="text"
            name="button.url"
            placeholder="Button URL"
            required
          />

          <select name="button.style">
            <option value="primary">Primary</option>
            <option value="secondary">Secondary</option>
            <option value="outline">Outline</option>
          </select>

          <select name="button.target">
            <option value="_self">Same Tab</option>
            <option value="_blank">New Tab</option>
          </select>

          <input type="color" name="backgroundColor" />
          <input type="file" name="image" required />

          <input type="submit" value="Add Slide" />
        </form>
      </div>
    </section>
  );
};

export default AddProductSlide;
