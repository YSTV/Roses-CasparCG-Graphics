var app = angular.module('StarterApp', ['ngRoute', 'LocalStorageModule', 'semantic-ui']);

var data_timeout = 1000;

var api_root = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;

app.controller('AppCtrl', ['$scope', '$location', '$http',
    function($scope, $location, $http){

        $scope.menu = [];

        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };

        $scope.menu.push({
            name: 'General',
            url: '/general',
            type: 'link',
            icon: 'settings',
            live: false,
        });

        $scope.menu.push({
            name: 'Lower Thirds',
            url: '/lowerThirds',
            type: 'link',
            icon: 'violet list layout',
            live: false,
        });

        $scope.menu.push({
            name: 'Grid',
            url: '/grid',
            type: 'link',
            icon: 'teal grid layout',
            live: false,
        });

        $scope.menu.push({
            name: 'Roses',
            url: '/roses',
            type: 'link',
            icon: 'yellow trophy',
            live: false,
        });

        $scope.menu.push({
            name: 'Boxing',
            url: '/boxing',
            type: 'link',
            icon: 'olive users',
            live: false,
        });

        $scope.menu.push({
            name: 'Football',
            url: '/football',
            type: 'link',
            icon: 'soccer',
            live: false,
        });

        $scope.menu.push({
            name: 'Rugby',
            url: '/rugby',
            type: 'link',
            icon: 'orange soccer',
        });

        $scope.menu.push({
            name: 'Darts',
            url: '/darts',
            type: 'link',
            icon: 'red bullseye',
            live: false,
        });

        $scope.menu.push({
            name: 'Swimming',
            url: '/swimming',
            type: 'link',
            icon: 'blue life ring',
            live: false,
        });

        $scope.menu.push({
            name: 'Basketball',
            url: '/basketball',
            type: 'link',
            icon: 'orange clockwise rotated loading life ring',
            live: false,
        });

        $scope.menu.push({
            name: 'Archery',
            url: '/archery',
            type: 'link',
            icon: 'bullseye',
            live: false,
        });

        $scope.menu.push({
            name: 'Badminton',
            url: '/badminton',
            type: 'link',
            icon: 'green neuter',
            live: false,
        });

        $scope.menu.push({
            name: 'Tennis',
            url: '/tennis',
            type: 'link',
            icon: 'olive circle',
            live: false,
        });

        $scope.menu.push({
            name: 'Netball',
            url: '/netball',
            type: 'link',
            icon: 'soccer',
            live: false,
        });

        $scope.menu.push({
            name: 'Waterpolo',
            url: '/waterpolo',
            type: 'link',
            icon: 'blue tint',
            live: false,
            play: true
        });

        $scope.menu.push({
            name: 'Volleyball',
            url: '/volleyball',
            type: 'link',
            icon: 'soccer',
            live: false,
        });

        getBrandingData();

        function getBrandingData() {
            $http.get(api_root + '/images/logo')
            .then(function(response){
                if (response.status == 200) {
                    $scope.logoUrl = response.data
                }
            });
        }

        // Clock functions
        function getClockTime(){
            if ($scope.clock == undefined) {
                $scope.clock = []
            }
            $http.get(api_root + '/stopwatch/time')
            .then(function(response){
                if (response.status == 200) {
                    $scope.clock.time = response.data
                }
            });
        }

        setInterval(getClockTime, data_timeout);

        $scope.setClock = function(val) {
            $http.post(api_root + '/stopwatch/set/', JSON.stringify({time: val}));
        };

        $scope.upClock = function() {
            $http.post(api_root + '/stopwatch/count/up');
        };

        $scope.downClock = function() {
            $http.post(api_root + '/stopwatch/count/down');
        };

        $scope.pauseClock = function() {
            $http.post(api_root + '/stopwatch/pause');
        };

        $scope.stopClock = function() {
            $http.post(api_root + '/stopwatch/stop');
        };

        $scope.resetClock = function() {
            $http.post(api_root + '/stopwatch/reset');
        };
    }
]);

/*
 *  Configure the app routes
 */
app.config(['$routeProvider', 'localStorageServiceProvider',
    function($routeProvider, localStorageServiceProvider) {
        localStorageServiceProvider.setPrefix('rosesCG');

        $routeProvider
            .when("/general", {
                templateUrl: '/admin/templates/general.tmpl.html',
                controller: 'generalCGController'
            })
            .when("/lowerThirds", {
                templateUrl: '/admin/templates/lowerThirds.tmpl.html',
                controller: 'lowerThirdsCGController'
            })
            .when("/boxing", {
                templateUrl: '/admin/templates/boxing.tmpl.html',
                controller: 'boxingCGController'
            })
            .when("/roses", {
                templateUrl: '/admin/templates/roses.tmpl.html',
                controller: 'rosesCGController'
            })
            .when("/football", {
                templateUrl: '/admin/templates/football.tmpl.html',
                controller: 'footballCGController'
            })
            .when("/rugby", {
                templateUrl: '/admin/templates/rugby.tmpl.html',
                controller: 'rugbyCGController'
            })
            .when("/darts", {
                templateUrl: '/admin/templates/darts.tmpl.html',
                controller: 'dartsCGController'
            })
            .when("/swimming", {
                templateUrl: '/admin/templates/swimming.tmpl.html',
                controller: 'swimmingCGController'
            })
            .when("/grid", {
                templateUrl: '/admin/templates/grid.tmpl.html',
                controller: 'gridCGController'
            })
            .when("/basketball", {
                templateUrl: '/admin/templates/basketball.tmpl.html',
                controller: 'basketballCGController'
            })
            .when("/archery", {
                templateUrl: '/admin/templates/archery.tmpl.html',
                controller: 'archeryCGController'
            })
            .when("/badminton", {
                templateUrl: '/admin/templates/badminton.tmpl.html',
                controller: 'badmintonCGController'
            })
            .when("/tennis", {
                templateUrl: '/admin/templates/tennis.tmpl.html',
                controller: 'tennisCGController'
            })
            .when("/netball", {
                templateUrl: '/admin/templates/netball.tmpl.html',
                controller: 'netballCGController'
            })
            .when("/waterpolo", {
                templateUrl: '/admin/templates/waterpolo.tmpl.html',
                controller: 'waterpoloCGController'
            })
            .when("/volleyball", {
                templateUrl: '/admin/templates/volleyball.tmpl.html',
                controller: 'volleyballCGController'
            })
            .otherwise({redirectTo: '/general'});
    }
]);

