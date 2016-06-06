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
            user: $scope.currentUser._id,
            summary: $scope.summary
          };
          console.log("Payload created");
          console.log(payload);
        }
        $http.put('/api/searches/' + $scope.searchTerm, payload).then(function(response) {
          console.log("PUT SUCCESSFUL");
        });
      } else {
        console.log("ID");
        console.log($scope.currentUser._id);
        if ($scope.currentUser._id) {
          payload = {
            queryString: $scope.searchTerm,
            users: [{
              user: $scope.currentUser._id,
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
      if ($cookies.get("user_token")) {
        $http.get('/api/users/current').then(function(response) {
          $scope.currentUser = response.data;
          console.log($scope.currentUser);
          $scope.getAllSearches();
        });
      }
    };

    $scope.getAllSearches = function() {
      $http.get('/api/searches').then(function(response) {
        console.log("THIS IS ALL THE SEARCHES RESPONSE");
        console.log(response.data);
        $scope.allSearches = response.data;
        console.log("THIS IS ALL THE SEARCHES");
        console.log($scope.allSearches);
        $scope.search();
      });
    };

    $scope.queryExists = function() {
      var exists = false;
      $scope.allSearches.forEach(function(s) {
        console.log($scope.matchedSearch);
        if (s.queryString == $scope.searchTerm) {
          exists = true;
          $scope.matchedSearch = s;
        }
      });
      console.log($scope.matchedSearch);
      console.log("query exists? " + exists);
      return exists;
    };

    $scope.searchedBefore = function() {
      var searched = false;
      console.log($scope.matchedSearch.users);
      $scope.matchedSearch.users.forEach(function(u) {
        if (u.user = $scope.currentUser._id) {
          searched = true;
        }
      });
      console.log("Searched before? " + searched);
      return searched;
    };

    // Query Giantbomb API
    // Gets Name of game, Image URL
    $scope.getGiantBombData = function() {
      var query = "https://www.giantbomb.com/api/search?json_callback=JSON_CALLBACK&api_key=1881a2a0f53e3677a2fd6d34be616c2e1e86e957&format=jsonp&resources=game&limit=1&query=" + $scope.searchTerm;
      $http.jsonp(query).then(function(response) {
        var gameID = response.data.results[0].id;
        var queryB = "https://www.giantbomb.com/api/game/" + gameID + "/?json_callback=JSON_CALLBACK&api_key=1881a2a0f53e3677a2fd6d34be616c2e1e86e957&format=jsonp";
        $http.jsonp(queryB).then(function(response) {
          console.log("SECOND GIANTBOMB QUERY");
          $scope.giantBombData = response.data.results;
          console.log($scope.giantBombData);
          $scope.gameImage = "http://static.giantbomb.com" + $scope.giantBombData.image.super_url;
          $scope.showImage = true;
        });
      });
    };

    $scope.resetTwitchStream = function() {
      changeTwitchSource($scope.twitchStream);
    };

    $scope.getTwitchStream = function() {
      $http.get('https://api.twitch.tv/kraken/streams?limit=1&game=' + $scope.searchTerm).then(function(response) {
        // console.log("TWITCH REPLY");
        // console.log(response.data);
        $scope.twitchStream = response.data.streams[0].channel.display_name;
        console.log(response.data.streams[0].preview.medium);
        // console.log($scope.twitchStream);
        $scope.resetTwitchStream($scope.twitchStream);
        $('.ui.embed').embed();

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
