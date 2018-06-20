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
    elCanvas.width = img.width + 20;
    elCanvas.height = img.height + 20;
    var ctx = elCanvas.getContext('2d');
    ctx.fillStyle = 'whitesmoke';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 10, 10);
    handleText('Hello World', ctx);
    //Function that pushes fake txt
  };
  img.src = `../meme-imgs/${gMeme.selectedImgId}.jpg`;
}

function handleText(txt, ctx, line = 100) {
  ctx.font = '30px Arial';
  ctx.fillStyle= 'black'
  ctx.fillText(txt, 45, line);
}