app.controller('archeryCGController', ['$scope', '$http',
    function($scope, $http) {

        // Lock changes to the scope.
        $scope.lock = false;

        getArcheryData();
        /**
         * Updates the API when $scope.archery changes.
         */
        $scope.$watch('archery', function() {
            // If archery exists and changes are allowed.
            if ($scope.archery && !$scope.lock) {
                // Lock changed.
                $scope.lock = true;

                // Send changes and unlock changes.
                $http.post(api_root + '/sport/archery', $scope.archery).then($scope.lock = false);
            }
        }, true);

        /**
         * Gets data from API for $scope.archery.
         */
        function getArcheryData() {
            // Only get data if changes are not locked.
            if (!$scope.lock){
                $http.get(api_root + '/sport/archery')
                .then(function(response){
                    // Check that request was successful and we didn't recieve an empty body.
                    if (response.status == 200 && response.data) {
                        // Check that changes are still not locked, and that the data returned is new.
                        if (!$scope.lock && $scope.archery != response.data) {
                            $scope.archery = response.data;

                            archeryUpdated();
                        }
                    }
                });
            }
        }

        /**
         * Should be called whenever $scope.archery is modified by the controller.
         */
        function archeryUpdated() {
            // Find the item in the menu.
            $scope.menu.forEach(item => {
                if (item.name === 'Archery') {
                    item.live = $scope.archery.show
                }
            })
        }

        // Update data after every data timeout period.
        setInterval(getArcheryData, data_timeout);



        $scope.archeryReset1 = function() {
            $scope.archery.score1 = 0;
        };

        $scope.archeryHit1 = function(){
        if(!$scope.archery.shots1) {
            $scope.archery.shots1 = "";
        }
        if($scope.archery.shots1.length < 6) {
            $scope.archery.shots1 += "H";
            var tmp = Number($scope.archery.score1) || 0;
            var newScore = (tmp + 1);
            $scope.archery.score1 = newScore;
        }
        }

        $scope.archeryHit2 = function(){
        if(!$scope.archery.shots2) {
            $scope.archery.shots2 = "";
        }
        if($scope.archery.shots2.length < 6) {
            $scope.archery.shots2 += "H";
            var tmp = Number($scope.archery.score2) || 0;
            var newScore = (tmp + 1);
            $scope.archery.score2 = newScore;
        }
        }

        $scope.archeryMiss1 = function(){
        if(!$scope.archery.shots1) {
            $scope.archery.shots1 = "";
        }
        if($scope.archery.shots1.length < 6) {
            $scope.archery.shots1 += "M";
        }
        }

        $scope.archeryMiss2 = function(){
        if(!$scope.archery.shots2) {
            $scope.archery.shots2 = "";
        }
        if($scope.archery.shots2.length < 6) {
            $scope.archery.shots2 += "M";
        }
        }

        $scope.archeryReset2 = function() {
            $scope.archery.score2 = 0;
            $scope.archery.shots1 = [];
            $scope.archery.shots2 = [];
        };

        $scope.archeryHitsReset1 = function() {
            $scope.archery.shots1 = "";
        };

        $scope.archeryHitsReset2 = function() {
            $scope.archery.shots2 = "";
        };
    }
]);

/**
 * General/ Bug.
 */
app.controller('generalCGController', ['$scope', '$http',
    function($scope, $http){

        // Lock changes to the scope.
        $scope.lock = false;

        /**
         * Updates the API when $scope.bug changes.
         */
        $scope.$watch('bug', function() {
            // If the bug exists and changes are allowed.
            if ($scope.bug && !$scope.lock) {
                // Lock changed.
                $scope.lock = true;

                // Send changes and unlock changes.
                $http.post(api_root + '/bug', $scope.bug).then($scope.lock = false);
            }
        }, true);

        /**
         * Gets data from API for $scope.bug.
         */
        function getBugData() {
            // Only get data if changes are not locked.
            if (!$scope.lock){
                $http.get(api_root + '/bug')
                .then(function(response){
                    // Check that request was successful and we didn't recieve an empty body.
                    if (response.status == 200 && response.data) {
                        // Check that changes are still not locked, and that the data returned is new.
                        if (!$scope.lock && $scope.bug != response.data) {
                            $scope.bug = response.data;

                            bugUpdated();
                        }
                    }
                });
            }
        }

        /**
         * Should be called whenever $scope.bug is modified by the controller.
         */
        function bugUpdated() {
            // Find the item in the menu.
            $scope.menu.forEach(item => {
                if (item.name === 'General') {
                    // Set item live status according to current settings.
                    if ($scope.bug.showLogo === true ||
                        ($scope.bug.showGeneral === true && ($scope.bug.showLocation === true || $scope.bug.showClock === true || $scope.bug.showLive === true)))
                    {
                        item.live = true
                    } else {
                        item.live = false
                    }
                }
            })
        }

        // Update data after every data timeout period.
        setInterval(getBugData, data_timeout);
    }
]);

/**
 * Lower Thirds.
 */
app.controller('lowerThirdsCGController', ['$scope', 'localStorageService', '$http',
    function($scope, localStorageService, $http){
        $scope.queuedThirds = [];

        // Load lower thirds from local storage.
        var stored = localStorageService.get('lower_thirds');

        // If any lower thirds have been stored, set the queue.
        if(stored !== null) {
            $scope.queuedThirds = stored;
        }

        /**
         * Adds a lower third to the queue.
         */
        $scope.add = function(item) {
            if (item.heading) {
                $scope.queuedThirds.push(item);

                $scope.lowerThirdsForm.$setPristine();
                $scope.lowerThird = {};
            }
        };

        /**
         * Removes a lower third from the queue.
         */
        $scope.remove = function(index){
            $scope.queuedThirds.splice(index, 1);
        };

        /**
         * Edits a lower third.
         */
        $scope.edit = function(index) {
            if (!$scope.queuedThirds[index].edit) {
                $scope.queuedThirds[index].edit = true;
            } else if ($scope.queuedThirds[index].heading) {
                $scope.queuedThirds[index].edit = !$scope.queuedThirds[index].edit
            }
        }

        /**
         * Shows a lower third.
         */
        $scope.show = function(side, item) {
            $http.post(api_root + '/lower-third/show/' + side, item);
        };

        /**
         * Hides all lower thirds.
         */
        $scope.hideall = function() {
            $http.post(api_root + '/lower-third/hide/all')
        };

        /**
         * Hides the full lower third.
         */
        $scope.hidefull = function() {
            $http.post(api_root + '/lower-third/hide/full')
        };

        /**
         * Hides the left lower third.
         */
		$scope.hideleft = function() {
            $http.post(api_root + '/lower-third/hide/left')
        };

        /**
         * Hide the right lower third.
         */
		$scope.hideright = function() {
            $http.post(api_root + '/lower-third/hide/right')
        };

        /**
         * Gets all lower thirds from the API.
         */
        function getLowerThirds() {
            $http.get(api_root + '/lower-third')
            .then(function(response) {
                if (response.status == 200 && response.data) {
                    $scope.lowerThirds = response.data;

                    lowerThirdUpdated();
                }
            })
        }

        /**
         * Called after the lower thirds have been updated by getLowerThirds.
         */
        function lowerThirdUpdated() {
            var shown = $scope.lowerThirds.left.show || $scope.lowerThirds.right.show || $scope.lowerThirds.full.show

            $scope.menu.forEach(item => {
                if (item.name === 'Lower Thirds') {
                    item.live = shown
                }
            })
        }

        // Calls getLowerThirds once every data_timeout.
        setInterval(getLowerThirds, data_timeout)

        $scope.$on("$destroy", function() {
            localStorageService.set('lower_thirds', $scope.queuedThirds);
        });
    }
]);

