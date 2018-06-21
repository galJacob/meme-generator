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

function closeModal() {
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
  var textareaIdx = +elInput.dataset.idx;
  // txtBeenBefore(elInput);
  var lastIdxTxt = getlastIdxTxt(textareaIdx);
  var line = lastIdxTxt.line;
  var size = lastIdxTxt.size;
  var align = lastIdxTxt.align;
  var color = document.querySelector(`#textarea-color${textareaIdx}`).value;
  var font = lastIdxTxt.font;

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

function getLineFromUser(line = 100) {
  return line;
}
function getSizeFromUser(size = 56) {
  return size;
}
function getAlignFromUser(align = 'center') {
  return align;
}
function getColorFromUser(color = 'red') {
  return color;
}
function getFontFromUser(font = 'Impact') {
  return font;
}

//gets the input from the user and showing the pictures that match the typed letters
function renderImgsByInput(elInput) {
  var sortedImgs = sortImgsByInput(elInput.value);
  renderImgs(sortedImgs);
}

function showFontMenu(id) {
  document.querySelector(`.font-pick${id}`).classList.toggle('hide');
}

function onUpdateTxtBy(param, id, type) {
  var elTextarea = document.querySelector(`#textarea${id}`);
  console.log('elTextArea.value', elTextarea.value);
  if (!elTextarea.value) return;
  updateTxtAt(param, id, type);
}

// function renderColorCtrlMenu() {
//   var elMenu = document.querySelector('.ctrl-btn-menu');
//   var strHtmls = 
// }
// gal

// gal

// Didi

// !Didi
// Change
