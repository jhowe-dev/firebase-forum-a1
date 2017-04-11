var app = angular.module('baseApp');

app.controller('candidatesCtrl', ['$scope', 'firebaseService', 'authService', function($scope, firebaseService, authService) {
    authService.checkUser();

    $scope.assignStudent = function(studentFirebaseID, courseFirebaseID, studentSection) {
        var promise = firebaseService.addFinalAssignment(studentFirebaseID, courseFirebaseID, studentSection,
            function(message) {
                console.log(message);

            },
            function(error) {
                console.log(error);
            });
    };

    $scope.undoAssignment = function(courseFirebaseID, studentFirebaseID, assignmentSection) {
        firebaseService.getAllAssignments(function(object) {
            for (var key in object) {
                if (key == courseFirebaseID) {
                    if (object.hasOwnProperty(key)) {
                        var finals = object[key].final;
                        for (var assignment in finals) {
                            if (finals.hasOwnProperty(assignment)) {
                                var section = finals[assignment].section;
                                var studentFID = finals[assignment].studentId;
                                if (section == assignmentSection && studentFID == studentFirebaseID) {
                                    firebaseService.removeFinal(assignment, courseFirebaseID,
                                        function(result) {
                                            console.log(result);
                                        },
                                        function(error) {
                                            console.log(error);
                                        });
                                };
                            };
                        };
                    };
                };
            };
        }, function(error) {
            console.log(error);
        });
    };

    $scope.isAssigned = function(courseFirebaseID, studentFirebaseID, assignmentSection) {
        var object = $scope.allAssignments;
        for (var key in object) {
            if (key == courseFirebaseID) {
                if (object.hasOwnProperty(key)) {
                    var finals = object[key].final;
                    for (var assignment in finals) {
                        if (finals.hasOwnProperty(assignment)) {
                            var section = finals[assignment].section;
                            var studentFID = finals[assignment].studentId;
                            if (section == assignmentSection && studentFID == studentFirebaseID) {
                                return true;
                            };
                        };
                    };
                };
            };
        };
        return false;
    };

    firebaseService.getAllAssignments(function(object) {
        $scope.allAssignments = object;
        $scope.$apply();
        console.log($scope.allAssignments);
    }, function(error) {
        console.log("Couldn't get list of all assignments");
        console.log(error);
    });

    firebaseService.getCourses(function(courses) {
        $scope.courseAssignments = [];
        courses.forEach(function(course, index) {
            // get the candidates for this course
            firebaseService.getCandidates(course.firebaseId, function(result) {
                // get key candidate info for this course
                var candidates = [];
                $scope.courseAssignments.push([course, candidates]);
                $scope.$apply()
                result.forEach(function(candidate) {
                    firebaseService.getStudentById(candidate.studentId, function(student) {
                        var candidateInfo = {};
                        candidateInfo.name = student.first_name + " " + student.last_name;
                        candidateInfo.section = candidate.section;
                        candidateInfo.studentID = student.id;
                        candidateInfo.firebaseID = candidate.studentId;
                        candidates.push(candidateInfo);
                        // once we have all the info about candidates we need, we push the candidates list
                        if (candidates.length == result.length) {
                            $scope.courseAssignments[index] = [course, candidates];
                            $scope.$apply();
                        };

                    }, function(error) {
                        console.log(error);
                    });
                });
            }, function(error) {
                console.log(error);
            });
        });

    }, function(error) {
        console.log(error);
    });



}]);
