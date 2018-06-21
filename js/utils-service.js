'use strict';
console.log('Utills Service');

var MAP_KEY = 'popular imgs';

function sliceFromStrByIdx(idx, word) {
    for (var i = 0; i < idx; i++) {
        var slicedWord = word.substring(0, i + 1);
    }
    return slicedWord;
}

function savePopularMapToStorage(){

}
