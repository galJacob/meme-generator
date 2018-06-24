'use strict';

var gImgs = [];
var MAP_KEY = 'popular imgs';
var gPopularImgsMap;
var gCanvasImg;
var MY_EMAIL = 'joojonogal2@gmail.com';

function init() {
    createImgs();
    renderImgs(gImgs);
    gPopularImgsMap = createPopularImgsMap();
    displayPopularImgsMap(gPopularImgsMap);
}
function renderImgs(imgs) {
    var strHtmls = imgs.map(function (img) {
        var strHtml = `<li onclick = "openModal(${
            img.id
            })" class="img-pick fit-background img-${
            img.id
            }" style="background-image: url('meme-imgs/${img.id}.jpg')">
            <div class = "img-hover">
            ${putKeyWordsOnImg(img.keywords)}
            </div>
             </li>`;
        return strHtml;
    });
    var strHtml = strHtmls.join('');
    var elImgsContainer = document.querySelector('.imgs-container ul');
    elImgsContainer.innerHTML = strHtml;
}
function openModal(id) {
    var elModal = document.querySelector('#editor-modal');
    //clean Modal Textareas by NodeList
    // cleanTextareas();
    // getActiveLastTxt(id);
    resetMemeModel(id)
    renderTextarea(0);
    initCanvas(id);
    elModal.classList.remove('hide');
    var elBody = document.querySelector('body');
    elBody.classList.add('no-scroll');
}
function closeModal() {
    var elModal = document.querySelector('#editor-modal');
    elModal.classList.add('hide');
    var elBody = document.querySelector('body');
    elBody.classList.remove('no-scroll');
}
function initCanvas(id) {
    var elCanvas = document.querySelector('#meme-canvas');
    gCanvasImg = new Image();
    gCanvasImg.onload = function () {
        elCanvas.width = gCanvasImg.width;
        elCanvas.height = gCanvasImg.height;
        var ctx = elCanvas.getContext('2d');
        ctx.drawImage(gCanvasImg, 0, 0);
    }
    gCanvasImg.src = `meme-imgs/${id}.jpg`;

}
function setCanvas(txts = [], activeTxt = false) {
    var elCanvas = document.querySelector('#meme-canvas');
    var ctx = elCanvas.getContext('2d');
    ctx.drawImage(gCanvasImg, 0, 0);
    if (txts.length > 0) renderTxtsOnCanvas(txts);
    if (activeTxt) renderFrag(activeTxt.textareaIdx);
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
    var x = getXforAlign(elCanvas.width, txt.align)
    ctx.fillText(txt.str, x, txt.line);
    ctx.lineWidth = txt.size / 35;

    if (txt.bold) ctx.strokeText(txt.str, x, txt.line);
}
function onInpTextarea(elTextarea) {
    // console.log('elInput', elInput.dataset.idx);
    var str = elTextarea.value;
    // TODO: more inputs to send to obj
    var textareaIdx = +elTextarea.dataset.idx;
    // txtBeenBefore(elInput);
    var lastIdxTxt = getActiveTextareaLastTxt(textareaIdx);
    var line = lastIdxTxt.line;
    var size = lastIdxTxt.size;
    var align = lastIdxTxt.align;
    var color = document.querySelector(`#textarea-color${textareaIdx}`).value;
    var font = lastIdxTxt.font;
    var bold = lastIdxTxt.bold;

    assignTxt({
        str: str,
        line: line,
        size: size,
        align: align,
        color: color,
        font: font,
        textareaIdx: textareaIdx,
        bold: bold
    });
}
//gets the input from the user and showing the pictures that match the typed letters
function renderImgsByInput(elInput) {
    var input = elInput.value.toLowerCase();
    var sortedImgs = sortImgsByInput(input);
    renderImgs(sortedImgs);
}
function displayPopularImgsMap(popularImgsMap) {
    var elPopularContainer = document.querySelector('.popular-searches-container');
    var strHtml = '<h1>popular searches:</h1> ';
    for (var prop in popularImgsMap) {
        strHtml += `<a style="font-size:${0.4 * popularImgsMap[prop]}em;"href="">&nbsp;${prop}</a> `;
    }
    elPopularContainer.innerHTML = strHtml;
    // console.log(gPopularImgsMap);
    // console.log(elPopularContainer);
}
function onPopularImgsMapInput(elInput) {
    var input = elInput.value.toLowerCase();
    gPopularImgsMap = loadPopularMapFromStorage();
    var keyword = getImgKeywordByinput(input);
    addPopKeyword(keyword);
    displayPopularImgsMap(gPopularImgsMap);
}
function showFontMenu(idx) {
    document.querySelector(`.font-pick${idx}`).classList.toggle('hide');
}
function onUpdateTxtBy(param, idx, type) {
    var elTextarea = document.querySelector(`#textarea${idx}`);
    if (!elTextarea.value) return;
    updateTxtAt(param, idx, type);
}
function handleKey(ev) {
    console.log('ev', ev)
    var y = ev.clientY;
    var x = ev.clientX;
    // ctx.strokeRect(10, line - size, ctx.canvas.width - 20, size + 13)
    // ctx.strokeRect(x,y,w,h)
    var idx = getMouseMatchTxtIdx(x, y);
    console.log('idx', idx)
    if (idx !== -1) renderTextarea(idx);

    // updateLineAtCurrTxt();
}
function renderTextarea(idx) {
    var length = getTxtsLength();
    if (idx === -1 || idx > length) return;
    var txt = getActiveTextareaLastTxt(idx); //
    var str = txt.str;
    var color = txt.color;
    var bold = '';
    if (!txt.bold) bold = 'no-bold'

    var strHtml = `<div class="add-line-container flex column" id="add-line${idx}">
    <textarea data-idx="${idx}" id="textarea${idx}" oninput="onInpTextarea(this)" onfocus="onInpTextarea(this)" placeholder="Enter Text" value="${str}">${str}</textarea>
    <div class="ctrl-btns-container flex">
    <button class="ctrl-btn btn ctrl-color">
    <input type="color" value="${color}" id="textarea-color${idx}" oninput="onUpdateTxtBy('color', ${idx}, this.value)">
    </button>
    <button class="ctrl-btn btn ctrl-font-inc" onclick="onUpdateTxtBy('fontInc', ${idx})">+</button>
    <button class="ctrl-btn btn ctrl-font-dec" onclick="onUpdateTxtBy('fontDec', ${idx})">-</button>
    <button class="ctrl-btn btn ctrl-font" onclick="showFontMenu(${idx})">A</button>
    <button class="ctrl-btn btn ctrl-down" onclick="onUpdateTxtBy('up', ${idx})">▲</button>
    <button class="ctrl-btn btn ctrl-up" onclick="onUpdateTxtBy('down', ${idx})">▼</button>
    
    <button class="ctrl-btn btn ctrl-bold ${bold}" onclick="onUpdateTxtBy('bold', ${idx})">B</button>
    <button class="ctrl-btn btn ctrl-left" onclick="onUpdateTxtBy('left', ${idx})">L</button>
    <button class="ctrl-btn btn ctrl-center" onclick="onUpdateTxtBy('center', ${idx})">C</button>
    <button class="ctrl-btn btn ctrl-right" onclick="onUpdateTxtBy('right', ${idx})">R</button>
    </div>
    <ul class="clean-list font-pick-bar font-pick${idx} hide flex">
    <li class="pick-impact" onclick="onUpdateTxtBy('font', ${idx} ,'Impact')">Impact</li>
    <li class="pick-arial" onclick="onUpdateTxtBy('font', ${idx} ,'Arial')">Arial</li>
    <li class="pick-times-nr" onclick="onUpdateTxtBy('font', ${idx} ,'Times New Roman')">Times N.R.</li>
    </ul>
    </div>
    </div> 
    `;

    var elTextareaContainer = document.querySelector('.add-line-container');
    elTextareaContainer.innerHTML = strHtml;

    //assign status
    strHtml =
        `<button class="btn browse-btn" onclick="renderTextarea(${idx - 1});">⯇</button>
    <span class="show-curr-line">${idx + 1}</span>
    <button class="btn browse-btn" onclick="renderTextarea(${idx + 1})">⯈</button>`;

    var elBrowseTxtsContainer = document.querySelector('.browse-txts-container');
    elBrowseTxtsContainer.innerHTML = strHtml;
}
function cleanTextareas() {
    var elTextareas = document.querySelectorAll('.add-line-container textarea');
    for (var i = 0; i < elTextareas.length; i++) {
        elTextareas[i].value = '';
    }
}
function onDownloadImg(elLink, filename = 'meme.png') {
    console.log('Download!');
    setCanvas(getMemeTxts());
    elLink.href = document.querySelector('#meme-canvas').toDataURL();
    elLink.download = filename;
}
function toggleMenu() {
    var elNav = document.querySelector('header');
    elNav.classList.toggle('open-header');
}
function scrollToElement(el) {
    var elToScrollTo = document.getElementById(el.innerText)
    console.log(el.innerText);
    console.log(elToScrollTo);
    elToScrollTo.scrollIntoView({ behavior: 'smooth' });
}
function submitDetails() {
    var contactName = document.querySelector('.name-of-contact').value;
    var mailAddress = document.querySelector('.e-mail').value;
    var subject = document.querySelector('.subject').value;
    var message = document.querySelector('.message').value;
    var linkStr = `https://mail.google.com/mail/?view=cm&fs=1&to=${MY_EMAIL}&su=${subject}&body=${message}`;
    window.location.assign(linkStr);
}
// function displayPopularWords() {
//     var pageWidth = document.body.clientWidth;
//     if()
// }

function renderFrag(idx) {
    var elCanvas = document.querySelector('#meme-canvas');
    var ctx = elCanvas.getContext('2d');
    var txt = getMemeTxts()[idx];
    var line = txt.line;
    var size = txt.size;
    ctx.strokeRect(15, line - size, ctx.canvas.width - 25, size + 13)
}