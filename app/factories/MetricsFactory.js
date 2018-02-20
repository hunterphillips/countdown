'use strict'; 
angular.module('CountdownApp')

.factory('MetricsFactory',() => {
   
   function calcBMI(inches, lbs) {
      let lifeCost = 1;
      let height = inches / 39.3700787;
      let weight = lbs / 2.20462;
      let bmi = weight / Math.pow(height, 2);

      if(bmi >= 30 && bmi < 40){
         lifeCost = 0.96;
      } else if(bmi >= 40){
         lifeCost = 0.88;
      }
      return lifeCost;
   }

   function calcFitness(hrs) {
      let fitLevel = null;
      if(hrs == null){
         fitLevel = 1;
      } else {
         fitLevel = hrs;
      }
      return fitLevel;
   }

   return { calcBMI, calcFitness };
});