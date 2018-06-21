'use strict';
console.log('Utills Service');

function sliceFromStrByIdx(idx, word) {
    for (var i = 0; i < idx; i++) {
        var slicedWord = word.substring(0, i + 1);
    }
    return slicedWord;
}

function savePopularMapToStorage(popularImgsMap) {
    localStorage.setItem(MAP_KEY, JSON.stringify(popularImgsMap));
}
function loadPopularMapFromStorage() {
    var popularImgsMap;
  popularImgsMap = JSON.parse(localStorage.getItem(MAP_KEY));
  return popularImgsMap;
}

