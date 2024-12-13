"use client";
import React from "react";
import "./Carousel.scss";

const images = [
  "/images/img1.png",
  "/images/img2.png",
  "/images/img3.png",
  "/images/img4.png",
  "/images/img5.png",
  "/images/img6.png",
  "/images/img7.png",
  "/images/img8.png",
  "/images/img9.png",
  "/images/img10.png",
];

function HomePageCarousel() {
  return (
    <div className="slider" style={{ "--width": "100px", "--height": "100px", "--quantity": images.length }}>
      <div className="list">
        {images.map((src, index) => (
          <div className="item" key={index} style={{ "--position": index + 1 }}>
              <div className="box">
            <img src={src} alt={`slider${index + 1}`} />
              </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePageCarousel;