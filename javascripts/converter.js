'use strict'; 
const $ = require('jquery'); 
let currentDate = new Date();

module.exports.monthsOld = (m) => {
   if (m <= currentDate.getMonth() + 1) {
      return (currentDate.getMonth() + 1) - m;
   } else {
      return (12 - m) + (currentDate.getMonth() + 1);
   }
};

module.exports.getDeathDate = (y)=> {
   let days = (y * 365);
   //current date(milliseconds) + ms til future date
   let deadline = new Date(Date.now()+(1000*60*60*24* days));
   return deadline;
};

module.exports.timeLeft = (endtime)=>{
   let t = Date.parse(endtime) - Date.parse(new Date());
   let seconds = Math.floor((t / 1000) % 60);
   let minutes = Math.floor((t / 1000 / 60) % 60);
   let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
   let totalDays = Math.floor(t / (1000 * 60 * 60 * 24));
   let years = Math.floor(totalDays/365);
   let days = Math.floor(((totalDays/365) - years)*365);
   return {
      'total': t,
      'years': years,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
   };
};
