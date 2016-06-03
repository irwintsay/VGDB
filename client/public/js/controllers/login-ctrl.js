angular.module('loginController', ['ngCookies'])
  .controller('LoginController', ['$scope', '$http', '$cookies', '$window', function($scope, $http, $cookies, $window) {

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
    $scope.showLoginForm = true;
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

    $scope.redirectToContent = function() {
      $window.location.href = "#/search/" + $scope.searchTerm;
    };

  }]);
