console.log("Scripts loaded");

function buildVideo(id) {
  var url = "http://www.youtube.com/embed/" + id;
  var $video = $('<iframe>').attr("src", url);
  $video.attr({"width": 426, "height": 320, "frameborder": "0", "allowfullscreen": true});
  // $('#' + id).append($video);
  $('#video-here').append($video);
};

function changeTwitchSource(source) {
  var $twitch = $('#twitch-stream');
  var url = "http://player.twitch.tv/?channel=" + source;
  $twitch.attr("src", url);
};

// Parse HTML into plain text, use only "Overview" text
function insertDescription(gameText) {
  var n = gameText.search("<p>");
  gameText = gameText.substring(n,gameText.length);
  n = gameText.search("<h2>");
  gameText = gameText.substring(0,n);
  var $temp = $('<div>').html(gameText);
  var straightText = $temp.text();
  $('#giantbomb-description').text(straightText);
};

$(function() {
  // Initialize Semantic-UI Dropdown module
  $('.ui.dropdown').dropdown();
});
