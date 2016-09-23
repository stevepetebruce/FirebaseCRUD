(function(){

    'use strict';

    angular.module('myApp.login', ['ngRoute','firebase'])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/login', {
        templateUrl: 'login/login.html',
        controller: 'authCtrl',
        // Authenticating With Router
        resolve: {
            // controller will not be loaded until $waitForSignIn resolves
            // Auth refers to our $firebaseAuth wrapper in the factory below
            "currentAuth": ["Auth", function(Auth) {
                // $waitForSignIn returns a promise so the resolve waits for it to complete
                return Auth.$waitForSignIn();
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


    .controller('authCtrl', ['$scope', 'Auth', function($scope, Auth) {

        $scope.auth = Auth;

        // any time auth state changes, add the user data to scope
        $scope.auth.$onAuthStateChanged(function(firebaseUser) {
            $scope.firebaseUser = firebaseUser;
        });


        $scope.logIn = function() {
            var username = $scope.email;
            var password = $scope.password;
            //console.log(username + " " + password);
            Auth.$signInWithEmailAndPassword(username, password)
            .then(function(user) {
                console.log(user);
            }).catch(function(error) {
                alert("Incorrect email or password");
                console.log(error);
            })
        }

        $scope.loginFacebook = function() {
            Auth.$signInWithPopup('facebook').then(function(user) {
                console.log(user);
            }).catch(function(error) {
                console.log(error);
            })
        }

        $scope.loginTwitter = function() {
            Auth.$signInWithPopup('twitter').then(function(user) {
                console.log(user);
            }).catch(function(error) {
                console.log(error);
            })
        }



        $scope.logOut = function() {
            Auth.$signOut();
            console.log(user);
        }
        
       


    }]);

}());