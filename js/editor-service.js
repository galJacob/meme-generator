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

function assignTxt(txtToAssign) {
  gMeme.txts = filterTxtsByTextareaIdx(gMeme.txts, txtToAssign.textareaIdx);
  gMeme.txts.push(txtToAssign);
  setCanvas(gMeme.selectedImgId);
  // setTimeout(function() {
  //   // renderTxtOnCanvas(gMeme.txts[gMeme.txts.length - 1], gMeme.selectedImgId);
  //   renderTxtsOnCanvas(gMeme.txts);
  // }, 1);
  //   renderTxtsOnCanvas(gMeme.txts);
}

function chooseMeme(id) {
  gMeme = {
    selectedImgId: id,
    txts: []
  };
}
function filterTxtsByTextareaIdx(txts, textareaIdx) {
  return txts.filter(function(txt) {
    return txt.textareaIdx !== textareaIdx;
  });
}

function getMemeTxts(){
  return gMeme.txts;
}
