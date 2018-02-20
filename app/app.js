'use strict'; 
angular.module('CountdownApp', ['angular-electron', 'chart.js'])

.directive('titleBar', function(){
   return {
      scope: true,
      templateUrl: 'templates/title-bar.html',
      controller: 'TitleBarCtrl'
   };
})

.directive('userForm', function(){
   return {
      scope: true,
      templateUrl: 'templates/user-form.html',
      controller: 'UserFormCtrl'
   };
});