/**
 * Grid.
 */
app.controller('gridCGController', ['$scope', 'localStorageService', '$http',
    function($scope, localStorageService, $http){
        // Initialise grid.
        $scope.grid = {};
        $scope.grid.rows = [];


        // Get stored grid.
        var stored = localStorageService.get('grid');
        if(stored !== null) {
            $scope.grid = stored;
        } else {
            // If we don't have a local copy, grab from the server.
            getGrid();
        }

        /**
         * Adds a row to the grid.
         */
        $scope.add = function() {
            $scope.grid.rows.push({left:'', right:''});
        };

        /**
         * Removes a row from the grid.
         */
        $scope.remove = function(index){
            $scope.grid.rows.splice(index, 1);
        };

        /**
         * Shows the grid.
         */
        $scope.show = function() {
            $scope.grid.show = true;

            $http.post(api_root + '/grid', $scope.grid);
        };

        /**
         * Hides the grid.
         */
        $scope.hide = function() {
            $scope.grid.show = false;

            $http.post(api_root + '/grid', $scope.grid);
        };

        /**
         * Store the grid when destroyed.
         */
        $scope.$on("$destroy", function() {
            localStorageService.set('grid', $scope.grid);
        });

        /**
         * Shows the color options.
         */
        $scope.showColorOptions = function() {
            $scope.grid.colorShow = true
        }

        /**
         * Hides the color options.
         */
        $scope.hideColorOptions = function() {
            $scope.grid.colorShow = false
        }

        /**
         * Gets grid data from API.
         */
        function getGrid() {
            $http.get(api_root + '/grid')
            .then(function(response) {
                if (response.status == 200 && response.data) {
                    $scope.grid = response.data;
                }
            })
        }

        function getGridLive() {
            $http.get(api_root + '/grid')
            .then(function(response) {
                if (response.status == 200 && response.data) {
                    $scope.grid.show = response.data.show;

                    gridLiveUpdated();
                }
            })
        }
        /**
         * Called after the grid data has been updated by getGrid.
         */
        function gridLiveUpdated() {

            $scope.menu.forEach(item => {
                if (item.name === 'Grid') {
                    item.live = $scope.grid.show;
                }
            })
        }

        // Calls getGrid once every data_timeout.
        setInterval(getGridLive, data_timeout)
}]);

app.controller('boxingCGController', ['$scope', '$http',
    function ($scope, $http) {

        // Lock changes to the scope.
        $scope.lock = false;

        /**
         * Updates the API when $scope.boxing changes.
         */
        $scope.$watch('boxing', function () {
            // If boxing exists and changes are allowed.
            if ($scope.boxing && !$scope.lock) {
                // Lock changed.
                $scope.lock = true;

                // Send changes and unlock changes.
                $http.post(api_root + '/sport/boxing', $scope.boxing).then($scope.lock = false);
            }
        }, true);

        /**
         * Gets data from API for $scope.boxing
         */
        function getBoxingData() {
            // Only get data if changes are not locked.
            if (!$scope.lock) {
                $http.get(api_root + '/sport/boxing')
                    .then(function (response) {
                        // Check that request was successful and we didn't recieve an empty body.
                        if (response.status == 200 && response.data) {
                            // Check that changes are still not locked, and that the data returned is new.
                            if (!$scope.lock && $scope.boxing != response.data) {
                                $scope.boxing = response.data;
                                boxingUpdated();
                            }
                        }
                    });
            }
        }

        /**
         * Should be called whenever $scope.boxing is modified by the controller.
         */
        function boxingUpdated() {
            // Find the item in the menu.
            $scope.menu.forEach(item => {
                if (item.name === 'Boxing') {
                    // Set item live status according to current settings.
                    item.live = $scope.boxing.showScore
                }
            })
        }

        // Update data after every data timeout period.
        setInterval(getBoxingData, data_timeout);

    }
]);

/**
 * Roses/ overall score.
 */
app.controller('rosesCGController', ['$scope', '$http',
    function($scope, $http) {
        $scope.roses = {}

        /**
         * Send changes to API.
         */
        $scope.$watch('roses', function() {
            if($scope.roses) {
                $http.post(api_root + '/roses', $scope.roses);
            }
        })

        /**
         * Gets the Roses score.
         */
        function getRoses() {
            // If we're using the roses live scores.
            if (!$scope.roses.manualScore) {
                // Set HTTP headers.
                var config = {
                    headers:  {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }
                }

                // Get score.
                $http.get('https://roseslive.co.uk/score.json', config)
                .then(function(response) {
                    if (response.status == 200 && response.data) {
                        // Check roses live is being sensible.
                        if(isNaN(response.data.york) || isNaN(response.data.lancs)){
                            console.log("Roses live is giving us nonsense");
                            return;
                        };

                        // Set scores.
                        $scope.roses.yorkScore = response.data.york;
                        $scope.roses.lancScore = response.data.lancs;

                        // Work out each team's progress towards a win.
                        calculateProgress();

                        // Send scores to API.
                        $http.post(api_root + '/roses', $scope.roses);
                        rosesUpdated();
                    }
                })
            } else {
                // Work out progress based on manual scores.
                calculateProgress();

                // Send scores to API.
                $http.post(api_root + '/roses', $scope.roses).then(function (response) {
                    getRosesData();
                    rosesUpdated();
                });
            }
        }

        /**
         * Works out each team's progress towards a win.
         */
        function calculateProgress() {
            if($scope.roses.totalPoints){
                $scope.roses.pointsToWin = (($scope.roses.totalPoints / 2 ) + 0.5)
            } else {
                $scope.roses.pointsToWin = 177.5;
            }

            // Work out progress and format values.
            $scope.roses.yorkProgress = (($scope.roses.yorkScore / $scope.roses.pointsToWin)*100).toFixed(2);
            $scope.roses.lancProgress = (($scope.roses.lancScore / $scope.roses.pointsToWin)*100).toFixed(2);
            $scope.roses.pointsToWin = $scope.roses.pointsToWin.toFixed(1);
        }

        /**
         * Gets scores/ graphics settings from API.
         */
        function getRosesData() {
            $http.get(api_root + '/roses')
            .then(function(response) {
                if (response.status == 200 && response.data) {
                    $scope.roses = response.data;
                }
            })
        }

        // Get roses from API.
        getRosesData();

        // Get scores once every timeout period.
        setInterval(getRoses, data_timeout)

        function rosesUpdated() {
            // Find the item in the menu.
            $scope.menu.forEach(item => {
                if (item.name === 'Roses') {
                    if ($scope.roses.showScore === true || $scope.roses.showProgress === true) {
                        item.live = true
                    } else {
                        item.live = false
                    }
                }
            })
        }
    }
]);

