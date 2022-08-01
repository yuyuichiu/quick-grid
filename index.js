const imageContainer = document.querySelector('.image-container');
const userImage = document.getElementById('user_image');
const canvas = document.querySelector('canvas');
const context = canvas.getContext("2d");
const rawImage = new Image();

/* Functions */

function handleImageUpload(event) {
  event.preventDefault();
  const [file] = document.getElementById('file').files;
  userImage.src = URL.createObjectURL(file);
  rawImage.src = URL.createObjectURL(file);

  rawImage.onload = function () {
    updateCanvasBaseImage();
    document.getElementById('download').style.display = 'block';
  }
}

function updateCanvasBaseImage() {
  // replace <canvas> image with the dataURL of rawImage variable
  context.clearRect(0, 0, canvas.width, canvas.height); // clear old
  canvas.width = rawImage.width;
  canvas.height = rawImage.height;
  context.drawImage(userImage, 0, 0);
}

function applyGridToCanvas() {
  // Users sees another preview instead of the canvas in website, thus the canvas is for export only
  // Hence, grids are drawn to <canvas> only when user export the image
  // This function should draw gridline on the canvas based on the config

  const borderColor = document.getElementById('white_border').checked ? '#eeeeee' : '#444444'
  const gridSize = document.getElementById('3x3').checked ? 3 : 2;
  context.fillStyle = borderColor;

  if(gridSize === 3) {
    context.fillRect(Math.round(canvas.width / 3), 0, 1, canvas.height);       // vertical
    context.fillRect(Math.round(canvas.width / 3 * 2), 0, 1, canvas.height);   // vertical 2
    context.fillRect(0, Math.round(canvas.height / 3), canvas.width, 1);       // horizontal
    context.fillRect(0, Math.round(canvas.height / 3 * 2), canvas.width, 1);   // horizontal 2
  } else {
    context.fillRect(Math.round(canvas.width / 2), 0, 1, canvas.height);       // vertical
    context.fillRect(0, Math.round(canvas.height / 2), canvas.width, 1);       // horizontal
  }
}

function resetConfig() {
  document.getElementById('white_border').checked = false;
  document.getElementById('3x3').checked = false;
}

function exportImage() {
  // Convert <canvas> to dataURL, then create a temporary <a> to download it
  const filename = prompt('Insert filename');
  applyGridToCanvas(); // apply grid on export

  if (filename) {
    let outputDataURL = canvas.toDataURL('image/png');
    let a = document.createElement('a');
    a.setAttribute('download', filename);
    a.href = outputDataURL;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  updateCanvasBaseImage() // cleanup the grid with completion of export
}

/* --------------------------- */

/* Event Listeners  */

// adjust border color
document.getElementById('white_border').addEventListener('change', () => {
  document.getElementById('white_border').checked ? imageContainer.classList.add('light-border') : imageContainer.classList.remove('light-border')
})

// toggle 3*3 mode
document.getElementById('3x3').addEventListener('change', () => {
  document.getElementById('3x3').checked ? imageContainer.classList.add('grid9') : imageContainer.classList.remove('grid9');
})

document.getElementById('upload').addEventListener('submit', handleImageUpload)

document.getElementById('download').addEventListener('click', exportImage)

/* --------------------------- */

/* Initial actions */

resetConfig();
/* --------------------------- */