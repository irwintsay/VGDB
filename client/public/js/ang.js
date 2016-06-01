var vgdbApp = angular.module("VGDB", []);
vgdbApp.controller("VGDBController", ["$scope", "$http", function($scope, $http) {

  $scope.searchTerm = '';
  $scope.twitchStream ='';
  $scope.allYouTubeVideos = [];
  $scope.giantBombData = null;
  $scope.gameImage = '';

  $scope.getGiantBombData = function() {
    var query = "https://www.giantbomb.com/api/search?api_key=1881a2a0f53e3677a2fd6d34be616c2e1e86e957&format=json&resources=game&limit=1&query=" + $scope.searchTerm;
    $http.jsonp(query).then(function(response) {
      $scope.giantBombData = response.data;
      console.log($scope.giantBombData.results[0].name);
      $scope.gameImage = $scope.giantBombData.results[0].image.super_url;
    });
  };
  $scope.resetTwitchStream = function() {
    changeTwitchSource($scope.twitchStream);
  };

  $scope.getTwitchStream = function() {
    $http.get('https://api.twitch.tv/kraken/streams?limit=1&game=' + $scope.searchTerm).then(function(response) {
      // console.log(response.data);
      $scope.twitchStream = response.data.streams[0].channel.display_name;
      console.log($scope.twitchStream);
      $scope.resetTwitchStream($scope.twitchStream);
    });
    $scope.getAllYouTubeVideos();
    $scope.getGiantBombData();
  };

  $scope.getAllYouTubeVideos = function() {
    var query = "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&order=viewCount&key=AIzaSyDnQMUe3C-RMhVregUqtfAluhY6kQQpE7g&q=" + $scope.searchTerm + "+gameplay";
    $http.get(query).then(function(response) {
    // $http.get('https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=destiny+gameplay&order=viewCount&key=AIzaSyDnQMUe3C-RMhVregUqtfAluhY6kQQpE7g').then(function(response) {

      $scope.allYouTubeVideos = response.data.items;

      // buildVideo(id);
      $scope.renderAllYouTubeVideos();
    });
  };
  $scope.renderAllYouTubeVideos = function() {
    $('#video-here').empty();
    for (var i = 0; i < $scope.allYouTubeVideos.length; i++) {
      buildVideo($scope.allYouTubeVideos[i].id.videoId);
    }
  };

  $scope.getAllYouTubeVideos();
}]);
