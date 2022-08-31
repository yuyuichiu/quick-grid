import { drawGridToCanvas, downloadCanvasImage, flipCanvas, updateCanvasBaseImage } from './util.js';

const canvas = document.querySelector('canvas');
const imageContainer = document.querySelector('.image-container');
const userImage = document.getElementById('user_image');
const rawImage = new Image();
let uploadedFileName;

/* Functions */

function exportImage() {
  // Convert <canvas> to dataURL, then create a temporary <a> to download it  
  const filename = prompt('Insert filename', `${uploadedFileName}_grid`);
  const flipX = document.getElementById('flip-horizontal').checked;
  const flipY = document.getElementById('flip-vertical').checked;

  if (filename) {
    flipCanvas(canvas, flipX, flipY);               // flip image (canvas) based on user preference
    drawGridToCanvas(canvas);                       // grids are drawn to canvas only on export.
    downloadCanvasImage(canvas, filename);          // download file
    updateCanvasBaseImage(canvas, rawImage);        // cleanup the grid with completion of export
  }
}

function handleImageUpload(event) {
  event.preventDefault();
  if (document.getElementById('file').files.length < 1) { return document.getElementById('file').focus() }

  document.getElementById('download').style.display = 'none';
  const [file] = document.getElementById('file').files;
  uploadedFileName = file.name.substr(0, file.name.lastIndexOf("."));

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function (e) {
    userImage.src = e.target.result;
    rawImage.src = e.target.result;
    
    rawImage.onload = function () {
      updateCanvasBaseImage(canvas, rawImage);
      document.getElementById('download').style.display = 'block';
    }
  }
}

function resetConfig() {
  document.getElementById('white_border').checked = false;
  document.getElementById('3x3').checked = false;
  document.getElementById('flip-vertical').checked = false;
  document.getElementById('flip-horizontal').checked = false;
}

function toggleBorderColor() {
  document.getElementById('white_border').checked ? imageContainer.classList.add('light-border') : imageContainer.classList.remove('light-border');
}

function toggleGridMode() {
  document.getElementById('3x3').checked ? imageContainer.classList.add('grid9') : imageContainer.classList.remove('grid9');
}

function toggleHorizontalFlip() {
  document.getElementById('flip-horizontal').checked ? imageContainer.classList.add('horizontal') : imageContainer.classList.remove('horizontal')
}

function toggleVerticalFlip() {
  document.getElementById('flip-vertical').checked ? imageContainer.classList.add('vertical') : imageContainer.classList.remove('vertical')
}

/* --------------------------- */

/* Event Listeners  */

document.getElementById('white_border').addEventListener('change', toggleBorderColor)

document.getElementById('3x3').addEventListener('change', toggleGridMode)

document.getElementById('flip-horizontal').addEventListener('change', toggleHorizontalFlip)

document.getElementById('flip-vertical').addEventListener('change', toggleVerticalFlip)

document.getElementById('upload').addEventListener('submit', handleImageUpload)

document.getElementById('download').addEventListener('click', exportImage)

/* --------------------------- */

/* Initial actions */

resetConfig();

/* --------------------------- */