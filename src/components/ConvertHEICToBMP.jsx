import React, { useState } from "react";
import heic2any from "heic2any";
import convertBMPToSVG from './Potrace.jsx'


/**
 * 2 step process:
 * 1) we upload an image -> if it's a png, then that's good; if it's a heic, we convert it into a jpeg
 * 2) after we have our png/jpg, we convert it into a BMP image
 */
const ImageUploader = () => {


  const [imageSrc, setImageSrc] = useState(null);
  const [bmpFile, setBmpFile] = useState(null);
  const [svgFile, setSvgFile] = useState(null); // State to hold SVG file URL

  const handleFileChange = async (e) => {
    const file = e.target.files[0];





    if (file) { //if file is inputted
      if (file.type === "image/heic" || file.type === "image/heif") { //if the file is a hiec
        try { //if the image is a heic, convert it into a jpg url and set it as the imgsrc
          const blob = await heic2any({ blob: file, toType: "image/jpeg" });
          const convertedImageUrl = URL.createObjectURL(blob);
          setImageSrc(convertedImageUrl);
        } catch (error) {
          console.error("Error converting HEIC file:", error);
        }
      } else { //if the image is a png/jpg, set the imgsrc url to that directly
        const imageUrl = URL.createObjectURL(file);
        setImageSrc(imageUrl);
      }
    }
  };




  //convert image to BMP
  const convertToBmp = () => {
    const img = new Image();
    img.src = imageSrc; //source of the image url should be the uploaded image
    img.crossOrigin = "Anonymous"; // To handle cross-origin issues


    //draw the image onto a canvas (effictively converts to bmp)
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);


      const bmpDataUrl = canvas.toDataURL("image/bmp"); //converts the drawn image into a bmp url
      
      //convert data to blob object
      const bmpBlob = dataURLtoBlob(bmpDataUrl);
      const bmpFileUrl = URL.createObjectURL(bmpBlob);

      // Save the BMP file URL for download or further usage
      setBmpFile(bmpFileUrl);
      


      // Convert BMP to SVG after BMP conversion
      convertBMPToSVG(bmpBlob, (svgUrl) => {
        setSvgFile(svgUrl); // Store the SVG file URL in state
      });
    };
  };



  // Helper function to convert data URL to Blob
  const dataURLtoBlob = (dataURL) => {
    const byteString = atob(dataURL.split(",")[1]);
    const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };


  return (
    <div>
      <h2>Upload An Image </h2>
      <p> HEIC, PNG, JPG accepted </p>

      <input
        type="file"
        accept="image/heic, image/heif, image/jpeg, image/png"
        onChange={handleFileChange}
      />


      {imageSrc && (
        <div>
          <h2>Preview:</h2>
          <img src={imageSrc} alt="Uploaded" style={{ maxWidth: "400px" }} />
          <br />
          <button onClick={convertToBmp}>Convert to BMP</button>
        </div>
      )}

        
        




      {bmpFile && (
        <div>
          <h2>Download BMP:</h2>
          <a href={bmpFile} download="converted-image.bmp">
            Download BMP
          </a>
        </div>)}


      {svgFile && (
        <div>
          <h2>Download SVG:</h2>
          <a href={svgFile} download="converted-image.svg">
            Download SVG
          </a>
        </div>



      )}
    </div>
  );
};

export default ImageUploader;
