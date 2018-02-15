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

   const getChartData = (array) => {
      let data = [];
      let years = [];
      let maxYears = [];
      for (let clock in array) {
         array[clock] = TimeFactory.makeYrClockObj(array[clock].endtime, array[clock]);
         years.push(array[clock].years);
         maxYears.push(array[clock].years);
      }
      data.push(years);
      data.push(maxYears);
      return data;
   };

   return { listNames, getChartData };
});