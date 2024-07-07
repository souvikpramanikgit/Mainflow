import React from 'react';
import './ImageModal.css';
const ImageModal = ({ image, closeModal }) => {
  return (
    <div className="modal">
      <span className="close" onClick={closeModal}>&times;</span>
      <img className="modal-content" src={image} alt="Selected" />
    </div>
  );
};
export default ImageModal;