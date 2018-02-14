'use strict'; 
angular.module('CountdownApp')

   .controller('UserFormCtrl', function ($scope, $rootScope, TimeFactory, $interval, MetricsFactory, $timeout, currentWindow){
   $scope.monthInput = "";
   $scope.yearInput = "";
   $scope.height = "";
   $scope.weight = "";
   $scope.user = {};
   $rootScope.displayClock = false; 
   $scope.showYears = false;
   $scope.clocks = [];
   let runningClock = null;
   
   $scope.removeClock = function(){
      $interval.cancel(runningClock);
      $scope.clocks.splice(this.$index,1);
   };

   $scope.addClock = function(){
      // $interval.cancel(runningClock);
      currentWindow.setSize(550,615);
      $rootScope.displayClock = false;
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
         $scope.clocks.push(TimeFactory.makeClockObj(date,$scope.user.name));
         currentWindow.setSize(500,(80+(95*$scope.clocks.length)));
         initializeClocks($scope.clocks);
      });
   };

   const initializeClocks = (clocksArr) => {
      // update each clock every second
      for (let clock in clocksArr) {
            runningClock = $interval(function(){
               if($scope.showYears === true){
                  clocksArr[clock] = TimeFactory.makeYrClockObj(clocksArr[clock].endtime,clocksArr[clock].name);
               } else {
                  clocksArr[clock] = TimeFactory.makeClockObj(clocksArr[clock].endtime,clocksArr[clock].name);
               }
            }, 1000);
         }
      //hide form, show clock(s)
      $rootScope.displayClock = true; 
   };

});