app.controller('footballCGController', ['$scope', 'localStorageService', '$http',
    function($scope, localStorageService, $http){

        // Lock changes to the scope.
        $scope.lock = false;

        // Get the default values from server on load.
        getFootballData();

        /**
         * Updates the API when $scope.football changes.
         */
        $scope.$watch('football', function() {
            // If scope exists and changes are allowed.
            if ($scope.football && !$scope.lock) {
                // Lock changed.
                $scope.lock = true;

                // Send changes and unlock changes.
                $http.post(api_root + '/sport/football', $scope.football).then($scope.lock = false);
            }
        }, true);

        /**
         * Gets data from API for $scope.football
         */
        function getFootballData() {
            // Only get data if changes are not locked.
            if (!$scope.lock) {
                $http.get(api_root + '/sport/football')
                    .then(function (response) {
                        // Check that request was successful and we didn't recieve an empty body.
                        if (response.status == 200 && response.data) {
                            // Check that changes are still not locked, and that the data returned is new.
                            if (!$scope.lock && $scope.football != response.data) {
                                $scope.football = response.data;
                                footballUpdated();
                            }
                        }
                    });
            }
        }

        // Update data after every data timeout period.
        setInterval(getFootballData, data_timeout);

        /**
         * Should be called whenever $scope.boxing is modified by the controller.
         */
        function footballUpdated() {
            // Find the item in the menu.
            $scope.menu.forEach(item => {
                if (item.name === 'Football') {
                    if ($scope.football.show === true || $scope.football.showpre === true || $scope.football.showpost === true ) {
                        item.live = true
                    } else {
                        item.live = false
                    }
                }
            })
        }

        var storedHome = localStorageService.get('home_football');
        var storedAway = localStorageService.get('away_football');

        if(storedHome === null) {
            $scope.homePlayers = [];
        } else {
            $scope.homePlayers = storedHome;
        }

        if(storedAway === null) {
            $scope.awayPlayers = [];
        } else {
            $scope.awayPlayers = storedAway;
        }

        $scope.addHomePlayer = function() {
            $scope.homePlayers.push($scope.home);
            $scope.home = {};
        };

        $scope.addAwayPlayer = function() {
            $scope.awayPlayers.push($scope.away);
            $scope.away = {};
        };

        $scope.delete = function(team, index) {
            console.log('delete');
            if(team === 'away') {
                $scope.awayPlayers.splice(index, 1);
            } else if (team === 'home') {
                $scope.homePlayers.splice(index, 1);
            }
        };

        $scope.$on("$destroy", function() {
            localStorageService.set('away_football', $scope.awayPlayers);
            localStorageService.set('home_football', $scope.homePlayers);
        });

    }
]);

app.controller('rugbyCGController', ['$scope', 'localStorageService', '$http',
    function($scope, localStorageService, $http){

        // Lock changes to the scope.
        $scope.lock = false;

        // Get the default values from server on load.
        getRugbyData();

        /**
         * Updates the API when $scope.rugby changes.
         */
        $scope.$watch('rugby', function() {
            // If scope exists and changes are allowed.
            if ($scope.rugby && !$scope.lock) {
                // Lock changed.
                $scope.lock = true;

                // Send changes and unlock changes.
                $http.post(api_root + '/sport/rugby', $scope.rugby).then($scope.lock = false);
            }
        }, true);

        /**
         * Gets data from API for $scope.rugby
         */
        function getRugbyData() {
            // Only get data if changes are not locked.
            if (!$scope.lock) {
                $http.get(api_root + '/sport/rugby')
                    .then(function (response) {
                        // Check that request was successful and we didn't recieve an empty body.
                        if (response.status == 200 && response.data) {
                            // Check that changes are still not locked, and that the data returned is new.
                            if (!$scope.lock && $scope.rugby != response.data) {
                                $scope.rugby = response.data;
                                rugbyUpdated();
                            }
                        }
                    });
            }
        }

        // Update data after every data timeout period.
        setInterval(getRugbyData, data_timeout);

        /**
         * Should be called whenever $scope.rugby is modified by the controller.
         */
        function rugbyUpdated() {
            // Find the item in the menu.
            $scope.menu.forEach(item => {
                if (item.name === 'Rugby') {
                    item.live = $scope.rugby.show
                }
            })
        }
    }
]);

app.controller('dartsCGController', ['$scope', '$http',
    function($scope, $http) {

        // Lock changes to the scope.
        $scope.lock = false;

        // Get the default values from server on load.
        getDartsData();

        /**
         * Updates the API when $scope.darts changes.
         */
        $scope.$watch('darts', function() {
            // If scope exists and changes are allowed.
            if ($scope.darts && !$scope.lock) {
                // Lock changed.
                $scope.lock = true;

                // Send changes and unlock changes.
                $http.post(api_root + '/sport/darts', $scope.darts).then($scope.lock = false);
            }
        }, true);

        /**
         * Gets data from API for $scope.darts
         */
        function getDartsData() {
            // Only get data if changes are not locked.
            if (!$scope.lock) {
                $http.get(api_root + '/sport/darts')
                    .then(function (response) {
                        // Check that request was successful and we didn't recieve an empty body.
                        if (response.status == 200 && response.data) {
                            // Check that changes are still not locked, and that the data returned is new.
                            if (!$scope.lock && $scope.darts != response.data) {
                                $scope.darts = response.data;
                                dartsUpdated();
                            }
                        }
                    });
            }
        }

        // Update data after every data timeout period.
        setInterval(getDartsData, data_timeout);

        /**
         * Should be called whenever $scope.darts is modified by the controller.
         */
        function dartsUpdated() {
            // Find the item in the menu.
            $scope.menu.forEach(item => {
                if (item.name === 'Darts') {
                    item.live = $scope.darts.show
                }
            })
        };

        $scope.reset1 = function() {
            $scope.darts.score1 = 501;
        };

        $scope.reset2 = function() {
            $scope.darts.score2 = 501;
        };

        $scope.set1 = function(val) {
            $scope.darts.score1 = val;
            $scope.last1 = "";
        };

        $scope.set2 = function(val) {
            $scope.darts.score2 = val;
            $scope.last2 = "";
        };

        $scope.take1 = function(val) {
            if( val > 180) {
                $scope.last1 = "";
                return;
            }

            var tmp = $scope.darts.score1;
            var newScore = (tmp - val);

            if(newScore >= 0) {
                $scope.darts.score1 = newScore;
                $scope.last1 = "";
            }
        };

        $scope.take2 = function(val) {
            if( val > 180) {
                $scope.last2 = "";
                return;
            }

            var tmp = $scope.darts.score2;
            var newScore = (tmp - val);

            if(newScore >= 0) {
                $scope.darts.score2 = newScore;
                $scope.last2 = "";
            }
        };
    }
]);

