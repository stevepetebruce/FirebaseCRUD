
(function(){

'use strict';

  angular.module('myApp.magazines', ['ngRoute','firebase'])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/magazines', {
        templateUrl: 'magazines/magazines.html',
        controller: 'magazinesCtrl',
        // Authenticating With Router
        resolve: {
            // controller will not be loaded until $requireSignIn resolves
            // Auth refers to our $firebaseAuth wrapper in the factory below
            "currentAuth": ["Auth", function(Auth) {
                // $requireSignIn returns a promise so the resolve waits for it to complete
                // If the promise is rejected, it will throw a $stateChangeError (see above)
                return Auth.$requireSignIn();
            }]
        }
      });
    }])

    // factory that generates the $firebaseAuth instance
    .factory('Auth', ['$firebaseAuth',
        function($firebaseAuth) {
            return $firebaseAuth();
        }
    ])


    .controller('magazinesCtrl', ['$scope','$firebaseArray', function($scope, $firebaseArray) {
        var ref = firebase.database().ref().child("items");
        // download the data from a Firebase reference into a (pseudo read-only) array
        $scope.items = $firebaseArray(ref);

        $scope.addFormShow = true;
        $scope.editFormShow = false;

        // Display contents when edit clicked
        $scope.showEditForm = function(item){
            $scope.addFormShow = false;
            $scope.editFormShow = true;
            //alert(item.product_title + item.Digital_id + item.Print_id);

            //ID required for editMagazine
            $scope.id = item.$id;

            $scope.product_title = item.product_title;
            $scope.Digital_id = item.Digital_id;
            $scope.Print_id = item.Print_id;
            $scope.product_desc = item.product_desc;
            $scope.issue_no = item.issue_no;
            $scope.magcode = item.magcode;
            $scope.product_image = item.product_image;
            $scope.Showme = item.Showme;
            $scope.Magazine = item.Magazine;
            $scope.Available = item.Available;
        }

        $scope.addMagazine = function () {
            $scope.items.$add({
                product_title: $scope.item.product_title,
                Digital_id: $scope.item.Digital_id,
                Print_id: $scope.item.Print_id,
                product_desc: $scope.item.product_desc,
                issue_no: $scope.item.issue_no,
                magcode: $scope.item.magcode,
                product_image: $scope.item.product_image,
                Showme: $scope.item.Showme,
                Magazine: $scope.item.Magazine,
                Available: $scope.item.Available
            }).then(function () {

                alert("Magazine added ");
                $scope.item.product_title = '';
                $scope.item.Digital_id = '';
                $scope.item.Print_id = '';
                $scope.item.product_desc = '';
                $scope.item.issue_no = '';
                $scope.item.magcode = '';
                $scope.item.product_image = '';
                $scope.item.Showme = '';
                $scope.item.Magazine = '';
                $scope.item.Available = '';

            });
        }


        //save edit to database
        $scope.editMagazine = function(){
            var id = $scope.id;
            console.log("id "+id);
            var record = $scope.items.$getRecord(id);
            console.log("record "+ record + $scope.product_title);
            record.product_title = $scope.product_title;
            record.Digital_id = $scope.Digital_id;
            record.Print_id = $scope.Print_id;
            record.product_desc = $scope.product_desc;
            record.issue_no = $scope.issue_no;
            record.magcode = $scope.magcode;
            record.product_image = $scope.product_image;
            record.Showme = $scope.Showme;
            record.Magazine = $scope.Magazine;
            record.Available = $scope.Available;

            //Save
            $scope.items.$save(record).then(function(ref){
                alert(ref.key);
            });

            $scope.product_title = '';
            $scope.Digital_id = '';
            $scope.Print_id = '';
            $scope.product_desc = '';
            $scope.issue_no = '';
            $scope.magcode = '';
            $scope.product_image = '';
            $scope.Showme = '';
            $scope.Magazine = '';
            $scope.Available = '';
        }

        $scope.removeMagazine = function(item){
            //alert(item.product_title);
            $scope.items.$remove(item);
        }

    }]);


}());
