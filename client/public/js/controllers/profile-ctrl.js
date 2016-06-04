angular.module('profileController', ['ngCookies'])
  .controller('ProfileController', ['$scope', '$http', '$cookies', '$window', function($scope, $http, $cookies, $window) {

    // NG-MODEL variables
    $scope.searchTerm = '';
    $scope.newUser = {
      username:   '',
      email:      '',
      password:   '',
      firstName:  '',
      lastName:   ''
    };
    $scope.loginUser = {
      username:   '',
      password:   ''
    };

    // NG-SHOW variables
    $scope.showSignupLink = true;
    $scope.showLoginLink = true;
    $scope.showProfileLink = false;
    $scope.showLoginForm = false;
    $scope.showSignupForm = false;


    $scope.clearUserModels = function() {
      $scope.newUser = {
        username:   '',
        email:      '',
        password:   '',
        firstName:  '',
        lastName:   ''
      };
      $scope.loginUser = {
        username:   '',
        password:   ''
      };
    };

    $scope.submitSignupForm = function() {
      $http.post('/api/users', $scope.newUser).then(function(response) {
        $cookies.put('user_token', response.data.token);
        $scope.clearUserModels();
        $scope.showSignupForm = false;
      });
    };

    $scope.submitLoginForm = function() {
      $http.post('/api/auth', $scope.loginUser).then(function(response) {
        $cookies.put('user_token', response.data.token);
        $scope.clearUserModels();
        $scope.showLoginForm = false;
      });
    };

    $scope.checkCookie = function() {
      if ($cookies.get("user_token")) {
        $scope.showSignupLink = false;
        $scope.showLoginLink = false;
        $scope.showProfileLink = true;
      }
    };

    $scope.redirectToContent = function() {
      $window.location.href = "#/search/" + $scope.searchTerm;
    };

    $scope.checkCookie();
  }]);
