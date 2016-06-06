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

$(function() {
  $('.ui.dropdown').dropdown();
});
