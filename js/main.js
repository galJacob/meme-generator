'use strict';

console.log(2);
console.log('Didi the King!');

function init() {
    createImgs();
    renderGallery(gImgs);
    //   setCanvas();
}

function renderGallery(imgs) {
    var renderedGallery = imgs.map(function (img) {
        var strHtml = `<li onclick = "openModal(${
            img.id
            })" class="img-pick fit-background img-${
            img.id
            }" style="background-image: url(../meme-imgs/${img.id}.jpg)" </li>`;
        return strHtml;
    });
    var renderedGallery = renderedGallery.join('');
    var elImgsContainer = document.querySelector('.imgs-container ul');
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
  };
  img.src = `../meme-imgs/${id}.jpg`;
}

function renderTxtsOnCanvas(txts) {
  console.log('txts', txts);
  txts.forEach(function(txt) {
    renderTxtOnCanvas(txt);
  });
}
// {
//     line: 100,
//     str: 'I never eat Falafel',
//     size: 20,
//     align: 'left',
//     color: 'red',
//     font: 'Impact'
//   }
function renderTxtOnCanvas(txt) {
  var elCanvas = document.querySelector('#canvas');
  var ctx = elCanvas.getContext('2d');
  //   var middle = elCanvas.width*0.5 - size*txt.length*0.5;
  ctx.font = `${txt.size}px ${txt.font}`;
  ctx.fillStyle = txt.color;

  ctx.textAlign = txt.align;
  ctx.fillText(txt.str, elCanvas.width * 0.5, txt.line);
  ctx.lineWidth = txt.size / 20;
  ctx.strokeText(txt.str, elCanvas.width * 0.5, txt.line);
}

function openModal(id) {
  var elModal = document.querySelector('.modal');
  setCanvas(id);
  elModal.style.display = 'flex';
  chooseMeme(id);
}

function onInpTextarea(elInput) {
  //   console.log('elInput val', elInput.value);
  var str = elInput.value;
  // TODO: more inputs to send to obj
  var line = getLineFromUser();
  var size = getSizeFromUser();
  var align = getAlignFromUser();
  var color = getColorFromUser();

  assignTxt({ str: str, line: line, size: size, align: align, color: color });
}

function getLineFromUser() {
  return 100;
}
function getSizeFromUser() {
  return 56;
}
function getAlignFromUser() {
  return 'center';
}
function getColorFromUser() {
  return 'red';
}

//gets the input from the user and showing the pictures that match the typed letters
function renderImgsByInput(elInput) {
    var input = elInput.value;
    var sortedImgs =  sortImgsByInput(input);
    renderGallery(sortedImgs);
}
// gal

// gal

// Didi

// !Didi
