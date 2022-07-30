const imageContainer = document.querySelector('.image-container');

// handle image upload
function handleImageUpload(event) {
  event.preventDefault();
  const [file] = document.getElementById('file').files;
  document.getElementById('user_image').src = URL.createObjectURL(file)
}

document.getElementById('upload').addEventListener('submit', handleImageUpload)

// adjust border color
.addEventListener('change', () => {
  imageContainer.classList.toggle('light-border');
})

// toggle 3*3 mode
document.getElementById('3x3').addEventListener('change', () => {
  imageContainer.classList.toggle('grid9');
})

// Initial actions
document.getElementById('white_border').checked = false;
document.getElementById('3x3').checked = false;