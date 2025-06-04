import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/showProductSlide.css";

const ShowProductSlider = () => {
  const [showSlides, setShowSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  // Edit popup state
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editData, setEditData] = useState({
    slideTitle: "",
    subTitle: "",
    button: { text: "", url: "", style: "primary", target: "_self" },
    backgroundColor: "#ffffff",
    image: "", // URL string for preview
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [editSlideId, setEditSlideId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/getSlidesPost");
        setShowSlides(res?.data?.showSlides || []);
      } catch (error) {
        console.error("Error fetching slides:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (showSlides.length === 0) return;

    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === showSlides.length - 1 ? 0 : prevIndex + 1
        );
        setFade(true);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, [showSlides]);

  const handlePrev = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? showSlides.length - 1 : prevIndex - 1
      );
      setFade(true);
    }, 500);
  };

  const handleNext = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === showSlides.length - 1 ? 0 : prevIndex + 1
      );
      setFade(true);
    }, 500);
  };

  // Open edit popup and preload data
  const openEditPopup = (slide) => {
    setEditSlideId(slide._id);
    setEditData({
      slideTitle: slide.slideTitle || "",
      subTitle: slide.subTitle || "",
      button: {
        text: slide.button?.text || "",
        url: slide.button?.url || "",
        style: slide.button?.style || "primary",
        target: slide.button?.target || "_self",
      },
      backgroundColor: slide.backgroundColor || "#ffffff",
      image: slide.image || "",
    });
    setSelectedFile(null);
    setIsEditOpen(true);
  };

  // Close edit popup and reset
  const closeEditPopup = () => {
    setIsEditOpen(false);
    setSelectedFile(null);
    setEditData({
      slideTitle: "",
      subTitle: "",
      button: { text: "", url: "", style: "primary", target: "_self" },
      backgroundColor: "#ffffff",
      image: "",
    });
    setEditSlideId(null);
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("button.")) {
      const btnField = name.split(".")[1];
      setEditData((prev) => ({
        ...prev,
        button: { ...prev.button, [btnField]: value },
      }));
    } else {
      setEditData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle file input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    // For previewing selected image before upload
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setEditData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Save updated slide (PUT request with FormData)
  const handleSave = async () => {
    try {
      const formData = new FormData();

      formData.append("slideTitle", editData.slideTitle);
      formData.append("subTitle", editData.subTitle);
      formData.append("button.text", editData.button.text);
      formData.append("button.url", editData.button.url);
      formData.append("button.style", editData.button.style);
      formData.append("button.target", editData.button.target);
      formData.append("backgroundColor", editData.backgroundColor);

      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      const res = await api.put(`/updateSlidesPost/${editSlideId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Update slides state locally after successful update
      setShowSlides((prev) =>
        prev.map((slide) =>
          slide._id === editSlideId ? res.data.updatedSlide : slide
        )
      );

      closeEditPopup();
    } catch (error) {
      console.error("Error updating slide:", error);
      alert("Failed to update slide.");
    }
  };

  // Delete slide handler with confirmation
  const handleDelete = async (slideId) => {
    if (!window.confirm("Are you sure you want to delete this slide?")) return;

    try {
      await api.delete(`/deleteSlidesPost/${slideId}`);

      setShowSlides((prev) => prev.filter((slide) => slide._id !== slideId));

      // If the deleted slide is currently selected, move index or close popup
      if (currentIndex >= showSlides.length - 1) {
        setCurrentIndex(0);
      }

      // Close popup if editing the deleted slide
      if (editSlideId === slideId) {
        closeEditPopup();
      }
    } catch (error) {
      console.error("Error deleting slide:", error);
      alert("Failed to delete slide.");
    }
  };

  if (showSlides.length === 0) return null;

  const currentSlide = showSlides[currentIndex];

  return (
    <>
      <div
        className="hero-slider"
        style={{ backgroundColor: currentSlide.backgroundColor }}
      >
        <button className="nav-button left" onClick={handlePrev}>
          &#8249;
        </button>

        <div className={`hero-content ${fade ? "fade-in" : "fade-out"}`}>
          <div className="hero-image">
            <img src={currentSlide.image} alt={currentSlide.slideTitle} />
          </div>
          <div className="hero-text">
            <h2>{currentSlide.slideTitle}</h2>
            <p>{currentSlide.subTitle}</p>
            <a
              href={currentSlide.button.url}
              target={currentSlide.button.target}
              className={`hero-button ${currentSlide.button.style}`}
              rel={
                currentSlide.button.target === "_blank"
                  ? "noopener noreferrer"
                  : ""
              }
            >
              {currentSlide.button.text}
            </a>
            {/* Edit and Delete buttons for current slide */}
            <div style={{ marginTop: "10px" }}>
              <button onClick={() => openEditPopup(currentSlide)}>
                Edit Slide
              </button>
              <button
                onClick={() => handleDelete(currentSlide._id)}
                style={{
                  marginLeft: "10px",
                  backgroundColor: "#e74c3c",
                  color: "#fff",
                }}
              >
                Delete Slide
              </button>
            </div>
          </div>
        </div>

        <button className="nav-button right" onClick={handleNext}>
          &#8250;
        </button>
      </div>

      {/* Edit Slide Popup */}
      {isEditOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Edit Slide</h3>
            <label>
              Slide Title:
              <input
                type="text"
                name="slideTitle"
                value={editData.slideTitle}
                onChange={handleChange}
              />
            </label>

            <label>
              Subtitle:
              <input
                type="text"
                name="subTitle"
                value={editData.subTitle}
                onChange={handleChange}
              />
            </label>

            <label>
              Button Text:
              <input
                type="text"
                name="button.text"
                value={editData.button.text}
                onChange={handleChange}
              />
            </label>

            <label>
              Button URL:
              <input
                type="text"
                name="button.url"
                value={editData.button.url}
                onChange={handleChange}
              />
            </label>

            <label>
              Button Style:
              <select
                name="button.style"
                value={editData.button.style}
                onChange={handleChange}
              >
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
              </select>
            </label>

            <label>
              Button Target:
              <select
                name="button.target"
                value={editData.button.target}
                onChange={handleChange}
              >
                <option value="_self">Same Tab</option>
                <option value="_blank">New Tab</option>
              </select>
            </label>

            <label>
              Background Color:
              <input
                type="color"
                name="backgroundColor"
                value={editData.backgroundColor}
                onChange={handleChange}
              />
            </label>

            <label>
              Slide Image:
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </label>

            {/* Show preview of current or new image */}
            {editData.image && (
              <img
                src={editData.image}
                alt="Slide preview"
                style={{ width: "100%", marginTop: "10px" }}
              />
            )}

            <div className="popup-buttons">
              <button onClick={handleSave}>Save</button>
              <button onClick={closeEditPopup}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShowProductSlider;
