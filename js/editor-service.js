'use strict';


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
  gMeme.txts = filterTxtsByInput(gMeme.txts, txtObj.areaIdx);
  gMeme.txts.push(txtObj);
  //filter txts
  setCanvas(gMeme.selectedImgId);
  setTimeout(function() {
    // renderTxtOnCanvas(gMeme.txts[gMeme.txts.length - 1], gMeme.selectedImgId);
    renderTxtsOnCanvas(gMeme.txts);
  }, 1);
  //   renderTxtsOnCanvas(gMeme.txts);
}

function chooseMeme(id) {
  gMeme = {
    selectedImgId: id,
    txts: []
  };
}
function filterTxtsByInput(txts, areaIdx) {
  return txts.filter(function(txt) {
    return txt.areaIdx !== areaIdx;
  });
}
