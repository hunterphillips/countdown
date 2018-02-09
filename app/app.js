'use strict'; 
angular.module('CountdownApp',[])

.directive('userForm', function(){
   return {
      templateUrl: 'templates/user-form.html',
      controller: 'UserFormCtrl'
   };
})

.directive('titleBar', function(){
   return {
      templateUrl: 'templates/title-bar.html',
      controller: 'TitleBarCtrl'
   };
});