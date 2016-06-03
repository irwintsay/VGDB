// angular.module('VGDBApp', [
//   'loginController',
//   'contentController'
// ]);

angular.module('VGDBApp', [
  'ngRoute',
  'contentController',
  'profileController'
])
.config(['$routeProvider', function( $routeProvider ){

  $routeProvider
    .when('/', {
      templateUrl:  '/views/templates/welcome.ejs',
      controller:   'ContentController'
    })
    .when('/search/:query', {
      templateUrl:  '/views/templates/content.ejs',
      controller:   'ContentController'
    })
    .otherwise({
      redirectTo: '/'
    })
}]);
