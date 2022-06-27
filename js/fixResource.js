var resourceId = Number(window.location.href.split('/id/')[1]);
var request = new XMLHttpRequest();
request.open('GET', 'https://content-vimbox.skyeng.ru/resource/audio/list');
request.responseType = 'document';
request.onload = function () {
  var page = request.response;
  var quantity = Number(page.querySelectorAll('.jp-player')[0].getAttribute('id'));
  var perPage = page.querySelectorAll('.jp-player').length;
  var num = Math.ceil((quantity - resourceId) / perPage);
  var newLink = 'https://content-vimbox.skyeng.ru/resource/audio/list/pn/' + String(num);
  var requestPage = new XMLHttpRequest();
  requestPage.open('GET', newLink);
  requestPage.responseType = 'document';
  requestPage.onload = function () {
    var resPage = requestPage.response;
    resPage.querySelectorAll('.jp-player').forEach(element => {
    if (Number(element.getAttribute('id')) === resourceId) {
      var resourceLink = element.getAttribute('data-path').split('\"')[3];
        var gdLink = resourceLink.split('\\')[0] + resourceLink.split('\\')[1] + resourceLink.split('\\')[2] + resourceLink.split('\\')[3] + resourceLink.split('\\')[4];
        var newAudio = document.createElement('audio');
        newAudio.setAttribute('src', gdLink);
        newAudio.setAttribute('controls', 'true');
        document.querySelector('.panel-body').insertBefore(newAudio, document.querySelector('.help-block'));
      }
    });
  }
  requestPage.send();
};
request.send();