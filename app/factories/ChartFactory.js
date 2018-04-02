'use strict'; 
angular.module('CountdownApp')

.factory('ChartFactory', (TimeFactory) => {

   const listNames = (array) => {
      let names = [];
      // loop through clocks to get names
      for (let clock in array) {
         //assign 'Anonymous' if clock has no name
         if (array[clock].name){
            names.push(array[clock].name);
         } else {
            names.push("Anonymous");
         }
      }
      return names;
   };

   const maxLife = (clock) => {
      let years = clock.years;
      if (clock.bmi === 0.96) {
         years *= 1.042;
      } else if (clock.bmi === 0.88) {
         years *= 1.1364;
      }
      if (+clock.smokeRate === 0.96) {
         years *= 1.042;
      } else if (+clock.smokeRate === 0.92){
         years *= 1.09;
      } else if (+clock.smokeRate === 0.88) {
         years *= 1.14;
      }
      if (+clock.fitLevel === 0.99){
         years *= 1.1;
      } else if(clock.fitLevel === 1){
         years *= 1.06;
      } else if(+clock.fitLevel === 1.03){
         years *= 1.03;
      }
      return Math.round(years);
   };

   const getChartData = (array) => {
      let data = [];
      let years = [];
      let maxYears = [];
      for (let clock in array) {
         //convert each clock to years
         array[clock] = TimeFactory.makeYrClockObj(array[clock].endtime, array[clock]);
         years.push(array[clock].years);
         maxYears.push(maxLife(array[clock]));
      }
      data.push(years);
      data.push(maxYears);
      return data;
   };

   return { listNames, getChartData };
});