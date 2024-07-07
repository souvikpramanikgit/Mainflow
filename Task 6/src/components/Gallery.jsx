import React, { useState } from 'react';
import './Gallery.css';
import ImageModal from './ImageModal';

const images = [
  'images/img7.jpg', 'images/img8.jpg', 'images/img3.jpg', 
  'images/img4.jpg', 'images/img1.jpg', 'images/img6.jpg',
  'images/img5.jpg', 'images/img2.jpg'
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openFullImg = (pic) => {
    setSelectedImage(pic);
  };

  const closeFullImg = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <div className={`full-img ${selectedImage ? 'show' : ''}`} id="fullImgBox">
        {selectedImage && <img src={selectedImage} alt="" id="fullImg" />}
        <span onClick={closeFullImg}>X</span>
      </div>
      <div className="img-gallery">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Gallery ${index}`}
            onClick={() => openFullImg(image)}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
