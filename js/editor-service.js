'use strict';

console.log("Editor's Service");

var gMeme = {
  selectedImgId: 5,
  txts: [
    {
      line: 100,
      str: 'I never eat Falafel',
      size: 20,
      align: 'left',
      color: 'red',
      font: 'Impact'
    }
  ]
};

function assignTxt(txtObj) {
  gMeme.txts.push(txtObj);
  renderTxtsOnCanvas(gMeme.txts);
}

function chooseMeme(id) {
  gMeme = {
    selectedImgId: id,
    txts: []
  };
}
