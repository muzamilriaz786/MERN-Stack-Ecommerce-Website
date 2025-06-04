import SlideData from "../models/ProductSlide.js";
import fs from "fs";
export const saveSlidePosts = async (req, res) => {
  console.log(req.body);
  try {
    const {
      slideTitle,
      subTitle,
      "button.text": buttonText,
      "button.url": buttonUrl,
      "button.style": buttonStyle,
      "button.target": buttonTarget,
      backgroundColor,
    } = req.body;

    const image = req.file ? `uploads/${req.file.filename}` : null;

    if (!slideTitle || !subTitle || !buttonUrl || !image) {
      return res
        .status(400)
        .json({ message: "Please fill in all required fields" });
    }

    const slidedata = new SlideData({
      slideTitle,
      subTitle,
      image,
      backgroundColor,
      button: {
        text: buttonText,
        url: buttonUrl,
        style: buttonStyle || "primary",
        target: buttonTarget || "_self",
      },
    });

    await slidedata.save();

    res.status(200).json({ message: "Successfully saved" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving data" });
  }
};

export const getSlidePosts = async (req, res) => {
  try {
    const slideData = await SlideData.find();
    const fullSlides = slideData.map((slide) => ({
      ...slide.toObject(),
      image: `${req.protocol}://${req.get("host")}/${slide.image}`,
    }));
    res.status(200).json({ showSlides: fullSlides });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching data" });
  }
};



export const updateSlidePost = async (req, res) => {
  try {
    const id = req.params.id;
    const existingSlide = await SlideData.findById(id);

    if (!existingSlide) {
      return res.status(404).json({ message: "Slide not found" });
    }

    const {
      slideTitle,
      subTitle,
      "button.text": buttonText,
      "button.url": buttonUrl,
      "button.style": buttonStyle,
      "button.target": buttonTarget,
      backgroundColor,
    } = req.body;

    const newImage = req.file
      ? `uploads/${req.file.filename}`
      : existingSlide.image;

    // If there’s a new image, delete the old one
    if (req.file && existingSlide.image) {
      fs.unlink(existingSlide.image, (err) => {
        if (err) console.error("Failed to delete old image:", err);
      });
    }

    const updatedData = {
      slideTitle,
      subTitle,
      backgroundColor,
      image: newImage,
      button: {
        text: buttonText,
        url: buttonUrl,
        style: buttonStyle || "primary",
        target: buttonTarget || "_self",
      },
    };

    const updatedSlide = await SlideData.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    res
      .status(200)
      .json({ message: "Slide updated successfully", data: updatedSlide });
  } catch (error) {
    console.error(error, "Error updating slide");
    res.status(500).json({ message: "Error updating slide" });
  }
};

export const deleteSlidePost = async (req, res) => {
  try {
    const id = req.params.id;
    const slideData = await SlideData.findByIdAndDelete(id);

    if (!slideData) {
      return res.status(404).json({ message: "Slide not found" });
    }

    // Delete the associated image file
    if (slideData.image) {
      fs.unlink(slideData.image, (err) => {
        if (err) console.error("Failed to delete image file:", err);
      });
    }

    res.status(200).json({ message: "Slide deleted successfully" });
  } catch (error) {
    console.error(error, "Error deleting slide");
    res.status(500).json({ message: "Error deleting slide" });
  }
};