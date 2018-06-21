'use strict';


function init() {
  createImgs();
  renderImgs(gImgs);
}

function renderImgs(imgs) {
  var strHtmls = imgs.map(function (img) {
    var strHtml = `<li onclick = "openModal(${
      img.id
      })" class="img-pick fit-background img-${
      img.id
      }" style="background-image: url(../meme-imgs/${img.id}.jpg)" </li>`;
    return strHtml;
  });
  var strHtml = strHtmls.join('');
  var elImgsContainer = document.querySelector('.imgs-container ul');
  elImgsContainer.innerHTML = strHtml;
}

function openModal(id) {
  var elModal = document.querySelector('#editor-modal');
  setCanvas(id);
  elModal.classList.toggle('hide');
  chooseMeme(id);
}

function closeModal(){
  var elModal = document.querySelector('#editor-modal');
  elModal.classList.toggle('hide');
}

function setCanvas(id) {
  var elCanvas = document.querySelector('#meme-canvas');

  var img = new Image();
  img.onload = function () {
    elCanvas.width = img.width;
    elCanvas.height = img.height;
    var ctx = elCanvas.getContext('2d');
    // ctx.fillStyle = 'whitesmoke';
    // ctx.fillRect(0, 0, elCanvas.width, elCanvas.height);
    ctx.drawImage(img, 0, 0);

    var txts = getMemeTxts();
    renderTxtsOnCanvas(txts);
  };
  img.src = `../meme-imgs/${id}.jpg`;
}

function renderTxtsOnCanvas(txts) {
  txts.forEach(function (txt) {
    renderTxtOnCanvas(txt);
  });
}

function renderTxtOnCanvas(txt) {
  var elCanvas = document.querySelector('#meme-canvas');
  var ctx = elCanvas.getContext('2d');
  //   var middle = elCanvas.width*0.5 - size*txt.length*0.5;
  ctx.font = `${txt.size}px ${txt.font}`;
  ctx.fillStyle = txt.color;

  ctx.textAlign = txt.align;
  ctx.fillText(txt.str, elCanvas.width * 0.5, txt.line);
  ctx.lineWidth = txt.size / 20;
  ctx.strokeText(txt.str, elCanvas.width * 0.5, txt.line);
}



function onInpTextarea(elInput) {
  // console.log('elInput', elInput.dataset.idx);
  var str = elInput.value;
  // TODO: more inputs to send to obj
  var line = getLineFromUser();
  var size = getSizeFromUser();
  var align = getAlignFromUser();
  var color = getColorFromUser();
  var font = getFontFromUser();
  var textareaIdx = elInput.dataset.idx;

  assignTxt({
    str: str,
    line: line,
    size: size,
    align: align,
    color: color,
    font: font,
    textareaIdx: textareaIdx
  });
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
function getFontFromUser() {
  return 'Impact';
}

//gets the input from the user and showing the pictures that match the typed letters
function renderImgsByInput(elInput) {
  var sortedImgs = sortImgsByInput(elInput.value);
  renderImgs(sortedImgs);
}
// gal

// gal

// Didi

// !Didi
// Change