app.controller('swimmingCGController', ['$scope', '$http',
    function($scope, $http) {

        $scope.resetLanes = function() {
            $scope.swimming.showclock = false;
            $scope.swimming.showlist = false;
            setTimeout($scope.emptyLanes, data_timeout + 500);
        }

        $scope.emptyLanes = function() {
            for (var i = 0; i < 8; i++){
                $scope.swimming.lanes[i] = {
                    id: i,
                    name: "",
                    team: ""
                };
            }
            $scope.resetOrder();
        };

        $scope.resetOrder = function() {
            $scope.swimming.laneOrder = [];
            $scope.swimming.order = "";
            $scope.swimming.prevOrderLength = 0;
        };

        $scope.submitDistance = function() {
            $scope.swimming.showdistance = false;
            console.log("running")
            setTimeout($scope.showNewDistance, data_timeout + 500);
        }

        $scope.showNewDistance = function() {
            console.log("also running")
            $scope.swimming.distance = $scope.swimming.distanceTemp;
            $scope.swimming.showdistance = true;
        }

        // Lock changes to the scope.
        $scope.lock = false;

        // Get the default values from server on load.
        getSwimmingData();

        /**
         * Updates the API when $scope.swimming changes.
         */
        $scope.$watch('swimming', function() {
            if ($scope.swimming) {
                if($scope.swimming.prevOrderLength < $scope.swimming.order.length){
                    for (var i = $scope.swimming.prevOrderLength; i < Math.min($scope.swimming.order.length, 8); i++){
                        $scope.swimming.laneOrder[i] = {
                            lane: $scope.swimming.lanes[$scope.swimming.order[i] - 1],
                            time: $scope.clock.time
                        };
                    }

                    $scope.swimming.prevOrderLength = $scope.swimming.order.length;
                }

                if($scope.swimming.order.length > 0){

                }
            }
            // If scope exists and changes are allowed.
            if ($scope.swimming && !$scope.lock) {
                // Lock changed.
                $scope.lock = true;

                // If we are displaying the starting/results list, we don't want a clock and splits
                // they'll just overlap each other.
                if ($scope.swimming.showlist === true) {
                    $scope.swimming.showsplits = false;
                    $scope.swimming.showclock = false;
                    $scope.resetClock();
                    $scope.stopClock();
                }

                // Send changes and unlock changes.
                $http.post(api_root + '/sport/swimming', $scope.swimming).then($scope.lock = false);
            }
        }, true);

        /**
         * Gets data from API for $scope.swimming
         */
        function getSwimmingData() {
            // Only get data if changes are not locked.
            if (!$scope.lock) {
                $http.get(api_root + '/sport/swimming')
                    .then(function (response) {
                        // Check that request was successful and we didn't recieve an empty body.
                        if (response.status == 200 && response.data) {
                            // Check that changes are still not locked, and that the data returned is new.
                            // Angular adds $$hashkey for repeated html elements (like the swim lanes here)
                            // This causes the hashes to be different on every update. toJSON removes these for actual comparison.
                            if (!$scope.lock && angular.toJson($scope.swimming) != angular.toJson(response.data)) {
                                $scope.swimming = response.data;
                            }
                            swimmingUpdated();
                        }
                    });
            }
        }

        // Update data after every data timeout period.
        setInterval(getSwimmingData, data_timeout);

        /**
         * Should be called whenever $scope.swimming is modified by the controller.
         */
        function swimmingUpdated() {
            // Find the item in the menu.
            $scope.menu.forEach(item => {
                if (item.name === 'Swimming') {
                    if (
                        $scope.swimming.showclock === true
                        || $scope.swimming.showlist === true
                        || $scope.swimming.showsplits === true
                    ) {
                        item.live = true
                    } else {
                        item.live = false
                    }
                }
            })
        }


    }
]);

app.controller('basketballCGController', ['$scope', '$http',
    function($scope, $http){

        // Lock changes to the scope.
        $scope.lock = false;

        getBasketballData();

        /**
         * Updates the API when $scope.basketball changes.
         */
        $scope.$watch('basketball', function() {
            // If basketball exists and changes are allowed.
            if ($scope.basketball && !$scope.lock) {
                // Lock changed.
                $scope.lock = true;

                // Send changes and unlock changes.
                $http.post(api_root + '/sport/basketball', $scope.basketball).then($scope.lock = false);
            }
        }, true);

        /**
         * Gets data from API for $scope.basketball.
         */
        function getBasketballData() {
            // Only get data if changes are not locked.
            if (!$scope.lock){
                $http.get(api_root + '/sport/basketball')
                .then(function(response){
                    // Check that request was successful and we didn't recieve an empty body.
                    if (response.status == 200 && response.data) {
                        // Check that changes are still not locked, and that the data returned is new.
                        if (!$scope.lock && $scope.basketball != response.data) {
                            $scope.basketball = response.data;

                            basketballUpdated();
                        }
                    }
                });
            }
        }

        /**
         * Should be called whenever $scope.basketball is modified by the controller.
         */
        function basketballUpdated() {
            // Find the item in the menu.
            $scope.menu.forEach(item => {
                if (item.name === 'Basketball') {
                    item.live = $scope.basketball.show
                }
            })
        }

        // Update data after every data timeout period.
        setInterval(getBasketballData, data_timeout);
    }
]);

app.controller('badmintonCGController', ['$scope', '$http',
    function($scope, $http) {

        // Lock changes to the scope.
        $scope.lock = false;

        /**
         * Updates the API when $scope.badminton changes.
         */
        $scope.$watch('badminton', function() {
            // If badminton exists and changes are allowed.
            if ($scope.badminton && !$scope.lock) {
                // Lock changed.
                $scope.lock = true;

                // Send changes and unlock changes.
                $http.post(api_root + '/sport/badminton', $scope.badminton).then($scope.lock = false);
            }
        }, true);

        /**
         * Gets data from API for $scope.badminton.
         */
        function getBadmintonData() {
            // Only get data if changes are not locked.
            if (!$scope.lock){
                $http.get(api_root + '/sport/badminton')
                .then(function(response){
                    // Check that request was successful and we didn't recieve an empty body.
                    if (response.status == 200 && response.data) {
                        // Check that changes are still not locked, and that the data returned is new.
                        if (!$scope.lock && $scope.badminton != response.data) {
                            $scope.badminton = response.data;
                            badmintonUpdated();
                        }
                    }
                });
            }
        }

        /**
         * Should be called whenever $scope.badminton is modified by the controller.
         */
        function badmintonUpdated() {
            // Find the item in the menu.
            $scope.menu.forEach(item => {
                if (item.name === 'Badminton') {
                    // Set item live status according to current settings.
                    item.live = $scope.badminton.show
                }
            })
        }

        // Update data after every data timeout period.
        setInterval(getBadmintonData, data_timeout);

        $scope.resetGame1 = function() {
            $scope.badminton.game1 = 0;
        };

        $scope.resetGame2 = function() {
            $scope.badminton.game2 = 0;
        };

        $scope.resetPoint1 = function() {
            $scope.badminton.point1 = 0;
        };

        $scope.resetPoint2 = function() {
            $scope.badminton.point2 = 0;
        };
    }
]);

