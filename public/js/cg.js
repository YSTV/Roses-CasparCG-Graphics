var app = angular.module('cgApp', ['ngAnimate', 'socket-io']);
var data_timeout = 100;

app.controller('lowerThirdsCtrl', ['$scope', 'socket', '$http',
    function($scope, socket, $http){
        function getLowerThirds() {
            $http.get('http://127.0.0.1:3000/lower-third')
            .then(function(response){
                if (response.status == 200 && response.data) {
                    $scope.lowerThirds = response.data;
                }
            })
        }

        setInterval(getLowerThirds, data_timeout);
    }
]);

app.controller('archeryCtrl', ['$scope', 'socket',
    function($scope, socket){
        socket.on("archery", function (msg) {
            $scope.archery = msg;
        });
    }
]);

app.controller('boxingCtrl', ['$scope', 'socket',
    function($scope, socket){

        socket.on("boxing", function (msg) {
            $scope.boxing = msg;
        });

        socket.on("clock:tick", function (msg) {
            $scope.clock = msg.slice(0, msg.indexOf("."));
        });

        $scope.$watch('boxing', function() {
            if (!$scope.boxing) {
                getBoxingData();
            }
        }, true);

        function getBoxingData() {
            socket.emit("boxing:get");
            socket.emit("clock:get");
        }
    }
]);

/**
 * Bug controller.
 */
app.controller('bugCtrl', ['$scope', '$timeout', '$http', 
    function($scope, $timeout, $http){
        $scope.tickInterval = 1000; //ms
        
        /**
         * Gets the state of the bug from the API.
         */
        function getBugData() {
            $http.get("http://127.0.0.1:3000/bug")
            .then(function(response){
                if (response.status == 200) {
                    // Only update if the new data is different.
                    if ($scope.bug != response.data) {
                        $scope.bug = response.data
                    }
                }
            })
        };
        
        /**
         * Updates the clock.
         */
        var tick = function () {
            $scope.clock = Date.now(); // Get the current time.
            $timeout(tick, $scope.tickInterval); // Reset the timer.
        };

        // Start the timer.
        $timeout(tick, $scope.tickInterval);

        // Get bug data once every timeout period.
        setInterval(getBugData, data_timeout);
    }
]);

/**
 * Roses score.
 */
app.controller('scoringCtrl', ['$scope', '$http', 'socket',
    function($scope, $http, socket){
        $scope.roses = {}

        /**
         * Gets the score from API.
         */
        function getRoses() {
            $http.get('http://127.0.0.1:3000/roses')
            .then(function(response) {
                if (response.status == 200 && response.data) {
                    $scope.roses = response.data;
                }
            })
        }

        // Get Roses data once every timeout period.
        setInterval(getRoses, data_timeout);
    }
]);

app.controller('footballCtrl', ['$scope', 'socket',
    function($scope, socket){

        socket.on("football", function (msg) {
            $scope.football = msg;
        });

        socket.on("clock:tick", function (msg) {
            $scope.clock = msg.slice(0, msg.indexOf("."));
        });

        $scope.$watch('football', function() {
            if (!$scope.football) {
                getFootballData();
            }
        }, true);

        function getFootballData() {
            socket.emit("football:get");
            socket.emit("clock:get");
        }
    }
]);

app.controller('rugbyCtrl', ['$scope', 'socket',
    function($scope, socket){

        socket.on("rugby", function (msg) {
            $scope.rugby = msg;
        });

        socket.on("clock:tick", function (msg) {
            $scope.clock = msg.slice(0, msg.indexOf("."));
        });

        $scope.$watch('rugby', function() {
            if (!$scope.rugby) {
                getRugbyData();
            }
        }, true);

        function getRugbyData() {
            socket.emit("rugby:get");
            socket.emit("clock:get");
        }
    }
]);

app.controller('dartsCtrl', ['$scope', 'socket',
    function($scope, socket){
        socket.on("darts", function (msg) {
            $scope.darts = msg;
        });

        $scope.$watch('darts', function() {
            if (!$scope.darts) {
                getDartData();
            }
        }, true);

        function getDartData() {
            socket.emit("darts:get");
        }
    }
]);

/**
 * Grid
 */
app.controller('gridCtrl', ['$scope', 'socket', '$http', 
    function($scope, socket, $http){
        $scope.grid = {}

        // Lock changes to the scope so that the grid is not update multiple times, causing ng-repeat issues.
        $scope.lock = false;

        /**
         * Gets the state of the grid.
         */
        function getGrid() {
            if (!$scope.lock) {
                // Lock changes.
                $scope.lock = true;

                $http.get('http://127.0.0.1:3000/grid')
                .then(function(response) {
                    // Check for a valid response.
                    if (response.status == 200 && response.data) {

                        // Set 'easy' properties.
                        $scope.grid.headingcolor = response.data.headingcolor;
                        $scope.grid.leftcolor = response.data.leftcolor;
                        $scope.grid.rightcolor = response.data.rightcolor;
                        $scope.grid.header = response.data.header;
                        $scope.grid.position = response.data.position;
                        $scope.grid.split = response.data.split;
                        $scope.grid.show = response.data.show;
                        
                        // If the rows have not changed, no changes are needed.
                        if (!rowsEquivalent(response.data.rows)) {
                            // If the grid is currently shown, we need to hide it to update it.
                            if ($scope.grid.show === true) {
                                $scope.grid.show = false;
                                $scope.grid.rows = [];
                                
                                // Wait until the grid is hidden. ng-repeat causes issues if we update while the grid is shown.
                                setTimeout(function() {
                                    $scope.grid.rows = response.data.rows;
                                    $scope.grid.show = true;

                                    $scope.lock = false;
                                }, 2000)
                            } else {
                                // If the grid is currently hidden, we can just update it.
                                $scope.grid.rows = response.data.rows;

                                $scope.lock = false;
                            }
                        } else {
                            $scope.lock = false;
                        }
                    } else {
                        $scope.lock = false;
                    }
                })
            }
        }

        /**
         * Returns true if the rows are equivalent to the currently displayed rows.
         * @param {} rows 
         */
        function rowsEquivalent(rows) {
            if (!$scope.grid.rows) {
                return false
            }

            if (rows.length != $scope.grid.rows.length) {
                return false
            }

            for (var i = 0; i < $scope.grid.rows.length; i++) {
                if (rows[i].right != $scope.grid.rows[i].right) {
                    return false;
                }

                if (rows[i].left != $scope.grid.rows[i].left) {
                    return false;
                }
            }

            return true;
        }

        // Call getGrid once every data timeout period.
        setInterval(getGrid, data_timeout);
    }
]);

