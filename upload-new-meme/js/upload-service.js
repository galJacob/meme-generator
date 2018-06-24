// on submit call to this function
var gUploadedImgUrl;
function uploadedImg(elForm, ev) {
  ev.preventDefault();

  document.getElementById('imgData').value = canvas.toDataURL('image/jpeg');

  function onSuccess(uploadedImgUrl) {
    // console.log('uploadedImgUrl', uploadedImgUrl);
    gUploadedImgUrl = uploadedImgUrl;
    initCanvas(gUploadedImgUrl);
    resetMemeModel(gUploadedImgUrl);
    var elModal = document.querySelector('#editor-modal');
    elModal.classList.remove('hide');
    console.log(gUploadedImgUrl);
    // uploadedImgUrl = encodeURIComponent(uploadedImgUrl);
  }

  doUploadImg(elForm, onSuccess);
}

function doUploadImg(elForm, onSuccess) {
  var formData = new FormData(elForm);

  fetch('http://ca-upload.com/here/upload.php', {
    method: 'POST',
    body: formData
  })
    .then(function (response) {
      return response.text();
    })
    .then(onSuccess)
}

function handleImageFromInput(ev, onImageReady) {
  // document.querySelector('.share-container').innerHTML = '';
  var reader = new FileReader();

  reader.onload = function (event) {
    var img = new Image();
    img.src = event.target.result;
  };
  reader.readAsDataURL(ev.target.files[0]);
}

// facebook api
(function (d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s);
  js.id = id;
  js.src =
    'https://connect.facebook.net/he_IL/sdk.js#xfbml=1&version=v3.0&appId=807866106076694&autoLogAppEvents=1';
  fjs.parentNode.insertBefore(js, fjs);
})(document, 'script', 'facebook-jssdk');