app.controller('tennisCGController', ['$scope', '$http',
    function($scope, $http) {


        // to make maths easier, we'll calculate points linearly and then map them to this array of tennis scores. Arrays start at 0!
        var pointNames = ['0', '15', '30', '40', 'AD']

        // Lock changes to the scope.
        $scope.lock = false;

        getTennisData();

        setInterval(getTennisData, data_timeout);

        /**
         * Gets data from API for $scope.tennis.
         */
        function getTennisData() {
            // Only get data if changes are not locked.
            if (!$scope.lock){
                $http.get(api_root + '/sport/tennis')
                .then(function(response){
                    // Check that request was successful and we didn't recieve an empty body.
                    if (response.status == 200 && response.data) {
                        // Check that changes are still not locked, and that the data returned is new.
                        if (!$scope.lock && $scope.tennis != response.data) {
                            $scope.tennis = response.data;

                            tennisUpdated();
                        }
                    }
                });
            }
        }


        /**
         * Should be called whenever $scope.tennis is modified by the controller.
         */
        function tennisUpdated() {
            // Find the item in the menu.
            $scope.menu.forEach(item => {
                if (item.name === 'Tennis') {
                    if (
                        $scope.tennis.options.showSets === true
                        || $scope.tennis.options.showScore === true
                        || $scope.tennis.options.showStats === true
                    ) {
                        item.live = true;
                    } else {
                        item.live = false;
                    }
                }
            })
        }



        $scope.$watch('tennis', function() {
            if ($scope.tennis && !$scope.lock) {

                // Lock changed.
                $scope.lock = true;

                if (($scope.tennis.options.matchName).includes("Mixed")) {
                    $scope.tennis.options.player1 = $scope.tennis.options.homeTeam;
                    $scope.tennis.options.player2 = $scope.tennis.options.awayTeam;
                }

                // Send changes and unlock changes.
                $http.post(api_root + '/sport/tennis', $scope.tennis).then($scope.lock = false);

            }
        }, true);


        // point scoring function - does all the complicated math for the user
        $scope.scorePoint = function(player) {
            // given the scoring player, get their opponent
            var opponent = (player == 1 ? 2 : 1);

            // increment number of serves for server by 1
            $scope.tennis.score['pointsServed' + $scope.tennis.score.server] ++;

            // if player was server, update serves won
            if (player == $scope.tennis.score.server) {
                if ($scope.tennis.score.firstFault) {
                    $scope.tennis.score['secondServeWon' + player] ++;
                } else {
                    $scope.tennis.score['firstServeWon' + player] ++;
                }
            }

            // clear any faults
            $scope.tennis.score.firstFault = false;

            if ($scope.tennis.score.tiebreak == true) {
                // tiebreak
                if ($scope.tennis.score['point' + player] >= 6 && ($scope.tennis.score['point' + player] - $scope.tennis.score['point' + opponent]) >= 1) {
                    // player already won at least 6 points, and now has 2 point advantage, so wins game
                    winGame(player);
                } else {
                    $scope.tennis.score['point' + player] ++;
                    $scope.tennis.score.pointName1 = $scope.tennis.score.point1;
                    $scope.tennis.score.pointName2 = $scope.tennis.score.point2;

                    // change server after every odd-numbered point played
                    if ((($scope.tennis.score['point' + player] + $scope.tennis.score['point' + opponent]) % 2) == 1) {
                        $scope.toggleServer();
                    }
                }
            } else {
                // normal game
                if ($scope.tennis.score['point' + player] >= 3 && $scope.tennis.score['point' + opponent] >= 3) {
                    // duece or advantage
                    if ($scope.tennis.score['point' + opponent] == 4) {
                        // opponent had advantage, so score now duece
                        $scope.tennis.score['point' + opponent] = 3;
                    } else if ($scope.tennis.score['point' + player] == 4) {
                        // player had advantage, so wins game
                        winGame(player);
                    } else {
                        // was duece, so player now has advantage
                        $scope.tennis.score['point' + player] = 4;
                    }
                } else if ($scope.tennis.score['point' + player] == 3) {
                    // player had 40, opponent 30 or less, so player wins game
                    winGame(player);
                } else {
                    // player had 30 or less, so add a point
                    $scope.tennis.score['point' + player] ++;
                }
                $scope.tennis.score.pointName1 = pointNames[$scope.tennis.score.point1];
                $scope.tennis.score.pointName2 = pointNames[$scope.tennis.score.point2];
            }

            $scope.tennis.score.pointsPlayed ++;
            $scope.tennis.score['pointsWon' + player] ++;

            checkTiebreak();
            checkGamePoint(player);
        };

        // ace point
        $scope.acePoint = function() {
            $scope.tennis.score['ace' + $scope.tennis.score.server] ++;
            $scope.scorePoint($scope.tennis.score.server);
        };

        // fault
        $scope.faultPoint = function() {
            if ($scope.tennis.score.firstFault) {
                // double fault
                $scope.tennis.score['singleFault' + $scope.tennis.score.server] --;
                $scope.tennis.score['doubleFault' + $scope.tennis.score.server] ++;

                // opponent scores a point
                var opponent = ($scope.tennis.score.server == 1 ? 2 : 1);
                $scope.scorePoint(opponent);
            } else {
                // first fault - set it to true
                $scope.tennis.score.firstFault = true;
                $scope.tennis.score['singleFault' + $scope.tennis.score.server] ++;
            }
        };

        function winGame(player) {
            // given the scoring player, get their opponent
            var opponent = (player == 1 ? 2 : 1);

            if ($scope.tennis.score.tiebreak == false) {
                if (player == $scope.tennis.score.server) {
                    // player was serving, and not in a tiebreak, count this as service game win
                    $scope.tennis.score['servicesWon' + player] ++;
                } else {
                    // opponent was serving, and not in a tiebreak, count this as break point win
                    $scope.tennis.score['breaksWon' + player] ++;
                }

                // increment service games for server
                $scope.tennis.score['serviceGame' + $scope.tennis.score.server] ++;
            }

            // update the sets array
            $scope.tennis.score['sets' + player].splice(-1,1,($scope.tennis.score['game' + player] + 1));

            if ($scope.tennis.score.tiebreak == true) {
                // player won tiebreak game, so wins set
                winSet(player);
            } else if ($scope.tennis.score['game' + player] >= 5 && ($scope.tennis.score['game' + player] - $scope.tennis.score['game' + opponent]) >= 1) {
                // player already won at least 5 games, and now has 2 game advantage, so wins set
                winSet(player);
            } else {
                // player can't win set yet, so add a game and reset points
                $scope.tennis.score['game' + player] ++;
                resetPoints();
                $scope.toggleServer();
            }
        }

        function winSet(player) {
            // given the scoring player, get their opponent
            var opponent = (player == 1 ? 2 : 1);

            $scope.tennis.score['set' + player] ++;
            resetGames();

            if ($scope.tennis.score['set' + player] > ($scope.tennis.options.maxSets - 1)/2) {
                // player already won (max - 1) sets, so wins match
                $scope.tennis.options.disableInput = true;
            } else {
                // player can't win match yet, so add a set and reset games
                $scope.tennis.score['sets' + player].push(0);
                $scope.tennis.score['sets' + opponent].push(0);

                $scope.toggleServer();
            }
        }

        function resetPoints() {
            $scope.tennis.score.point1 = $scope.tennis.score.point2 = $scope.tennis.score.pointName1 = $scope.tennis.score.pointName2 = 0;
        }

        function resetGames() {
            $scope.tennis.score.game1 = $scope.tennis.score.game2 = 0;
            resetPoints();
        }

        $scope.toggleServer = function toggleServer() {
            $scope.tennis.score.server = ($scope.tennis.score.server == 1 ? 2 : 1);
        };

        function checkTiebreak() {
            if (($scope.tennis.score.set1 + $scope.tennis.score.set2) == ($scope.tennis.options.maxSets - 1)) {
                // this is the last set, so tiebreak is not possible
                $scope.tennis.score.tiebreak = false;
            } else if ($scope.tennis.score.game1 == 6 && $scope.tennis.score.game2 == 6 ) {
                // not the last set, players tied on 6 games each, so tiebreak
                $scope.tennis.score.tiebreak = true;
            } else {
                // not a tiebreak
                $scope.tennis.score.tiebreak = false;
            }
        }

        function checkGamePoint(player) {
            var opponent = (player == 1 ? 2 : 1);

            // horrific (but nessesary) if/else function
            if ($scope.tennis.score.tiebreak == true) {

                if ($scope.tennis.score['point' + player] >= 6 && ($scope.tennis.score['point' + player] - $scope.tennis.score['point' + opponent]) >= 1) {
                    // tiebreak, so scoring player needs to have at least 6 points, with a 1 point advantage

                    if ($scope.tennis.score['set' + player] == ($scope.tennis.options.maxSets - 1)/2) {
                        $scope.tennis.score.gamePoint = "Match Point";
                    } else {
                        $scope.tennis.score.gamePoint = "Set Point";
                    }

                } else if ($scope.tennis.score['point' + opponent] >= 6 && ($scope.tennis.score['point' + opponent] - $scope.tennis.score['point' + player]) >= 1) {
                    // tiebreak, not scoring player set/match point, so opponent needs to have at least 6 points, with a 1 point advantage

                    if ($scope.tennis.score['set' + opponent] == ($scope.tennis.options.maxSets - 1)/2) {
                        $scope.tennis.score.gamePoint = "Match Point";
                    } else {
                        $scope.tennis.score.gamePoint = "Set Point";
                    }

                } else {
                    // tiebreak, point isn't special, so no message needed

                    $scope.tennis.score.gamePoint = "";

                }

            } else if ($scope.tennis.score['game' + player] >= 5 && ($scope.tennis.score['game' + player] - $scope.tennis.score['game' + opponent]) >= 1 && $scope.tennis.score['point' + player] >= 3 && ($scope.tennis.score['point' + player] - $scope.tennis.score['point' + opponent]) >= 1) {
                // normal game, so scoring player needs to have at least 5 games, with a 1 game advantage; and at least 40, with a 1 point advantage

                if ($scope.tennis.score['set' + player] == ($scope.tennis.options.maxSets - 1)/2) {
                    $scope.tennis.score.gamePoint = "Match Point";
                } else {
                    $scope.tennis.score.gamePoint = "Set Point";
                }

                // check if this is also break point and increment
                if ($scope.tennis.score.server != player) {
                    $scope.tennis.score['breakPoint' + player] ++;
                }

            } else if ($scope.tennis.score['game' + opponent] >= 5 && ($scope.tennis.score['game' + opponent] - $scope.tennis.score['game' + player]) >= 1 && $scope.tennis.score['point' + opponent] >= 3 && ($scope.tennis.score['point' + opponent] - $scope.tennis.score['point' + player]) >= 1) {
                // normal game, not scoring player set/match point, so opponent needs to have at least 5 games, with a 1 game advantage; and at least 40, with a 1 point advantage

                if ($scope.tennis.score['set' + opponent] == ($scope.tennis.options.maxSets - 1)/2) {
                    $scope.tennis.score.gamePoint = "Match Point";
                } else {
                    $scope.tennis.score.gamePoint = "Set Point";
                }

                // check if this is also break point and increment
                if ($scope.tennis.score.server != opponent) {
                    $scope.tennis.score['breakPoint' + opponent] ++;
                }

            } else if ($scope.tennis.score.server != player && $scope.tennis.score['point' + player] >= 3 && ($scope.tennis.score['point' + player] - $scope.tennis.score['point' + opponent]) >= 1) {
                // normal game, not a set/match point, so player needs be against the serve, have at least 40, with a 1 point advantage

                $scope.tennis.score.gamePoint = "Break Point";
                $scope.tennis.score['breakPoint' + player] ++;

            } else if ($scope.tennis.score.server != opponent && $scope.tennis.score['point' + opponent] >= 3 && ($scope.tennis.score['point' + opponent] - $scope.tennis.score['point' + player]) >= 1) {
                // normal game, not scoring player set/match point, so opponent needs be against the serve, have at least 40, with a 1 point advantage

                $scope.tennis.score.gamePoint = "Break Point";
                $scope.tennis.score['breakPoint' + opponent] ++;

            } else {
                // normal game, point isn't special, so no message needed

                $scope.tennis.score.gamePoint = "";

            }
        }

        $scope.undoPoint = function() {
            if (!$scope.lock) {
                $scope.lock = true;
                $http.post(api_root + '/sport/tennis/undo').then($scope.lock = false);
            }
            $scope.tennis.options.disableInput = false;
        }


        $scope.resetAll = function() {
            if (!$scope.lock) {
                $scope.lock = true;
                $http.post(api_root + '/sport/tennis/reset').then($scope.lock = false);
                getTennisData();
            }

        }

    }
]);

