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
  var htmlTextArray = gameText.split("</p>");
  // Remove last, blank element
  htmlTextArray.pop();
  var $temp = $('<div>');
  htmlTextArray.forEach(function(e, index) {
    // Concatenate </p> back onto each paragraph element
    htmlTextArray[index] += "</p>";
    // Use temporary Div to convert each paragraph element into HTML
    // and then back into text
    $temp.html(htmlTextArray[index]);
    htmlTextArray[index] = $temp.text();
    // Surround each string of text with <p> tags again
    htmlTextArray[index] = "<p>" + htmlTextArray[index] + "</p>";
  });

  var formattedDescript = htmlTextArray.join('');
  $('#giantbomb-description').html(formattedDescript);
};

$(function() {
  // Initialize Semantic-UI Dropdown module
  $('.ui.dropdown').dropdown();
});
