'use strict'; 
angular.module('CountdownApp',[])

.directive('userForm', function(){
   return {
      templateUrl: 'templates/user-form.html',
      controller: 'UserFormCtrl'
   };
});

// .directive('clock', function(){
//    return {
//       templateUrl: 'templates/clock.html',
//       controller: 'ClockCtrl'
//    };
// });