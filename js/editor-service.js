'use strict';


var gMeme = {
  selectedImgId: 5,
  txts: []
};
function assignTxt(txtToAssign) {
  // var activeTxtIdx = txtToAssign.textareaIdx
  gMeme.txts[txtToAssign.textareaIdx] = txtToAssign;
  //added textareaidx:
  setCanvas(gMeme.txts, txtToAssign);
}
function resetMemeModel(id) {
  gMeme = {
    selectedImgId: id,
    txts: []
  };
}
function getActiveTextareaLastTxt(idx) {
  var defaultTxt = {
    str: '',
    line: 100,
    size: 56,
    align: 'center',
    color: '#ffffff',
    font: 'Impact',
    bold: true,
    textareaIdx: 0
  };
  if (!gMeme.txts[idx]) gMeme.txts[idx] = defaultTxt;

  return gMeme.txts[idx];
}
function filterTxtsByTextareaIdx(txts, textareaIdx) {
  return txts.filter(function (txt) {
    return txt.textareaIdx !== textareaIdx;
  });
}
function getMemeTxts() {
  return gMeme.txts;
}
function updateFontSizeTxt(txt, diff) {
  txt.size += diff;
}
function updateTxtAt(param, idx, type) {
  var currTxt = gMeme.txts[idx];
  if (!currTxt) return;

  switch (param) {

    case 'color':
      currTxt.color = type;
      break;

    case 'font':
      currTxt.font = type;
      break;

    case 'fontInc':
      currTxt.size += 5;
      break;

    case 'fontDec':
      currTxt.size -= 5;
      break;

    case 'bold':
      currTxt.bold = !currTxt.bold;
      var elBoldBtn = document.querySelector('.ctrl-bold');
      elBoldBtn.classList.toggle('no-bold');
      break;

    case 'right': case 'center': case 'left':
      currTxt.align = param;
      break;

    case 'up':
      currTxt.line -= 10;
      break;

    case 'down':
      currTxt.line += 10;
      break;

    default:
      break;
  }
  setCanvas(gMeme.txts, currTxt);
}
function getCurrId() {
  return gMeme.selectedImgId;
}
function getTxtsLength() {
  return gMeme.txts.length;
}

// function getActiveIdxLastTxt(idx) {
//   var txt = gMeme.txts[idx];
//   if (txt && txt !== undefined) return txt;
//   return {
//     str: '',
//     line: 100,
//     size: 56,
//     align: 'center',
//     color: '#ffffff',
//     font: 'Impact',
//     bold: true,
//     textareaIdx: idx
//   };
// }