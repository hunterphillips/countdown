'use strict'; 
angular.module('CountdownApp')

.factory('TimeFactory', ($q, $http) => {

   const getFutureDate = (years => {
      let days = years * 365;
      //current date in milliseconds + ms til future date
      let futureDate = new Date(Date.now() + (1000 * 60 * 60 * 24 * days));
      return futureDate;
   });

   function makeClockObj(endtime, name){
      let t = Date.parse(endtime) - Date.parse(new Date());
      let seconds = Math.floor((t / 1000) % 60);
      let minutes = Math.floor((t / 1000 / 60) % 60);
      let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
      let days = Math.floor(t / (1000 * 60 * 60 * 24));

      return {
         'total': t,
         'endtime': endtime,
         'name': name,
         'days': days,
         'hours': hours,
         'minutes': minutes,
         'seconds': seconds
      };
   }

   function makeYrClockObj(endtime, name) {
      let t = Date.parse(endtime) - Date.parse(new Date());
      let seconds = Math.floor((t / 1000) % 60);
      let minutes = Math.floor((t / 1000 / 60) % 60);
      let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
      let totalDays = Math.floor(t / (1000 * 60 * 60 * 24));
      let years = Math.floor(totalDays/365);
      let days = Math.floor(((totalDays/365) - years)*365);
      return {
         'total': t,
         'endtime': endtime,
         'name': name,
         'years': years,
         'days': days,
         'hours': hours,
         'minutes': minutes,
         'seconds': seconds
      };
   }

   const monthsOld = (m) => {
      let currentDate = new Date();
      if (m <= currentDate.getMonth() + 1) {
         return (currentDate.getMonth() + 1) - m;
      } else {
         return (12 - m) + (currentDate.getMonth() + 1);
      }
   };

   function getTimeLeft(sex, ctry, age, cigRate, bmi) {
      return $q((resolve,reject) => {
         $http.get(`http://api.population.io/1.0/life-expectancy/remaining/${sex}/${ctry}/2018-01-08/${age}`)
         .then(({ data }) => {
            console.log('yrs left', (data.remaining_life_expectancy * cigRate * bmi));
            return (data.remaining_life_expectancy * cigRate * bmi);
         })
         .then( yrs => {
            resolve(getFutureDate(yrs));
         });
      });
   }

   return { getTimeLeft, makeClockObj, makeYrClockObj, monthsOld };
});