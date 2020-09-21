"use strict";
angular
	.module("CountdownApp")

	.controller("UserFormCtrl", function (
		$scope,
		$rootScope,
		TimeFactory,
		$interval,
		MetricsFactory,
		ChartFactory,
		currentWindow
	) {
		$scope.monthInput = "";
		$scope.yearInput = "";
		$scope.height = "";
		$scope.weight = "";
		$scope.user = {};
		$rootScope.displayClock = false;
		$scope.showYears = true;
		$scope.clocks = [];
		// using a copy to be able to modify original array without re-rendering in ng-repeat
		$scope.clocksCopy = [];
		let runningClock = null;

		$scope.removeClock = function () {
			$interval.cancel(runningClock);
			$scope.clocks.splice(this.$index, 1);
			$scope.clocksCopy.splice(this.$index, 1);
		};

		$scope.addClock = function () {
			currentWindow.setSize(550, 625);
			$rootScope.displayClock = false;
		};

		$scope.getYearsLeft = function () {
			// invalidate form to disable submit btn
			$scope.userForm.$valid = false;
			// format yrs/months to age for api call
			let yrsAlive = null;
			if (+$scope.yearInput === moment().year()) {
				yrsAlive = 0;
			} else {
				yrsAlive = moment($scope.yearInput, "YYYY")
					.fromNow()
					.replace("a", "1")
					.match(/\d+/)[0];
			}
			let monthsAlive = TimeFactory.monthsOld($scope.monthInput);
			$scope.user.age = `${yrsAlive}y${monthsAlive}m`;

			// calc bmi and fitness with weight height and exercise inputs
			$scope.user.bmi = MetricsFactory.calcBMI($scope.height, $scope.weight);
			$scope.user.fitLevel = MetricsFactory.calcFitness($scope.exerciseInput);

			TimeFactory.getTimeLeft(
				$scope.user.sex,
				$scope.user.country,
				$scope.user.age,
				$scope.user.smokeRate,
				$scope.user.bmi,
				$scope.user.fitLevel,
				yrsAlive
			).then((date) => {
				// make new clock and add to collection
				$scope.clocks.push(TimeFactory.makeClockObj(date, $scope.user));
				currentWindow.setSize(500, 80 + 95 * $scope.clocks.length);
				initializeClocks($scope.clocks);
				$scope.clocksCopy = $scope.clocks.slice(0);
			});
		};

		const initializeClocks = (clocksArr) => {
			// update each clock every second
			clocksArr.forEach(function (clock, index) {
				runningClock = $interval(function () {
					if (clocksArr.length > 0 && clocksArr[index]) {
						if ($scope.showYears) {
							clocksArr[index] = TimeFactory.makeYrClockObj(
								clocksArr[index].endtime,
								clocksArr[index]
							);
						} else {
							clocksArr[index] = TimeFactory.makeClockObj(
								clocksArr[index].endtime,
								clocksArr[index]
							);
						}
						if (clocksArr[index].total <= 0) {
							$interval.cancel(runningClock);
							clocksArr.splice(index, 1);
							$scope.clocksCopy.splice(index, 1);
						}
						// copy updated values to clock's copy
						for (let prop in clocksArr[index]) {
							$scope.clocksCopy[index][prop] = clocksArr[index][prop];
						}
					}
				}, 1000);
			});
			// hide form, show clock(s)
			$rootScope.displayClock = true;
		};

		//----------------------- Chart Modal ------------//
		$scope.toggleModal = () => {
			// get data for chart parameters
			$scope.labels = ChartFactory.listNames($scope.clocks);
			$scope.data = ChartFactory.getChartData($scope.clocks);

			document.querySelector(".clock-modal").classList.toggle("is-active");
			// adjust screen size for modal/clock view
			if (
				document.querySelector(".clock-modal").classList.contains("is-active")
			) {
				currentWindow.setSize(500 + 25 * $scope.clocks.length, 585);
			} else {
				currentWindow.setSize(500, 80 + 95 * $scope.clocks.length);
			}

			$scope.series = ["Current Years Remaining", "Max Years Remaining"];

			$scope.options = {
				responsive: true,
				maintainAspectRatio: false,

				legend: {
					display: true,
					labels: {
						fontColor: "rgba(250,250,250,.78)",
						fontSize: 13,
						fontStyle: "bold",
					},
				},
				scales: {
					yAxes: [
						{
							display: true,
							ticks: {
								beginAtZero: true,
								stepValue: 10,
								max: 100,
								fontColor: "rgba(250,250,250,.6)",
							},
							scaleLabel: {
								display: true,
								labelString: "Years",
								fontSize: 15,
								fontColor: "rgba(250,250,250,.78)",
								fontStyle: "bold",
							},
						},
					],
					xAxes: [
						{
							stacked: true,
							maxBarThickness: 90,
							ticks: {
								fontSize: 13.5,
								fontColor: "rgba(250,250,250,.78)",
								fontStyle: "bold",
							},
						},
					],
				},
			};
		};

		//--------------------- Calender Modal ---------------//
		$scope.toggleDate = function () {
			// get end date and name of selected clock
			if (this.clock) {
				$scope.graveName = this.clock.name;
				$scope.endDate = this.clock.endtime.toDateString().substring(4);
			}

			document.querySelector(".calender-modal").classList.toggle("is-active");
			//adjust screen size for modal/clock view
			if (
				document
					.querySelector(".calender-modal")
					.classList.contains("is-active")
			) {
				currentWindow.setSize(500, 500);
			} else {
				currentWindow.setSize(500, 80 + 95 * $scope.clocks.length);
			}
		};
	});
