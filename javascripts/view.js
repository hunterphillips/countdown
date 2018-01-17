'use strict'; 
const $ = require('jquery'); 
const converter = require('./converter');

module.exports.initializeClock =(id, endtime)=>{
   let clock = $(id);
   let yearsSpan = $('.years');
   let daysSpan = $('.days');
   let hoursSpan = $('.hours');
   let minutesSpan = $('.minutes');
   let secondsSpan = $('.seconds');

   const updateClock = ()=>{ 
      let t = converter.timeLeft(endtime);
      // console.log(timeLeft(endtime));
      yearsSpan.html(t.years);
      daysSpan.html(t.days);
      hoursSpan.html(('0' + t.hours).slice(-2));
      minutesSpan.html(('0' + t.minutes).slice(-2));
      secondsSpan.html(('0' + t.seconds).slice(-2));

      if (t.total <= 0) {
         clearInterval(timeinterval);
      }
   };

   updateClock();
   let timeinterval = setInterval(updateClock, 1000);
};
