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


function setSignupHandler(){
  $("#new-user").submit(function(e){
    e.preventDefault();

    var payload = {
      username:   $('#new-user').find('[name=username]').val(),
      email:      $('#new-user').find('[name=email]').val(),
      password:   $('#new-user').find('[name=password]').val(),
      firstName:  $('#new-user').find('[name=firstName]').val(),
      lastName:   $('#new-user').find('[name=lastName]').val()
    };
    console.log(payload);
    $.ajax({
      url:      '/api/users',
      method:   'post',
      data:     payload,
      success: function(data) {
        Cookies.set('user_token', data.token);
        location.reload();
      }
    });
  });
};

function setLoginHandler(){
  $("#login-user").submit(function(e){
    e.preventDefault();
    var payload = {
      username:     $('#login-user').find('[name=username]').val(),
      password:     $('#login-user').find('[name=password]').val()
    };

    $.ajax({
      url:        '/api/auth',
      method:     'post',
      data:       payload,
      success:    function(data) {
        console.log("Successful login");
        Cookies.set("user_token", data.token);
        // location.reload();
        window.location.href = "/main";
      }
    });
  });
};

$(function() {
  // setSignupHandler();
  // setLoginHandler();
});
