'use strict';

console.log("Editor's Service");

var gMeme = {
  selectedImgId: 5,
  txts: [
    {
      line: 'I never eat Falafel',
      size: 20,
      align: 'left',
      color: 'red'
    }
  ]
};

setCanvas();

function setCanvas() {
  var elCanvas = document.querySelector('#canvas');
  console.log(elCanvas);

  var img = new Image();
  img.onload = function() {
    elCanvas.width = img.width;
    elCanvas.height = img.height ;
    var ctx = elCanvas.getContext('2d');
    // ctx.fillStyle = 'whitesmoke';
    // ctx.fillRect(0, 0, elCanvas.width, elCanvas.height);
    ctx.drawImage(img, 0, 0);
    renderTxtOnCanvas('Hello World');
  };
  img.src = `../meme-imgs/${gMeme.selectedImgId}.jpg`;
}

function renderTxtOnCanvas(txt, line = 100) {
  var elCanvas = document.querySelector('#canvas');
  var ctx = elCanvas.getContext('2d');
  ctx.font = '30px Arial';
  ctx.fillStyle = 'black';
  ctx.fillText(txt, 45, line);
}
