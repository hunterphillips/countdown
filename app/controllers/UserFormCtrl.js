'use strict'; 
angular.module('CountdownApp')

   .controller('UserFormCtrl', function ($scope, TimeFactory, $interval, MetricsFactory, $timeout){
   $scope.monthInput = "";
   $scope.yearInput = "";
   $scope.height = "";
   $scope.weight = "";
   $scope.user = {};
   $scope.displayClock = false; 
   $scope.clocks = [];
   let runningClock = null;

   $scope.removeClock = function(){
      $interval.cancel(runningClock);
      $scope.clocks.splice(this.$index,1);
   };

   $scope.addClock = function(){
      // $interval.cancel(runningClock);
      $scope.displayClock = false;
   };

   $scope.getYearsLeft = function(){
      $scope.userForm.$valid = false;
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
         // make new clock and add to collection
         $scope.clocks.push(TimeFactory.makeClockObj(date));
         initializeClocks($scope.clocks);
      });
   };

   const initializeClocks = (clocksArr) => {
      // update each clock every second
      for (let clock in clocksArr) {
            runningClock = $interval(function(){
               clocksArr[clock] = TimeFactory.makeClockObj(clocksArr[clock].endtime);
            }, 1000);
         }
      //hide form, show clock(s)
      $scope.displayClock = true; 
   };

});

