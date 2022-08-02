import { resetConfig, drawGridToCanvas, downloadCanvasImage, updateCanvasBaseImage } from './util.js';

const canvas = document.querySelector('canvas');
const context = canvas.getContext("2d");
const imageContainer = document.querySelector('.image-container');
const userImage = document.getElementById('user_image');
const rawImage = new Image();

/* Functions */

function handleImageUpload(event) {
  event.preventDefault();
  const [file] = document.getElementById('file').files;
  userImage.src = URL.createObjectURL(file);
  rawImage.src = URL.createObjectURL(file);

  rawImage.onload = function () {
    updateCanvasBaseImage(canvas, rawImage);
    document.getElementById('download').style.display = 'block';
  }
}

function toggleBorderColor() {
  document.getElementById('white_border').checked ? imageContainer.classList.add('light-border') : imageContainer.classList.remove('light-border');
}

function toggleGridMode() {
  document.getElementById('3x3').checked ? imageContainer.classList.add('grid9') : imageContainer.classList.remove('grid9');
}

function exportImage() {
  // Convert <canvas> to dataURL, then create a temporary <a> to download it  
  const filename = prompt('Insert filename');
  if (filename) {
    drawGridToCanvas(canvas);                // grids are drawn to canvas only on export.
    downloadCanvasImage(canvas, filename);   // download file
    updateCanvasBaseImage(canvas, rawImage); // cleanup the grid with completion of export
  }
}

/* --------------------------- */

/* Event Listeners  */

document.getElementById('white_border').addEventListener('change', toggleBorderColor)

document.getElementById('3x3').addEventListener('change', toggleGridMode)

document.getElementById('upload').addEventListener('submit', handleImageUpload)

document.getElementById('download').addEventListener('click', exportImage)

/* --------------------------- */

/* Initial actions */

resetConfig();
/* --------------------------- */