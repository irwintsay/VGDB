angular.module('profileController', ['ngCookies'])
  .controller('ProfileController',
  ['$scope', '$http', '$cookies', '$timeout',
  function($scope, $http, $cookies, $timeout) {

    $scope.currentUser = {};

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
    $scope.showWelcomeGreeting = false;
    $scope.showProfileDetails = true;

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

    $scope.getCurrentUser = function() {
      if($cookies.get("user_token")) {
        $http.get('/api/users/current').then(function(response) {
          $scope.currentUser = response.data;

          // Display Welcome Greeting for 5s
          if ($scope.currentUser.firstName) {
            $scope.showWelcomeGreeting = true;
            $timeout(function() {
              $scope.showWelcomeGreeting = false;
            }, 5000);
          }
        });
      }
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
        $scope.getCurrentUser();
      }
    };

    $scope.hideWelcomeGreeting = function() {
      $scope.showWelcomeGreeting = false;
    };

    $scope.checkCookie();
  }]);
