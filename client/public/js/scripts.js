console.log("Scripts loaded");

function buildVideo(id) {
  var url = "http://www.youtube.com/embed/" + id;
  var $video = $('<iframe>').attr("src", url);
  $video.attr({"width": 640, "height": 480, "frameborder": "0", "allowfullscreen": true});
  // $('#' + id).append($video);
  $('#video-here').append($video);
};

function changeTwitchSource(source) {
  var $twitch = $('#twitch-stream');
  var url = "http://player.twitch.tv/?channel=" + source;
  $twitch.attr("src", url);
};

function insertDescription(gameText) {
  var n = gameText.search("<p>");
  gameText = gameText.substring(n,gameText.length);
  n = gameText.search("<h2>");
  gameText = gameText.substring(0,n);
  console.log(gameText);
  var $temp = $('<div>').html(gameText);
  var straightText = $temp.text();
  console.log(straightText);
  // var n = straightText.search("Gameplay");
  // console.log(n);
  // straightText = straightText.substring(8,n);
  $('#giantbomb-description').text(straightText);
};

$(function() {
  $('.ui.dropdown').dropdown();
});
