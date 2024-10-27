import React, { useState } from "react";

const ImageConverter = () => {
  const [imageSrc, setImageSrc] = useState(null);

  // Handle the file input change and load the image
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      setImageSrc(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  // Convert the image to BMP format
  const convertToBMP = () => {
    const canvas = document.createElement("canvas");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      // Create a Blob and download the BMP image
      canvas.toBlob((blob) => {
        const bmpUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = bmpUrl;
        link.download = "converted-image.bmp";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, "image/bmp");
    };

    img.src = imageSrc;
  };

  return (
    <div>
      <h1>Image Converter (JPG/PNG to BMP)</h1>

      <input type="file" accept="image/jpeg, image/png" onChange={handleFileChange} />
      {imageSrc && (
        <div>
          <img src={imageSrc} alt="Uploaded" style={{ maxWidth: "300px" }} />
          <br />
          <button onClick={convertToBMP}>Convert to BMP</button>
        </div>
      )}
    </div>
  );
};

export default ImageConverter;
