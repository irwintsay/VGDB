angular.module('contentController', [])
  .controller('ContentController', ['$scope', '$http', '$cookies', '$routeParams', '$window', function($scope, $http, $cookies, $routeParams, $window) {

    $scope.searchTerm = $routeParams.query || '';
    $scope.currentUser = {};
    $scope.allSearches = [];
    $scope.matchedSearch = {};
    $scope.summary = '';
    $scope.twitchStream ='';
    $scope.allYouTubeVideos = [];
    $scope.giantBombData = null;
    $scope.gameImage = '';
    $scope.showImage = false;

    $scope.search = function() {
      $scope.getTwitchStream();
      $scope.getAllYouTubeVideos();
      $scope.getGiantBombData();

      var payload = {};
      if ($scope.queryExists()) {
        if ($scope.currentUser._id && !$scope.searchedBefore()) {
          payload = {
            user_id: $scope.currentUser._id,
            summary: $scope.summary
          };
          console.log("Payload created");
          console.log(payload);
        }
        $http.put('/api/searches/' + $scope.searchTerm, payload).then(function(response) {
          console.log(response.data);
        });
      } else {
        console.log("ID");
        console.log($scope.currentUser._id);
        if ($scope.currentUser._id) {
          payload = {
            queryString: $scope.searchTerm,
            users: [{
              user_id: $scope.currentUser._id,
              summary: ""
            }]
          }
        } else {
          payload = {
            queryString: $scope.searchTerm,
            users: []
          }
        }

        $http.post('/api/searches', payload).then(function(response) {
          console.log(response.data);
        });
      }
    };

    $scope.getCurrentUser = function() {
      $http.get('/api/users/current').then(function(response) {
        $scope.currentUser = response.data;
        console.log($scope.currentUser);
        $scope.getAllSearches();
      });
    };

    $scope.getAllSearches = function() {
      $http.get('/api/searches').then(function(response) {
        $scope.allSearches = response.data;
        console.log($scope.allSearches);
        $scope.search();
      });
    };

    $scope.queryExists = function() {
      var exists = false;
      $scope.allSearches.forEach(function(s) {
        if (s.queryString == $scope.searchTerm) {
          exists = true;
          $scope.matchedSearch = s;
        }
      });
      console.log("query exists? " + exists);
      return exists;
    };

    $scope.searchedBefore = function() {
      var searched = false;
      $scope.matchedSearch.users.forEach(function(u) {
        if (u.user_id = $scope.currentUser._id) {
          searched = true;
        }
      });
      return searched;
    };

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
        $scope.twitchStream = response.data.streams[0].channel.display_name;
        // console.log($scope.twitchStream);
        $scope.resetTwitchStream($scope.twitchStream);
      });
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

    $scope.redirectToContent = function() {
      $window.location.href = "#/search/" + $scope.searchTerm;
      // $scope.search();
    };

    $scope.getCurrentUser();
    // $scope.getAllSearches();
    // $scope.search();
    // $scope.getAllYouTubeVideos();
  }]);
