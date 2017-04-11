var app = angular.module('baseApp');

app.controller('homeCtrl', ['$scope', 'authService', function($scope, authService) {
  authService.checkUser();
}]);
