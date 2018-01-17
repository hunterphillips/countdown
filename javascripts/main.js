'use strict'; 
const $ = require('jquery'); 
const moment = require('moment');
const factory = require('./factory');
const converter = require('./converter');
const view = require('./view');

let sex;
$('.sexSelect').click(function(){
   sex = $(this).attr('id');
});  
 
$('#submit').click(()=>{
   let month = $('#month').val();
   let yearInput = $('#year').val();
   let userCountry = $('#country').val();
   console.log('userCtry:',userCountry);

   let yrsAlive = moment(yearInput, "YYYY").fromNow().match(/\d+/)[0];
   let monthsAlive = converter.monthsOld(month);
   let userAge = `${yrsAlive}y${monthsAlive}m`;

   factory.getYears(sex, userCountry, userAge)
      .then(yrs => {
         return converter.getDeathDate(yrs);
      })
      .then(date =>{
         view.initializeClock('#timerOutput', date);
      });
   
});      



 

