/** Reset user config to default values */
export function resetConfig() {
  document.getElementById('white_border').checked = false;
  document.getElementById('3x3').checked = false;
}

/** 
 * Replaces <canvas> image with the dataURL of rawImage variable
 * @param {HTMLCanvasElement} canvas - your canvas element
 * @param {String} newImage - image to replace the canvas
 */
export function updateCanvasBaseImage(canvas, newImage) {
  const context = canvas.getContext("2d");

  context.clearRect(0, 0, canvas.width, canvas.height); // clear old
  canvas.width = newImage.width;
  canvas.height = newImage.height;
  context.drawImage(newImage, 0, 0);
}

/** Downloads current canvas as image file
 * @param {HTMLCanvasElement} canvas - your canvas element
 * @param {String} filename - custom name of downloaded file, suffix is optional
 */
export function downloadCanvasImage(canvas, filename) {
  let outputDataURL = canvas.toDataURL('image/png');
  let a = document.createElement('a');
  a.setAttribute('download', filename);
  a.href = outputDataURL;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

/** Draws gridline on the canvas based on the config
 * @param {HTMLCanvasElement} canvas - your canvas element
 */
export function drawGridToCanvas(canvas) {
  const context = canvas.getContext("2d");

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
