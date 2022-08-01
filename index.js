const imageContainer = document.querySelector('.image-container');
const userImage = document.getElementById('user_image');

/* Functions */

function handleImageUpload(event) {
  event.preventDefault();
  const [file] = document.getElementById('file').files;
  userImage.src = URL.createObjectURL(file);
  // userImage.onload = () => exportImage();
  userImage.onload = () => document.getElementById('download').style.display = 'block';
}

function exportImage() {
  html2canvas(document.querySelector(".image-container")).then(canvas => {
    const out = document.getElementById('out');
    
    out.innerHTML = '';
    out.appendChild(canvas)
    var image = canvas.toDataURL();

    var link = document.createElement("a");
    link.setAttribute('download', 'myfile.jpg');
    link.href = image;
    document.body.appendChild(link);
    link.click();
    link.remove();
  });
}

/* --------------------------- */

/* Event Listeners  */

// adjust border color
document.getElementById('white_border').addEventListener('change', () => {
  imageContainer.classList.toggle('light-border');
})

// toggle 3*3 mode
document.getElementById('3x3').addEventListener('change', () => {
  imageContainer.classList.toggle('grid9');
})

document.getElementById('upload').addEventListener('submit', handleImageUpload)

document.getElementById('download').addEventListener('click', exportImage)

/* --------------------------- */

/* Initial actions */

document.getElementById('white_border').checked = false;
document.getElementById('3x3').checked = false;

/* --------------------------- */