'use strict'; 
const $ = require('jquery'); 

//get data
module.exports.getYears = (sx,ctry,age)=>{
   return new Promise((resolve, reject)=>{
      $.ajax({
         url: `http://api.population.io/1.0/life-expectancy/remaining/${sx}/${ctry}/2018-01-08/${age}`,
         dataType: 'json'
      })
      .done(data=>{
         resolve(data.remaining_life_expectancy);
         console.log('yrs remaining:', data.remaining_life_expectancy);
      })
      .fail(error=>{
         reject(error);
      });
   });
};
// http://api.population.io/1.0/life-expectancy/remaining/male/United%20States/2018-01-08/25y4m



