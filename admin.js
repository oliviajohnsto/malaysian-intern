/** Defines an angular module to handle firebase data */

var app = angular.module('adminApp', ['firebase']);
app.controller('adminCtrl', ['$scope', '$firebaseArray',
    function($scope, $firebaseArray) {
        var fieldsRef = firebase.database().ref('/fields');
        var postingsRef = firebase.database().ref('/postings');

        $scope.fields = $firebaseArray(fieldsRef);
        $scope.postings = $firebaseArray(postingsRef);
        $scope.newPosting = {};
        $scope.updateField = {};
        $scope.postingToDelete;

        $scope.pushPostingFn = function() {
            $scope.postings.$add($scope.newPosting);
            $scope.newPosting = {};
        };

        $scope.updateFieldFn = function() {
            var keys = Object.keys($scope.updateField);
            keys.forEach((key) => {
                var keyPath = '/fields/' + key + '/fields';
                var keyArray = $firebaseArray(firebase.database().ref(keyPath));
                keyArray.$add($scope.updateField[key]);
            });
            $scope.updateField = {};
        };

        $scope.deletePostingFn = function() {
            console.log("deleting " + $scope.postingToDelete);
            $scope.postings.$remove($scope.postings.$getRecord($scope.postingToDelete));
        }
    }
]);

