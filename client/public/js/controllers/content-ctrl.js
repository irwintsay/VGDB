angular.module('contentController', [])
  .controller('ContentController',
  ['$scope', '$http', '$cookies', '$routeParams', '$window', '$location', function($scope, $http, $cookies, $routeParams, $window, $location) {

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
    $scope.currentImage = '';
    $scope.popularSearches = [];

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
      } else {
        $scope.getAllSearches();
      }

    };

    $scope.getAllSearches = function() {
      $http.get('/api/searches').then(function(searchResponse) {
        console.log("THIS IS GET ALL SEARCHES RESPONSE");
        console.log(searchResponse.data);
        $scope.allSearches = searchResponse.data;
        $scope.determinePopularSearches();
        $scope.search();
      });
    };

    $scope.determinePopularSearches = function() {
      $scope.allSearches.sort(function(a,b) {return (a.count > b.count) ? 1 : ((b.count > a.count) ? -1 : 0);} );
      for (var i = 0; i < 8; i++) {
        $scope.popularSearches[i] = $scope.allSearches[($scope.allSearches.length - 1 - i)];
      }
    };

    $scope.queryExists = function() {
      var exists = false;
      $scope.allSearches.forEach(function(s) {
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
          // Image URLs from GiantBomb are flakey, keep an eye on this
          // Have to replace the https://www.giantbomb.com with http://static.giantbomb.com
          // First remove https://www.giantbomb.com and then concatenate http://static.giantbomb.com
          $scope.gameImage = "http://static.giantbomb.com" + $scope.giantBombData.image.super_url.split("com").pop();
          $scope.showImage = true;
          insertDescription($scope.giantBombData.description);
          $scope.giantBombData.original_release_date = $scope.trimReleaseDate();
        });
      });
    };

    $scope.trimReleaseDate = function() {
      var n = $scope.giantBombData.original_release_date.search("00:00:00");
      var trimmedDate = $scope.giantBombData.original_release_date.substring(0, n);
      return trimmedDate;
    };

    $scope.resetTwitchStream = function() {
      changeTwitchSource($scope.twitchStream);
    };

    $scope.getTwitchStream = function() {
      let req = {
        method: 'GET',
        url: 'https://api.twitch.tv/kraken/streams?limit=1&game=' + $scope.searchTerm,
        headers: {
          'Accept': 'application/vnd.twitchtv.v3+json',
          'Client-ID': '6x56jz36ccm0yye0guusrbwtxbm178p'
        }
      }
      $http(req).then(function(response) {
        // console.log("TWITCH REPLY");
        // console.log(response.data);
        $scope.twitchStream = response.data.streams[0].channel.display_name;
        console.log(response.data.streams[0].preview.medium);
        console.log("TWITCH STREAM");
        console.log($scope.twitchStream);
        $scope.resetTwitchStream($scope.twitchStream);
        $('.ui.embed').embed();

      });
    };

    $scope.getAllYouTubeVideos = function() {
      var query = "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&order=viewCount&maxResults=4&key=AIzaSyDnQMUe3C-RMhVregUqtfAluhY6kQQpE7g&q=" + $scope.searchTerm + "+gameplay";
      $http.get(query).then(function(response) {
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

    $scope.setImageAndShowModal = function(imageUrl) {
      $scope.currentImage = "http://static.giantbomb.com" + imageUrl;
      $('#image-viewer.ui.modal').modal('show');
    };

    $scope.checkLocation = function() {
      var truth = $location.url().search('search');
      if (truth != -1) {
        $('#username').css("color","black");
      } else {
        $('#username').css("color","white");
      }
    };

    $scope.redirectToContent = function() {
      $window.location.href = "#/search/" + $scope.searchTerm;
    };

    $scope.getCurrentUser();
    $scope.checkLocation();
  }]);
