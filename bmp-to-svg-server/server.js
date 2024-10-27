// server.js
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const potrace = require('potrace');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' }); // Temporary upload directory

const convertBmpToSvg = (bmpFilePath, outputSvgPath, callback) => {
  fs.readFile(bmpFilePath, (err, bmpData) => {
    if (err) {
      return callback(`Error reading BMP file: ${err}`);
    }

    potrace.trace(bmpData, (err, svg) => {
      if (err) {
        return callback(`Error converting BMP to SVG: ${err}`);
      }

      fs.writeFile(outputSvgPath, svg, (err) => {
        if (err) {
          return callback(`Error writing SVG file: ${err}`);
        }
        callback(null, outputSvgPath); // Return the path of the saved SVG
      });
    });
  });
};

app.post('/convert', upload.single('image'), (req, res) => {
  const bmpFilePath = req.file.path;
  const outputSvgPath = path.join(__dirname, 'output', `${req.file.filename}.svg`);

  convertBmpToSvg(bmpFilePath, outputSvgPath, (err, svgPath) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.download(svgPath); // Send the SVG file back to the client
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
