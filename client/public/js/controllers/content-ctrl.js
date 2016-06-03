angular.module('contentController', [])
  .controller('ContentController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {

    // $scope.searchTerm = '';
    $scope.searchTerm = $routeParams.query;
    $scope.twitchStream ='';
    $scope.allYouTubeVideos = [];
    $scope.giantBombData = null;
    $scope.gameImage = '';
    $scope.showImage = false;

    // Query Giantbomb API
    // Gets Name of game, Image URL
    $scope.getGiantBombData = function() {
      var query = "https://www.giantbomb.com/api/search?json_callback=JSON_CALLBACK&api_key=1881a2a0f53e3677a2fd6d34be616c2e1e86e957&format=jsonp&resources=game&limit=1&query=" + $scope.searchTerm;
      $http.jsonp(query).then(function(response) {
        $scope.giantBombData = response.data;

        $scope.gameName = $scope.giantBombData.results[0].name;
        console.log($scope.giantBombData.results[0].name);
        $scope.gameImage = "http://static.giantbomb.com" + $scope.giantBombData.results[0].image.super_url;
        console.log($scope.gameImage);
        $scope.showImage = true;
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
