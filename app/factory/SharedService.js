(function() {
  var app = angular.module('myApp')
  app.service('Data', function() {
    var data = {}
    this.getdata = function() {
      return data }
    this.setdata = function(d) { data = d }
  });
})()
