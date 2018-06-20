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
setCanvas(gMeme);

function setCanvas(meme) {
  var elCanvas = document.querySelector('#canvas');
  console.log(elCanvas);
  var imgWidth;
  var imgHeight;

  var img = new Image();
  img.onload = function() {
    imgWidth = this.width;
    imgHeight = this.height;
    alert(this.width + 'x' + this.height);
  };
  img.src = '/img/';
  // elCanvas.width =
}
