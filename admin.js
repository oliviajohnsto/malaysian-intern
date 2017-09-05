

var app = angular.module('adminApp', ['firebase']);
app.controller('adminCtrl', ['$scope', '$firebaseArray',
    function($scope, $firebaseArray) {
        var fieldsRef = firebase.database().ref('/fields');
        var postingsRef = firebase.database().ref('/postings');

        $scope.fields = $firebaseArray(fieldsRef);
        $scope.postings = $firebaseArray(postingsRef);
        $scope.submitPostingFn = submitPosting;
        $scope.newPosting = {};

        $scope.pushPosting = function() {
            alert(angular.copy($scope.newPosting));
        };
    }
]);

function submitPosting() {
    alert('submit');
}


// firebase.ref('fields/').set({
//     name: {
//         type: 'input',
//     },
//     description: {
//         type: 'input',
//     },
//     pay: {
//         type: 'select',
//         fields: ['Paid', 'Unpaid'],
//     },
//     location: {
//         type: 'select',
//         fields: ['Kuala Lumpur'],
//     },
//     type: {
//         type: 'select',
//         fields: ['Government']
//     },
// });


