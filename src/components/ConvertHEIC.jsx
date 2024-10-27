import React, { useState } from "react";
import heic2any from "heic2any";

const ImageUploader = () => {
  const [imageSrc, setImageSrc] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.type === "image/heic" || file.type === "image/heif") {
        try {
          const blob = await heic2any({ blob: file, toType: "image/jpeg" });
          const convertedImageUrl = URL.createObjectURL(blob);
          setImageSrc(convertedImageUrl);
        } catch (error) {
          console.error("Error converting HEIC file:", error);
        }
      } else {
        // For non-HEIC images (JPG, PNG)
        const imageUrl = URL.createObjectURL(file);
        setImageSrc(imageUrl);
      }
    }
  };

  return (
    <div>
      <h2>Upload An Image </h2>
      <h3> HEIC, PNG, JPG accepted </h3>

      <input
        type="file"
        accept="image/heic, image/heif, image/jpeg, image/png"
        onChange={handleFileChange}
      />
      {imageSrc && (
        <div>
          <img src={imageSrc} alt="Uploaded" style={{ maxWidth: "400px" }} />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
