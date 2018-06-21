'use strict';


var gMeme = {
  selectedImgId: 5,
  txts: [
    {
      str: 'I never eat Falafel',
      line: 100,
      size: 20,
      align: 'left',
      color: 'red',
      font: 'Impact',
      bold: true,
      textareaIdx: 1
    }
  ]
};
function assignTxt(txtToAssign) {
  // gMeme.txts = filterTxtsByTextareaIdx(gMeme.txts, txtToAssign.textareaIdx);
  // gMeme.txts.unshift(txtToAssign);
  gMeme.txts[txtToAssign.textareaIdx] = txtToAssign;
  setCanvas(gMeme.selectedImgId);
}
function chooseMeme(id) {
  gMeme = {
    selectedImgId: id,
    txts: []
  };
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
function updateTxtAt(param, id, type) {
  var currTxt = gMeme.txts.find(function (txt) {
    return txt.textareaIdx === id;
  });
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
  setCanvas(gMeme.selectedImgId);
}
function getLastIdxTxt(idx) {
  var txt = gMeme.txts[idx];
  if (txt && txt !== undefined) return txt;
  return {
    str: '',
    line: 100,
    size: 56,
    align: 'center',
    color: '#ffffff',
    font: 'Impact',
    bold: true,
    textareaIdx: idx
  };
}
function getCurrId() {
  return gMeme.selectedImgId;
}
function getValueByIdx(idx) {
  var txt = gMeme.txts[idx];
  if (txt && txt !== undefined) return txt.str;
  return '';
}
function getTxtsLength(){
  return gMeme.txts.length;
}
