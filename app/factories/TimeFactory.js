"use strict";
angular
	.module("CountdownApp")

	.factory("TimeFactory", ($q, $http) => {
		const getFutureDate = (years) => {
			let days = years * 365;
			//current date in milliseconds + ms til future date
			let futureDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * days);
			return futureDate;
		};

		function makeClockObj(endtime, user) {
			let t = Date.parse(endtime) - Date.parse(new Date());
			let seconds = Math.floor((t / 1000) % 60);
			let minutes = Math.floor((t / 1000 / 60) % 60);
			let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
			let days = Math.floor(t / (1000 * 60 * 60 * 24));

			return {
				total: t,
				endtime: endtime,
				name: user.name,
				bmi: user.bmi,
				smokeRate: user.smokeRate,
				fitLevel: user.fitLevel,
				days: days,
				hours: hours,
				minutes: minutes,
				seconds: seconds,
			};
		}

		function makeYrClockObj(endtime, user) {
			let t = Date.parse(endtime) - Date.parse(new Date());
			let seconds = Math.floor((t / 1000) % 60);
			let minutes = Math.floor((t / 1000 / 60) % 60);
			let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
			let totalDays = Math.floor(t / (1000 * 60 * 60 * 24));
			let years = Math.floor(totalDays / 365);
			let days = Math.floor((totalDays / 365 - years) * 365);
			return {
				total: t,
				endtime: endtime,
				name: user.name,
				bmi: user.bmi,
				smokeRate: user.smokeRate,
				fitLevel: user.fitLevel,
				years: years,
				days: days,
				hours: hours,
				minutes: minutes,
				seconds: seconds,
			};
		}

		const monthsOld = (m) => {
			let currentDate = new Date();
			if (m <= currentDate.getMonth() + 1) {
				return currentDate.getMonth() + 1 - m;
			} else {
				return 12 - m + (currentDate.getMonth() + 1);
			}
		};

		function getTimeLeft(sex, ctry, age, cigRate, bmi, fitness, yrsAlive) {
			return $q((resolve, reject) => {
				/*   $http.get(`http://api.population.io/1.0/life-expectancy/remaining/${sex}/${ctry}/2018-01-08/${age}`)
         .then(({ data }) => {
            // console.log('yrs left', (data.remaining_life_expectancy * cigRate * bmi * fitness));
            return (data.remaining_life_expectancy * cigRate * bmi * fitness);
         })
         .then( yrs => {
            resolve(getFutureDate(yrs));
         });*/

				/*
            API WORKAROUND -- 09.09.20
         */
				if (yrsAlive < 75) {
					yrsAlive = 80 - yrsAlive + yrsAlive / 15;
				} else if (yrsAlive < 95) {
					yrsAlive = ((110 % yrsAlive) / 6) * 2;
				} else {
					yrsAlive = 0.1 * (121 - yrsAlive) + 0.4;
				}
				let yrsRemaining = yrsAlive * sex * cigRate * bmi * fitness;

				resolve(getFutureDate(yrsRemaining));
			});
		}

		return { getTimeLeft, makeClockObj, makeYrClockObj, monthsOld };
	});
