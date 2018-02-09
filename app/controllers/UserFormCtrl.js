'use strict'; 
angular.module('CountdownApp')

   .controller('UserFormCtrl', function ($scope, TimeFactory, $interval, MetricsFactory, $timeout){
 
   $scope.monthInput = "";
   $scope.yearInput = "";
   $scope.height = "";
   $scope.weight = "";
   $scope.displayClock = false; 
   $scope.endtimes = [];
   $scope.clocks = [];
   $scope.user = {};
   $scope.clock = {};
   let runningClock = null;

   $scope.removeClock = function(){
      $scope.clock = {};
      $interval.cancel(runningClock);
      $scope.displayClock = false;
   };

   $scope.getYearsLeft = function(){
      //format yrs/months to age for api call 
      let yrsAlive = null;
      if (+$scope.yearInput === moment().year()) {
         yrsAlive = 0;
      } else {
         yrsAlive = moment($scope.yearInput, "YYYY").fromNow().replace('a', '1').match(/\d+/)[0];
      }
      let monthsAlive = TimeFactory.monthsOld($scope.monthInput);
      $scope.user.age = `${yrsAlive}y${monthsAlive}m`;

      //calc bmi with weight height inputs
      $scope.user.bmi = MetricsFactory.calcBMI($scope.height, $scope.weight);
      TimeFactory.getTimeLeft($scope.user.sex, $scope.user.country, $scope.user.age, $scope.user.smokeRate, $scope.user.bmi)
      .then(date => {
         $scope.clocks.push(TimeFactory.makeClockObj(date));
         $scope.endtimes.push(date);
   
            initializeClock(date);
      });
   };

   const initializeClock = (endtime) => {

      // for (let clock of $scope.clocks) {
         runningClock = $interval(function(){
               // $scope.clocks.splice(($scope.clocks.indexOf(clock)), 1, TimeFactory.makeClockObj(endtime));
               $scope.clock = TimeFactory.makeClockObj(endtime);
            }, 1000);
         // }   
      //hide form, show clock(s)
      $scope.displayClock = true; 
   };

});

