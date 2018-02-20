'use strict'; 
angular.module('CountdownApp')

    .controller('UserFormCtrl', function ($scope, $rootScope, TimeFactory, $interval, MetricsFactory, ChartFactory, $timeout, currentWindow){
    $scope.monthInput = "";
    $scope.yearInput = "";
    $scope.height = "";
    $scope.weight = "";
    $scope.user = {};
    $rootScope.displayClock = false; 
    $scope.showYears = false;
    $scope.clocks = [];
    let runningClock = null;
    
    $scope.removeClock = function(){
        $interval.cancel(runningClock);
        $scope.clocks.splice(this.$index,1);
    };

    $scope.addClock = function(){
        // $interval.cancel(runningClock);
        currentWindow.setSize(550, 625);
        $rootScope.displayClock = false;
    };

    $scope.getYearsLeft = function(){
        //invalidate form to disable submit btn
        $scope.userForm.$valid = false;
        //format yrs/months to age for api call 
        let yrsAlive = null;
        if (+$scope.yearInput === moment().year()) {
            yrsAlive = 0;
        } else {
            yrsAlive = moment($scope.yearInput, "YYYY").fromNow().replace('a', '1').match(/\d+/)[0];
        }
        let monthsAlive = TimeFactory.monthsOld($scope.monthInput);
        $scope.user.age = `${yrsAlive}y${monthsAlive}m`;

        //calc bmi and fitness with weight height and exercise inputs
        $scope.user.bmi = MetricsFactory.calcBMI($scope.height, $scope.weight);
        $scope.user.fitLevel = MetricsFactory.calcFitness($scope.exerciseInput);

        TimeFactory.getTimeLeft($scope.user.sex, $scope.user.country, $scope.user.age, 
            $scope.user.smokeRate, $scope.user.bmi, $scope.user.fitLevel)
        .then(date => {
            // make new clock and add to collection
            $scope.clocks.push(TimeFactory.makeClockObj(date, $scope.user));
            currentWindow.setSize(500,(80+(95*$scope.clocks.length)));
            initializeClocks($scope.clocks);
        });
    };

    const initializeClocks = (clocksArr) => {
        // update each clock every second
        for (let clock in clocksArr) {
            runningClock = $interval(function(){
            if($scope.showYears === true){
                clocksArr[clock] = TimeFactory.makeYrClockObj(clocksArr[clock].endtime, clocksArr[clock]);
            } else {
                clocksArr[clock] = TimeFactory.makeClockObj(clocksArr[clock].endtime, clocksArr[clock]);
            }
         }, 1000);
        }
        //hide form, show clock(s)
        $rootScope.displayClock = true; 
    };


    //----------------------- Chart Modal ------------//
    $scope.toggleModal = () => {
        // get data for chart parameters
        $scope.labels = ChartFactory.listNames($scope.clocks);
        $scope.data = ChartFactory.getChartData($scope.clocks);

        document.querySelector('.clock-modal').classList.toggle("is-active");
        //adjust screen size for modal/clock view
        if( document.querySelector('.clock-modal').classList.contains('is-active')){
            currentWindow.setSize(500 + (25 * $scope.clocks.length), 585);
        } else {
            currentWindow.setSize(500, (80 + (95 * $scope.clocks.length)));
        }

        $scope.series = ['Current Years Remaining', 'Max Years Remaining'];
        $scope.options = { 
            responsive: true,
            maintainAspectRatio: false,
            legend: { display: true },
            scales: {
                yAxes: [{ 
                    display: true,
                    ticks: { beginAtZero: true, stepValue: 10, max: 100 },
                    scaleLabel: { display: true, labelString: 'Years'} 
                }],
                xAxes: [{
                    stacked: true,
                    maxBarThickness: 90,
                }]
            }
        };
    };
    


    //--------------------- Calender Modal ---------------//
    $scope.toggleDate = function(){
        // get end date and name of selected clock
        if(this.clock){
            $scope.graveName = this.clock.name;
            $scope.endDate = this.clock.endtime.toDateString().substring(4);
        }

        document.querySelector('.calender-modal').classList.toggle("is-active");
        //adjust screen size for modal/clock view
        if (document.querySelector('.calender-modal').classList.contains('is-active')) {
            currentWindow.setSize(500, 500);
        } else {
            currentWindow.setSize(500, (80 + (95 * $scope.clocks.length)));
        }
    };

});



