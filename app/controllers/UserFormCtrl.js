'use strict'; 
angular.module('CountdownApp')

.controller('UserFormCtrl', function($scope, TimeFactory, $interval, MetricsFactory){
 
   $scope.monthInput = "";
   $scope.yearInput = "";
   $scope.height = "";
   $scope.weight = "";
   $scope.displayClock = false; 
   $scope.endtimes = [];
   $scope.clocks = [];
   $scope.user = {};

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
         //hide form, show clock(s)
         $scope.displayClock = true; 
         initializeClock(date);
      });
   };

   const initializeClock = (endtime) => {
      const updateClock = () => {
         let clock = TimeFactory.makeClockObj(endtime);
         $scope.days = clock.days;
         $scope.hours = ('0' + clock.hours).slice(-2);
         $scope.minutes = ('0' + clock.minutes).slice(-2);
         $scope.seconds = ('0' + clock.seconds).slice(-2);

         if (endtime.total <= 0) {
            $interval.cancel((timeinterval));
         }
      };
      updateClock(endtime);
      let timeinterval = $interval(updateClock, 1000);
   };
   
});

//push new clock to array
// $scope.clocks.push(TimeFactory.makeClockObj(date));