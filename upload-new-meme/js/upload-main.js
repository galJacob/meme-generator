var canvas;
var ctx;

canvas = document.getElementById('myCanvas');
ctx = canvas.getContext('2d');
function init() {
}

function onFileInputChange(ev) {
    handleImageFromInput(ev)
}

function downloadImg(elLink) {
    var imgContent = canvas.toDataURL('image/jpeg');
    elLink.href = imgContent
}