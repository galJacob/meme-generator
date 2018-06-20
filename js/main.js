'use strict';

console.log(2);
console.log('Didi the King!')


function renderGallery() {

    var renderedGallery = gImgs.map(function (img) {
        var strHtml = `<li onclick = "openModal(${img.id})" class="img-pick fit-background img-${img.id}" style="background-image: url(../meme-imgs/${img.id}.jpg)" </li>`;
        return strHtml;
    })
    var renderedGallery = renderedGallery.join('');
    var elImgsContainer = document.querySelector('.imgs-container ul');
    console.log(renderedGallery);

    elImgsContainer.innerHTML = renderedGallery;
    // console.log(elImgsContainer);
}

renderGallery();