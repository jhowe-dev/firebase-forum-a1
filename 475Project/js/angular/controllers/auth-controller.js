var app = angular.module('baseApp');

app.controller('authCtrl', ['$scope', '$route', 'authService', function($scope, $route, authService) {
    firebase.auth().onAuthStateChanged(function(user) {
        $scope.user = user;
        $scope.$apply();
    });

    $scope.login = function(email, password) {
        authService.login(email, password,
            function(msg) {
                toastr.success(msg);
                document.querySelector("#login-form").reset();
                $scope.user = firebase.auth().currentUser;
                $route.reload();
            }, function(err) {
                toastr.error(err);
            }
        );
    };

    $scope.logout = function() {
        authService.logout(
            function(msg) {
                toastr.success(msg);
                $scope.user = null;
                $route.reload();
            }, function(err) {
                toastr.error(err);
            }
        );
    };
}]);
