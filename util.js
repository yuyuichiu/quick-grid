/** 
 * Replaces <canvas> image with the dataURL of rawImage variable
 * @param {HTMLCanvasElement} canvas - your canvas element
 * @param {HTMLImage} newImage - image to replace the canvas
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
  let outputDataURL = canvas.toDataURL('image/jpeg', 0.8);
  let a = document.createElement('a');
  a.setAttribute('download', filename + '.jpg');
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
  const gridMode = document.getElementById('3x3').checked ? 3 : 2;
  const borderColor = document.getElementById('white_border').checked ? '#eee' : '#444';
  const gridLineSize = (canvas.width >= 1920 || canvas.height >= 1080) ? 3 : 1;
  context.fillStyle = borderColor;

  if(gridMode === 3) {
    context.fillRect(Math.round(canvas.width / 3), 0, gridLineSize, canvas.height);       // vertical
    context.fillRect(Math.round(canvas.width / 3 * 2), 0, gridLineSize, canvas.height);   // vertical 2
    context.fillRect(0, Math.round(canvas.height / 3), canvas.width, gridLineSize);       // horizontal
    context.fillRect(0, Math.round(canvas.height / 3 * 2), canvas.width, gridLineSize);   // horizontal 2
  } else {
    context.fillRect(Math.round(canvas.width / 2), 0, gridLineSize, canvas.height);       // vertical
    context.fillRect(0, Math.round(canvas.height / 2), canvas.width, gridLineSize);       // horizontal
  }
}

/** Flip canvas content horizontally and/or vertically 
 * @param {HTMLCanvasElement} canvas - your canvas element
 * @param {boolean} flipX - whether to flip vertically
 * @param {boolean} flipY - whether to flip horizontally
*/
export function flipCanvas(canvas, flipX, flipY) {
  if(!canvas || !flipX && !flipY) { return }
  const context = canvas.getContext("2d");

  const scaleX = flipX ? -1 : 1;                     // Flip context with negative scaling
  const scaleY = flipY ? -1 : 1;
  const posX = flipX ? canvas.width * -1 : 0;        // When context is flipped, start position from our end point.
  const posY = flipY ? canvas.height * -1 : 0;

  context.save();                                                        // save default non-flipped context for later reversion
  context.scale(scaleX, scaleY);                                         // Flip context with negative scaling
  context.drawImage(canvas, posX, posY, canvas.width, canvas.height);    // Insert the inversed image into canvas
  context.restore();                                                     // revert flippped context to default
}