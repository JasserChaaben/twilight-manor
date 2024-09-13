import React, { useState } from "react";
import "./Slider.css"; // Make sure to create a CSS file
import male from "../Images/male-player.png";
import female from "../Images/female-player.png";

const images = [
  male, // Replace with actual image URLs
  female,
];

const Slider = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [animationClass, setAnimationClass] = useState(""); // Tracks animation direction

  const nextImage = () => {
    console.log("right");
    setAnimationClass("right");
    setTimeout(() => {
      setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
      setAnimationClass(""); // Reset animation class
    }, 500); // Wait for the animation to complete before resetting
  };

  const prevImage = () => {
    console.log("left");
    setAnimationClass("left");
    setTimeout(() => {
      setCurrentImage((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
      setAnimationClass(""); // Reset animation class
    }, 500);
  };

  return (
    <div className="slider-container">
      <div className={`slider-image ${animationClass}`}>
        <img src={images[currentImage]} alt="Slider" />
      </div>
      <button onClick={prevImage}>Go Left</button>
      <button onClick={nextImage}>Go Right</button>
    </div>
  );
};

export default Slider;
