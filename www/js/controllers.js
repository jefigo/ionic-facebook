angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  $scope.fbLogin = function() {
    facebookConnectPlugin.getAccessToken(function(result){
        $state.go('app.profile')
    },function(){
        facebookConnectPlugin.login(['email'], function(response) {
            if (response.authResponse) {
                facebookConnectPlugin.getAccessToken(function(result){
                    $scope.closeLogin();
                    $state.go('app.profile')
                })
            } else {
                facebookConnectPlugin.showDialog(['email'],function(response){})
            }
        },function(response){
            $state.go('app.playlists')
        });
    })
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('ProfileCtrl', function($scope,$ionicLoading) {
    $ionicLoading.show({
        template: 'Loading...'
    });
    $scope.fbProfile = {}
    facebookConnectPlugin.api('/me', undefined, function (result) {
        $scope.$apply(function(){
            $ionicLoading.hide();
            $scope.fbProfile = result;
        })
    }, function (response) {
        alert('Error->' + JSON.stringify(response))
    })
});
