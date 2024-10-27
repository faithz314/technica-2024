import React, { useState, useRef } from "react";

const PhotoUploader = () => {
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const [cameraPhoto, setCameraPhoto] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      })
      .catch((err) => {
        console.error("Error accessing camera:", err);
      });
  };

  const capturePhoto = () => {
    const context = canvasRef.current.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, 300, 150);
    const imageData = canvasRef.current.toDataURL("image/png");
    setCameraPhoto(imageData);
  };

  return (
    <div>
      <h1>Photo Uploader and Camera</h1>

      {/* Photo Upload */}
      <h2>Upload a Photo</h2>
      <input type="file" accept="image/*" onChange={handlePhotoUpload} />
      {uploadedPhoto && (
        <div>
          <h3>Uploaded Photo:</h3>
          <img src={uploadedPhoto} alt="Uploaded" style={{ width: "300px" }} />
        </div>
      )}

      {/* Camera Capture */}
      <h2>Take a Picture</h2>
      <button onClick={startCamera}>Open Camera</button>
      <div>
        <video ref={videoRef} style={{ width: "300px" }}></video>
        <button onClick={capturePhoto}>Capture Photo</button>
      </div>
      <canvas ref={canvasRef} style={{ display: "none" }} width="300" height="150"></canvas>
      {cameraPhoto && (
        <div>
          <h3>Captured Photo:</h3>
          <img src={cameraPhoto} alt="Captured" style={{ width: "300px" }} />
        </div>
      )}
    </div>
  );
};

export default PhotoUploader;
