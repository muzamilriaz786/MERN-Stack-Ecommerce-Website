import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/showSlideProduct.css";

const ShowProductSlider = () => {
  const [showSlides, setShowSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

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
    const interval = setInterval(() => {
      setFade(false); // start fade out
      setTimeout(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === showSlides.length - 1 ? 0 : prevIndex + 1
        );
        setFade(true); // fade in new slide
      }, 500); // match with CSS fade duration
    }, 4000); // 4 seconds per slide

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

  if (showSlides.length === 0) return null;

  const currentSlide = showSlides[currentIndex];

  return (
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
        </div>
      </div>

      <button className="nav-button right" onClick={handleNext}>
        &#8250;
      </button>
    </div>
  );
};

export default ShowProductSlider;
