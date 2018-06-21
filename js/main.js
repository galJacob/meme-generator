'use strict';

var gImgs = [];
var MAP_KEY = 'popular imgs';
var gPopularImgsMap;
var gPopularWordCounter = 0;

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
            }" style="background-image: url('meme-imgs/${img.id}.jpg')" </li>`;
        return strHtml;
    });
    var strHtml = strHtmls.join('');
    var elImgsContainer = document.querySelector('.imgs-container ul');
    elImgsContainer.innerHTML = strHtml;
}
function openModal(id) {
    var elModal = document.querySelector('#editor-modal');
    //clean Modal Textareas by NodeList
    cleanTextareas();
    setCanvas(id);
    elModal.classList.toggle('hide');
    chooseMeme(id);
    renderTextarea(0);
    var elBody = document.querySelector('body');
    elBody.classList.toggle('no-scroll');
}
function closeModal() {
    var elModal = document.querySelector('#editor-modal');
    elModal.classList.toggle('hide');
    var elBody = document.querySelector('body');
    elBody.classList.toggle('no-scroll');
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
    img.src = `meme-imgs/${id}.jpg`;
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
    ctx.lineWidth = txt.size / 20;

    if (txt.bold) ctx.strokeText(txt.str, x, txt.line);

}
function onInpTextarea(elInput) {
    // console.log('elInput', elInput.dataset.idx);
    var str = elInput.value;
    // TODO: more inputs to send to obj
    var textareaIdx = +elInput.dataset.idx;
    // txtBeenBefore(elInput);
    var lastIdxTxt = getLastIdxTxt(textareaIdx);
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
    var sortedImgs = sortImgsByInput(elInput.value);
    renderImgs(sortedImgs);
}
function displayPopularImgsMap(popularImgsMap) {
    var elPopularContainer = document.querySelector('.popular-imgs-container');
    var strHtml = '<h1>popular searches:</h1> ';
    for (var prop in popularImgsMap) {
        strHtml += `<a style="font-size:${10 * popularImgsMap[prop]}px;"href="">&nbsp;${prop}</a> `;
        gPopularWordCounter += popularImgsMap[prop];
    }
    elPopularContainer.innerHTML = strHtml;
    // console.log(gPopularImgsMap);
    // console.log(elPopularContainer);
}
function onPopularImgsMapInput(elInput) {
    var input = elInput.value;
    gPopularImgsMap = loadPopularMapFromStorage();
    var keyword = getImgKeywordByinput(input);
    addpopularKeyword(keyword);
    displayPopularImgsMap(gPopularImgsMap);
}
function showFontMenu(id) {
    document.querySelector(`.font-pick${id}`).classList.toggle('hide');
}
function onUpdateTxtBy(param, id, type) {
    var elTextarea = document.querySelector(`#textarea${id}`);
    if (!elTextarea.value) return;
    updateTxtAt(param, id, type);
}
// gal
function toggleMenu() {
    var elNav = document.querySelector('nav');
    var elMenuArrow = document.querySelector('.location-menu-arrow');
    elNav.classList.toggle('closed-nav');
    elMenuArrow.classList.toggle('closed-location-menu-arrow');
}
// gal

// Didi

// !Didi
// Change


function handleKey(ev) {
    console.log('ev', ev)
    var offsetY = ev.offsetY;
    // updateLineAtCurrTxt();
}
function renderTextarea(idx, line) {
    var length = getTxtsLength();
    if (idx === -1 || idx > length) return;
    var txt = getLastIdxTxt(idx);
    var value = txt.str;
    var color = txt.color;
    console.log('value: ', value, 'idx: ', idx);

    var strHtml = `<div class="add-line-container flex column" id="add-line${idx}">
        <textarea data-idx="${idx}" id="textarea${idx}" oninput="onInpTextarea(this)" placeholder="Enter Text" value="${value}">${value}</textarea>
        <div class="ctrl-btns-container flex">
        <button class="ctrl-btn btn ctrl-color">
        <input type="color" value="${color}" id="textarea-color${idx}" oninput="onUpdateTxtBy('color', ${idx}, this.value)">
        </button>
        <button class="ctrl-btn btn ctrl-font-inc" onclick="onUpdateTxtBy('fontInc', ${idx})">+</button>
        <button class="ctrl-btn btn ctrl-font-dec" onclick="onUpdateTxtBy('fontDec', ${idx})">-</button>
        <button class="ctrl-btn btn ctrl-font" onclick="showFontMenu(${idx})">A</button>
        <button class="ctrl-btn btn ctrl-down" onclick="onUpdateTxtBy('up', ${idx})">▲</button>
        <button class="ctrl-btn btn ctrl-up" onclick="onUpdateTxtBy('down', ${idx})">▼</button>
        
        <button class="ctrl-btn btn ctrl-bold" onclick="onUpdateTxtBy('bold', ${idx})">B</button>
        <button class="ctrl-btn btn ctrl-left" onclick="onUpdateTxtBy('left', ${idx})">L</button>
        <button class="ctrl-btn btn ctrl-center" onclick="onUpdateTxtBy('center', ${idx})">C</button>
        <button class="ctrl-btn btn ctrl-right" onclick="onUpdateTxtBy('right', ${idx})">R</button>
        </div>
        <div class="font-pick font-pick${idx} hide">
        <label>Choose Font:</label>
        <ul class="clean-list">
        <li onclick="onUpdateTxtBy('font', ${idx} ,'Impact')">Impact</li>
        <li onclick="onUpdateTxtBy('font', ${idx} ,'Arial')">Arial</li>
        <li onclick="onUpdateTxtBy('font', ${idx} ,'Times New Roman')">Times New Roman</li>
        </ul>
        </div>
        </div> 
        `;

    var elTextareaContainer = document.querySelector('.add-line-container');
    elTextareaContainer.innerHTML = strHtml;

    //assign status
    strHtml =
        `<button class="btn browse-btn ctrl-btn" onclick="renderTextarea(${idx + 1})">🡹</button>
    <button class="show-curr-line btn ctrl-btn">${idx+1}</button>
    <button class="btn browse-btn ctrl-btn" onclick="renderTextarea(${idx - 1})">🡻</button>`;

    var elBrowseTxtsContainer = document.querySelector('.browseTxts-container');
    elBrowseTxtsContainer.innerHTML = strHtml;
}
function onChangeTxtIdx(diff) {
    renderTextarea(id + diff);
}

function cleanTextareas() {
    var elInputs = document.querySelectorAll('.add-line-container textarea');
    for (var i = 0; i < elInputs.length; i++) {
        elInputs[i].value = '';
    }
}