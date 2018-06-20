'use strict';

console.log(2);
console.log('Didi the King!');

function init() {
  renderGallery();
  //   setCanvas();
}

function renderGallery() {
  var renderedGallery = gImgs.map(function(img) {
    var strHtml = `<li onclick = "openModal(${
      img.id
    })" class="img-pick fit-background img-${
      img.id
    }" style="background-image: url(../meme-imgs/${img.id}.jpg)" </li>`;
    return strHtml;
  });
  var renderedGallery = renderedGallery.join('');
  var elImgsContainer = document.querySelector('.imgs-container ul');
  console.log(renderedGallery);

  elImgsContainer.innerHTML = renderedGallery;
  // console.log(elImgsContainer);
}

function setCanvas(id) {
  var elCanvas = document.querySelector('#canvas');
  console.log(elCanvas);

  var img = new Image();
  img.onload = function() {
    elCanvas.width = img.width;
    elCanvas.height = img.height;
    var ctx = elCanvas.getContext('2d');
    // ctx.fillStyle = 'whitesmoke';
    // ctx.fillRect(0, 0, elCanvas.width, elCanvas.height);
    ctx.drawImage(img, 0, 0);
    renderTxtOnCanvas('Hello World');
  };
  img.src = `../meme-imgs/${id}.jpg`;
}

function renderTxtOnCanvas(txt, line = 100) {
  var elCanvas = document.querySelector('#canvas');
  var ctx = elCanvas.getContext('2d');
  ctx.font = '30px Arial';
  ctx.fillStyle = 'black';
  ctx.fillText(txt, 45, line);
}

function openModal(id) {
  var elModal = document.querySelector('.modal');
  setCanvas(id);
  elModal.style.display = 'flex';
}
