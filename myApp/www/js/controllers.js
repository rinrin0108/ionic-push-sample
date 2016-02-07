angular.module('starter.controllers', ["ionic"])

.controller('DashCtrl', function($scope) {

  // kick off the platform web client
  Ionic.io();

  // this will give you a fresh user or the previously saved 'current user'
  var user = Ionic.User.current();
  // if the user doesn't have an id, you'll need to give it one.
  if (!user.id) {
    user.id = Ionic.User.anonymousId();
    // user.id = 'your-custom-user-id';
  }
  console.log("I am " + user.id);

  $scope.addParent = function(parent, $user) {
    console.log(parent);

    user.set('parents', parent.userId);
    //persist the user
    user.save();
  };
})

.controller('ChatsCtrl', function($scope, $http) {
  $scope.pushToParent = function() {


    // kick off the platform web client
    Ionic.io();
    // this will give you a fresh user or the previously saved 'current user'
    var user = Ionic.User.current();
    // if the user doesn't have an id, you'll need to give it one.
    if (!user.id) {
      user.id = Ionic.User.anonymousId();
      // user.id = 'your-custom-user-id';
    }
    console.log("My Parents are " + user.get("parents") );

    var success = function(loadedUser) {
      // if this user should be treated as the current user,
      // you will need to set it as such:
      //Ionic.User.current(loadedUser);

      // assuming you previous had var user = Ionic.User.current()
      // you will need to update your variable reference
      //var parent = Ionic.User.current();
      console.log("loaded parent:" + loadedUser.get("deviceToken"));

      //push to Parents
      var req =
      {
        method: 'POST',
        url: "https://push.ionic.io/api/v1/push",
        data: {
          "tokens": [loadedUser.get("deviceToken")],
          "production": false,
          "notification": {
            "alert":"Hello Parents!"
          }
        },
        headers: {
          "Content-Type": "application/json",
          "X-Ionic-Application-Id": "130f4a32",
          "Authorization": "Basic MjNjZDI2OWM2YTYzMDE1YjI1YTNiOWE5ZjFhZDgyNWJhYjhiNzJlNWMxOGEyY2M1Og=="
        }
      }

      $http(req).
      success(function(data, status, headers, config)
      {
        //success
        console.log("success:" + data);


      }).
      error(function(data, status, headers, config)
      {
        //error
        console.log("error:" + data);
      });
    };

    var failure = function(error) {
      console.log('something went wrong');
    };

    Ionic.User.load(user.get("parents")).then(success, failure);


  };
})



.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
