'use strict'; 
angular.module('CountdownApp')

.controller('TitleBarCtrl', function($scope ){
   // const remote = require('electron').remote; 

   $scope.minWindow = function () {
      // const window = electron.remote.getCurrentWindow();
      // window.minimize(); 
   };
        
   // document.getElementById("max-btn").addEventListener("click", function (e) {
   //    const window = remote.getCurrentWindow();
   //    if (!window.isMaximized()) {
   //    window.maximize();
   //    } else {
   //    window.unmaximize();
   //    }	 
   // });
        
   // document.getElementById("close-btn").addEventListener("click", function (e) {
   //    const window = remote.getCurrentWindow();
   //    window.close();
   // }); 
      
   // document.onreadystatechange = function () {
   //    if (document.readyState == "complete") {
   //       init(); 
   //    }
   // };
});