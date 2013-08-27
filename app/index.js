var JSHINT = require('jshint').JSHINT;
var base = [
  "var arDrone = require('ar-drone');",
  "var client = arDrone.createClient();",
  "client.takeoff();",
  "client.after(5000, function() {",
  "  this.clockwise(0.5);",
  "})",
  ".after(3000, function() {",
  "  this.stop();",
  "  this.land();",
  "});"].join('\n');
angular.module("App", ['ui.codemirror'])
  .controller('MainCtrl', function($scope) {
    $scope.errors = [];
    $scope.code = base;
    $scope.run = function() {
      if (JSHINT($scope.code, {})) {
       eval($scope.code); 
      } else {
        $scope.errors = JSHINT.errors;
      }
    };

    $scope.reset = function() {
      $scope.errors = "";
      $scope.code = base;
    };

    $scope.stop = function() {
      var arDrone = require('ar-drone');
      var client = arDrone.createClient();
      client.stop();
      client.land();
    };

  });