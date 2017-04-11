var app = angular.module('baseApp');

app.controller('studentsCtrl', ['$scope', 'firebaseService', 'authService', function($scope, firebaseService, authService) {
  authService.checkUser();
  
  $scope.students = [];

  firebaseService.getStudents(function(students) {
    $scope.students = students;
    $scope.$apply();
    console.log($scope.students);
  }, function(error) {
    console.log(error);
  });

  $scope.prettifyDays = function(days) { //MTWHF
    var template = {M:0, T:0, W:0, R:0, F:0};
    var res = "";

    for(var day in days) {
      if(days[day]) template[day] = 1;
    }

    for(var day in template) {
      if(template[day]) res += day;
    }

    return res;
  };


  $scope.makeTagArray = function(tags) {
    return tags.split(",").map(tag => tag.trim());
  };

}]);
