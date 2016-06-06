angular.module('profileController', ['ngCookies'])
  .controller('ProfileController',
  ['$scope', '$http', '$cookies', '$timeout', '$location', '$route',
  function($scope, $http, $cookies, $timeout, $location, $route) {

    $scope.currentUser = {};

    $scope.blankUserAvatar = 'https://www.groupmuse.com/assets/empty_user.jpg';
    $scope.currentAvatar = 'https://www.groupmuse.com/assets/empty_user.jpg';

    // NG-MODEL variables
    $scope.searchTerm = '';
    $scope.newUser = {
      username:   '',
      email:      '',
      password:   '',
      firstName:  '',
      lastName:   '',
      avatarUrl:  ''
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

    // $scope.showLoginForm = false;
    // $scope.showSignupForm = false;


    $scope.clearUserModels = function() {
      $scope.newUser = {
        username:   '',
        email:      '',
        password:   '',
        firstName:  '',
        lastName:   '',
        avatarUrl:  ''
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
          if ($scope.currentUser.avatarUrl) {
            $scope.currentAvatar = $scope.currentUser.avatarUrl;
          }
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

    $scope.showLoginForm = function() {
      $('#login.ui.modal').modal('show');
    };

    $scope.submitLoginForm = function() {
      $http.post('/api/auth', $scope.loginUser).then(function(response) {
        $('#login.ui.modal').modal('hide');
        $cookies.put('user_token', response.data.token);
        $scope.clearUserModels();
        $scope.checkCookie();
      });
    };

    $scope.showSignupForm = function() {
      $('#signup.ui.modal').modal('show');
    };

    $scope.submitSignupForm = function() {
      $http.post('/api/users', $scope.newUser).then(function(response) {
        $('#signup.ui.modal').modal('hide');
        $cookies.put('user_token', response.data.token);
        $scope.clearUserModels();
        $scope.checkCookie();
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
    $scope.signOut = function() {
      $cookies.remove("user_token");
      $scope.currentUser = {};
      $scope.currentAvatar = $scope.blankUserAvatar;
      $route.reload();
    };

    $scope.checkCookie();
  }]);
