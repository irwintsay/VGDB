// angular.module('VGDBApp', [
//   'loginController',
//   'contentController'
// ]);

angular.module('VGDBApp', ['ngRoute'])
  .config(['$routeProvider', function( $routeProvider ){

    $routeProvider
      .when('/', {
        templateUrl:  '/views/templates/welcome.ejs',
        controller:   'LoginController'
      })
      .when('/search', {
        templateUrl:  '/views/templates/content.ejs',
        controller:   'ContentController'
      })
      .otherwise({
        redirectTo: '/'
      })
  }]);