app.controller('swimmingCtrl', ['$scope', 'socket',
    function($scope, socket){
        socket.on("swimming", function (msg) {
            $scope.swimming = msg;
        });

        $scope.clockMin = "0";
        $scope.clockSec = "00";
        $scope.clockDec = "0";

        socket.on("clock:tick", function (msg) {
            $scope.clockMin = msg.slice(0,msg.indexOf(":")).replace(/^0/, '');
            $scope.clockSec = msg.slice(msg.indexOf(":")+1,msg.indexOf("."));
            $scope.clockDec = msg.slice(msg.indexOf(".")+1);
        });

        $scope.$watch('swimming', function() {
            if (!$scope.swimming) {
                getSwimmingData();
            }
        }, true);

        function getSwimmingData() {
            socket.emit("swimming:get");
            socket.emit("clock:get");
        }
    }
]);

app.controller('basketballCtrl', ['$scope', 'socket',
    function($scope, socket){

        socket.on("basketball", function (msg) {
            $scope.basketball = msg;
        });

        socket.on("clock:tick", function (msg) {
            $scope.clock = msg.slice(0, msg.indexOf("."));
        });

        $scope.$watch('basketball', function() {
            if (!$scope.basketball) {
                getBasketballData();
            }
        }, true);

        function getBasketballData() {
            socket.emit("basketball:get");
            socket.emit("clock:get");
        }
    }
]);

app.controller('badmintonCtrl', ['$scope', 'socket',
    function($scope, socket){
        socket.on("badminton", function (msg) {
            $scope.badminton = msg;
        });

        $scope.$watch('badminton', function() {
            if (!$scope.badminton) {
                getBadmintonData();
            }
        }, true);

        function getBadmintonData() {
            socket.emit("badminton:get");
        }
    }
]);

app.controller('tennisCtrl', ['$scope', 'socket',
    function($scope, socket){
        socket.on("tennisOptions", function (msg) {
            $scope.tennisOptions = msg;
        });

        socket.on("tennisScore", function (msg) {
            $scope.tennisScore = msg;
        });

        $scope.$watch('tennisOptions', function() {
            if (!$scope.tennisScore) {
                getTennisData();
            }
        }, true);

        $scope.$watch('tennisScore', function() {
            if (!$scope.tennisScore) {
                getTennisData();
            }
        }, true);

        function getTennisData() {
            socket.emit("tennis:get");
        }
    }
]);

app.controller('netballCtrl', ['$scope', 'socket',
    function($scope, socket){

        socket.on("netball", function (msg) {
            $scope.netball = msg;

            if ($scope.netball.firstpasshome == true) {
            	$scope.netball.homeoffset = 1;
            }

            if ($scope.netball.firstpasshome == true & $scope.netball.firstpassaway == true) {
            	$scope.netball.homeoffset = 0;
            }

            $scope.TotalScore = $scope.netball.awayScore + $scope.netball.homeScore + $scope.netball.homeoffset;
			if (($scope.TotalScore % 2) == 1) {
						$scope.showcurrenthome = true;
						$scope.showcurrentaway = false;
				} else {
						$scope.showcurrenthome = false;
						$scope.showcurrentaway = true;
					}
			});

        socket.on("clock:tick", function (msg) {
            $scope.clock = msg.slice(0, msg.indexOf("."));
        });

        $scope.$watch('netball', function() {
            if (!$scope.netball) {
                getNetballData();
            }
        }, true);

        function getNetballData() {
            socket.emit("netball:get");
            socket.emit("clock:get");
        }
    }
]);

app.controller('waterpoloCtrl', ['$scope', 'socket',
    function($scope, socket){

        socket.on("waterpolo", function (msg) {
            $scope.waterpolo = msg;
			});

        socket.on("clock:tick", function (msg) {
            $scope.clock = msg.slice(0, msg.indexOf("."));
        });

        $scope.$watch('waterpolo', function() {
            if (!$scope.waterpolo) {
                getWaterpoloData();
            }
        }, true);

        function getWaterpoloData() {
            socket.emit("waterpolo:get");
            socket.emit("clock:get");
        }
    }
]);

app.controller('volleyballCtrl', ['$scope', 'socket',
    function($scope, socket){

        socket.on("volleyball", function (msg) {
            $scope.volleyball = msg;
        });

        socket.on("clock:tick", function (msg) {
            $scope.clock = msg.slice(0, msg.indexOf("."));
        });

        $scope.$watch('volleyball', function() {
            if (!$scope.volleyball) {
                getVolleyballData();
            }
        }, true);

        function getVolleyballData() {
            socket.emit("volleyball:get");
            socket.emit("clock:get");
        }
    }
]);
