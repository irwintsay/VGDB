// angular.module('VGDBApp', [
//   'loginController',
//   'contentController'
// ]);

angular.module('VGDBApp', [
  'ngRoute',
  'loginController',
  'contentController'
])
.config(['$routeProvider', function( $routeProvider ){

  $routeProvider
    .when('/', {
      templateUrl:  '/views/templates/welcome.ejs',
      controller:   'LoginController'
    })
    .when('/search/:query', {
      templateUrl:  '/views/templates/content.ejs',
      controller:   'ContentController'
    })
    .otherwise({
      redirectTo: '/'
    })
}]);