app.controller('netballCGController', ['$scope', 'localStorageService', '$http',
    function($scope, localStorageService, $http){

        // Lock changes to the scope.
        $scope.lock = false;

        getNetballData();
        /**
         * Updates the API when $scope.netball changes.
         */
        $scope.$watch('netball', function() {
            // If scope exists and changes are allowed.
            if ($scope.netball && !$scope.lock) {
                // Lock changed.
                $scope.lock = true;

                // Send changes and unlock changes.
                $http.post(api_root + '/sport/netball', $scope.netball).then($scope.lock = false);
            }
        }, true);

        /**
         * Gets data from API for $scope.netball.
         */
        function getNetballData() {
            // Only get data if changes are not locked.
            if (!$scope.lock){
                $http.get(api_root + '/sport/netball')
                .then(function(response){
                    // Check that request was successful and we didn't recieve an empty body.
                    if (response.status == 200 && response.data) {
                        // Check that changes are still not locked, and that the data returned is new.
                        if (!$scope.lock && $scope.netball != response.data) {
                            $scope.netball = response.data;

                            netballUpdated();
                        }
                    }
                });
            }
        }

        /**
         * Should be called whenever $scope.netball is modified by the controller.
         */
        function netballUpdated() {
            // Find the item in the menu.
            $scope.menu.forEach(item => {
                if (item.name === 'Netball') {
                    item.live = $scope.netball.show
                }
            })
        }

        // Update data after every data timeout period.
        setInterval(getNetballData, data_timeout);

        var storedHome = localStorageService.get('home_netball');
        var storedAway = localStorageService.get('aways_netball');

        if(storedHome === null) {
            $scope.homePlayers = [];
        } else {
            $scope.homePlayers = storedHome;
        }

        if(storedAway === null) {
            $scope.awayPlayers = [];
        } else {
            $scope.awayPlayers = storedAway;
        }

        $scope.addHomePlayer = function() {
            $scope.homePlayers.push($scope.home);
            $scope.home = {};
        };

        $scope.addAwayPlayer = function() {
            $scope.awayPlayers.push($scope.away);
            $scope.away = {};
        };

        $scope.delete = function(team, index) {
            console.log('delete');
            if(team === 'away') {
                $scope.awayPlayers.splice(index, 1);
            } else if (team === 'home') {
                $scope.homePlayers.splice(index, 1);
            }
        };

        $scope.$on("$destroy", function() {
            localStorageService.set('away_netball', $scope.awayPlayers);
            localStorageService.set('home_netball', $scope.homePlayers);
        });

    }
]);

