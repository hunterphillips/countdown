'use strict'; 
angular.module('CountdownApp')

.controller('TitleBarCtrl', function ($scope, currentWindow){

   $scope.minWindow = function() {
      currentWindow.minimize(); 
   };
   
   $scope.maxWindow = function() {
      if(!currentWindow.isMaximized()){
         currentWindow.maximize();
      }else{
         currentWindow.unmaximize();
      }
   };
        
   $scope.closeWindow = function(){
      currentWindow.close();
   };

});