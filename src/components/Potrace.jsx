const fs = require('fs');
const potrace = require('potrace');

const convertBmpToSvg = (bmpFilePath, outputSvgPath) => {
  fs.readFile(bmpFilePath, (err, bmpData) => {
    if (err) {
      console.error("Error reading BMP file:", err);
      return;
    }

    potrace.trace(bmpData, (err, svg) => {
      if (err) {
        console.error("Error converting BMP to SVG:", err);
        return;
      }

      fs.writeFile(outputSvgPath, svg, (err) => {
        if (err) {
          console.error("Error writing SVG file:", err);
        } else {
          console.log(`SVG saved to ${outputSvgPath}`);
        }
      });
    });
  });
};


