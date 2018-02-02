/** Defines an angular module to handle firebase data */

var app = angular.module('mainApp', ['firebase']);
app.controller('mainCtrl', ['$scope', '$firebaseArray',
    function($scope, $firebaseArray) {
        var postingsRef = firebase.database().ref('/postings');
        var fieldsRef = firebase.database().ref('/fields');

        $scope.postings = $firebaseArray(postingsRef);
        $scope.fields = $firebaseArray(fieldsRef);

        // returns a boolean representing whether to display the key/value pair for this key.
        // will return true unless this key equals 'name' or 'description.'
        $scope.displayFieldFn = function(key) {
            return (key != 'name') && (key != 'description') && (key != 'url');
        };

        $scope.capitalizeFirstLetterFn = function(key) {
            return key.charAt(0).toUpperCase() + key.slice(1);
        }

        $scope.searchCriteria = {};
        $scope.submittedSearch = {};

        $scope.updateSearchFn = function() {
            $scope.submittedSearch = $scope.searchCriteria;
            $scope.searchCriteria = {};
        }

        $scope.displayPostingFn = function(posting) {
            var search = $scope.submittedSearch;
            var keys = Object.keys(search);
            // return true within the some when it shouldn't be shown.
            return !keys.some((key) => {
                var subkeys = Object.keys(search[key]);
                // only happens when it is an input field.
                if (subkeys[0] == 0) {
                    if (!posting[key].toLowerCase().includes(search[key].toLowerCase()))
                        return true;
                }
                else {
                    return !subkeys.includes(posting[key]);
                }
            });
        }
    }
]);
