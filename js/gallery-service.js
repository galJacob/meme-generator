'use strict';

var gImgs = [];

//creates the gImgs arr, the core "data base" gallery 
function createImgs() {
    gImgs.push(createImg(1, 'meme-imgs/1.jpg', ['happy', 'fucks given']));
    gImgs.push(createImg(2, 'meme-imgs/2.jpg', ['angry', 'racist', 'trump']));
    gImgs.push(createImg(3, 'meme-imgs/3.jpg', ['cute', 'dogs']));
    gImgs.push(createImg(4, 'meme-imgs/4.jpg', ['cute', 'baby', 'dog']));
    gImgs.push(createImg(5, 'meme-imgs/5.jpg', ['succuss', 'kid', 'did it!']));
    gImgs.push(createImg(6, 'meme-imgs/6.jpg', ['cat', 'sleeping']));
    gImgs.push(createImg(7, 'meme-imgs/7.jpg', ['charlie', 'tell me more', 'sarcasm']));
    gImgs.push(createImg(8, 'meme-imgs/8.jpg', ['baby', 'mean']));
    gImgs.push(createImg(9, 'meme-imgs/9.jpg', ['haim-hecht', 'what would you do?', 'israeli']));
    gImgs.push(createImg(10, 'meme-imgs/10.jpg', ['what', 'why']));
    gImgs.push(createImg(11, 'meme-imgs/11.jpg', ['aliens', 'science']));
    gImgs.push(createImg(12, 'meme-imgs/12.jpg', ['sarcasm', 'austin powers']));
    gImgs.push(createImg(13, 'meme-imgs/13.jpg', ['happy', 'afircan', 'success']));
    gImgs.push(createImg(14, 'meme-imgs/14.jpg', ['trump', 'white', 'angry', 'racist']));
    gImgs.push(createImg(15, 'meme-imgs/15.jpg', ['wow', 'look', 'african']));
    gImgs.push(createImg(16, 'meme-imgs/16.jpg', ['dog', 'sloppy', 'cute']));
    gImgs.push(createImg(17, 'meme-imgs/17.jpg', ['barack obama', 'african']));
    gImgs.push(createImg(18, 'meme-imgs/18.jpg', ['african', 'love']));
    gImgs.push(createImg(19, 'meme-imgs/19.jpg', ['success', 'cheers', 'leonardo dicaprio']));
    gImgs.push(createImg(20, 'meme-imgs/20.jpg', ['what if', 'science', 'morfious']));
    gImgs.push(createImg(21, 'meme-imgs/21.jpg', ['one does not simply', 'lord of the rings']));
    gImgs.push(createImg(22, 'meme-imgs/22.jpg', ['african', 'success']));
    gImgs.push(createImg(23, 'meme-imgs/23.jpg', ['happy', 'funny', 'star-trek']));
    gImgs.push(createImg(24, 'meme-imgs/24.jpg', ['racist', 'russian', 'putin']));
    gImgs.push(createImg(25, 'meme-imgs/25.jpg', ['fucks i give', 'toy-story']));
}

//creates a single img 
function createImg(id, url, keywords) {
    var img = {
        id: id,
        url: url,
        keywords: keywords
    };
    return img;
}

//function that sorts imgs by their input and returns the sorted imgs arr
function sortImgsByInput(input) {
    if (input === '') {
        return gImgs;
    }
    var imgsByInput = gImgs.filter(function (img) {
        var keywords = img.keywords;
        var matchedWord = keywords.find(function (word) {
            var slicedWord;
            for (var i = 0; i < input.length; i++) {
                slicedWord = word.substring(0, i + 1);
            }
            return slicedWord === input;
        })
        return matchedWord;
    })
    return imgsByInput;
}




// var trumpMeme = createImg(1, 'meme-imgs/3.jpg', ['angry', 'racist']);
// console.log(trumpMeme);