app.controller('waterpoloCGController', ['$scope', 'localStorageService', '$http',
    function($scope, localStorageService, $http){

        // Lock changes to the scope.
        $scope.lock = false;

        getWaterpoloData();
        /**
         * Updates the API when $scope.waterpolo changes.
         */
        $scope.$watch('waterpolo', function() {
            // If waterpolo exists and changes are allowed.
            if ($scope.waterpolo && !$scope.lock) {
                // Lock changed.
                $scope.lock = true;

                // Send changes and unlock changes.
                $http.post(api_root + '/sport/waterpolo', $scope.waterpolo).then($scope.lock = false);
            }
        }, true);

        /**
         * Gets data from API for $scope.waterpolo.
         */
        function getWaterpoloData() {
            // Only get data if changes are not locked.
            if (!$scope.lock){
                $http.get(api_root + '/sport/waterpolo')
                .then(function(response){
                    // Check that request was successful and we didn't recieve an empty body.
                    if (response.status == 200 && response.data) {
                        // Check that changes are still not locked, and that the data returned is new.
                        if (!$scope.lock && $scope.waterpolo != response.data) {
                            $scope.waterpolo = response.data;

                            waterpoloUpdated();
                        }
                    }
                });
            }
        }

        /**
         * Should be called whenever $scope.waterpolo is modified by the controller.
         */
        function waterpoloUpdated() {
            // Find the item in the menu.
            $scope.menu.forEach(item => {
                if (item.name === 'Waterpolo') {
                    item.live = $scope.waterpolo.show
                }
            })
        }

        // Update data after every data timeout period.
        setInterval(getWaterpoloData, data_timeout);


        var storedHome = localStorageService.get('home_waterpolo');
        var storedAway = localStorageService.get('away_waterpolo');

        if(storedHome === null) {
            $scope.homePlayers = [];
        } else {
            $scope.homePlayers = storedHome;
        }

        if(storedAway === null) {
            $scope.awayPlayers = [];
        } else {
            $scope.awayPlayers = storedAway;
        }

        $scope.addHomePlayer = function() {
            $scope.homePlayers.push($scope.home);
            $scope.home = {};
        };

        $scope.addAwayPlayer = function() {
            $scope.awayPlayers.push($scope.away);
            $scope.away = {};
        };

        $scope.delete = function(team, index) {
            console.log('delete');
            if(team === 'away') {
                $scope.awayPlayers.splice(index, 1);
            } else if (team === 'home') {
                $scope.homePlayers.splice(index, 1);
            }
        };

        $scope.$on("$destroy", function() {
            localStorageService.set('away_waterpolo', $scope.awayPlayers);
            localStorageService.set('home_waterpolo', $scope.homePlayers);
        });
    }
]);

app.controller('volleyballCGController', ['$scope', '$http',
    function ($scope, $http) {

        // Lock changes to the scope.
        $scope.lock = false;

        getVolleyballData();
        /**
         * Updates the API when $scope.volleyball changes.
         */
        $scope.$watch('volleyball', function () {
            // If volleyball exists and changes are allowed.
            if ($scope.volleyball && !$scope.lock) {
                // Lock changed.
                $scope.lock = true;

                // Send changes and unlock changes.
                $http.post(api_root + '/sport/volleyball', $scope.volleyball).then($scope.lock = false);
            }
        }, true);

        /**
         * Gets data from API for $scope.volleyball.
         */
        function getVolleyballData() {
            // Only get data if changes are not locked.
            if (!$scope.lock) {
                $http.get(api_root + '/sport/volleyball')
                    .then(function (response) {
                        // Check that request was successful and we didn't recieve an empty body.
                        if (response.status == 200 && response.data) {
                            // Check that changes are still not locked, and that the data returned is new.
                            if (!$scope.lock && $scope.volleyball != response.data) {
                                $scope.volleyball = response.data;

                                volleyballUpdated();
                            }
                        }
                    });
            }
        }

        /**
         * Should be called whenever $scope.volleyball is modified by the controller.
         */
        function volleyballUpdated() {
            // Find the item in the menu.
            $scope.menu.forEach(item => {
                if (item.name === 'Volleyball') {
                    item.live = $scope.volleyball.showScore
                }
            })
        }

        // Update data after every data timeout period.
        setInterval(getVolleyballData, data_timeout);
    }
]);
