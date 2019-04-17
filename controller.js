var Stopwatch = require('./models/stopwatch');

// Team names and logos.
const homeTeamName = "Lancaster";
const awayTeamName = "York";
const homeTeamShortName = "LAN";
const awayTeamShortName = "YOR";
const homeTeamImage = "images/LancasterSport250.png";
const awayTeamImage = "images/YorkSport250.png";

// The logo for the event.
const eventLogo = "/images/roses2018logo.png";
const eventName = "Roses 2019";

// The default server state.
// Holds the initial settings for resetting the server state without restarting server.
var state_default = {
    bug: {
        livetext: "Live",
        locationtext: "",
        showLive: false,
        showLocation: false,
        logo: eventLogo,
        showLogo: false,
        showGeneral: false,
        showClock: false
    },
    grid: {
        colorShow: false,
        headingcolor:"#BC204B",
        leftcolor: "#1f1a34",
        rightcolor:"#1f1a34",
        header: "",
        rows: [], // { left: "", right: "" }
        position: null,
        split: null, // halves, sporttimes, onebar
        show: false
    },
    roses: {
        manualScore: false,
        yorkScore: 0,
        lancScore: 0,
        yorkProgress: 0,
        lancProgress: 0,
        pointsToWin: 0,
        showScore: false,
        showProgress: false,
        totalPoints: 354,
        eventName: eventName,
    },
    lowerThirds: {
        left: {
            heading: "",
            subHeading: "",
            show: false
        },
        right: {
            heading: "",
            subHeading: "",
            show: false
        },
        full: {
            heading: "",
            subHeading: "",
            show: false
        }
    },
    boxing: {
        homeTeam: homeTeamShortName,
        awayTeam: awayTeamShortName,
        homeScore: 0,
        awayScore: 0,
        currRound: "",
        showScore: false
    },
    football: {
        homeTeam: homeTeamName,
        awayTeam: awayTeamName,
        homeTeamShort: homeTeamShortName,
        awayTeamShort: awayTeamShortName,
        homeScore: 0,
        awayScore: 0,
        homeTeamImage: homeTeamImage,
        awayTeamImage, awayTeamImage,
        show: false,
        showpre: false,
        showpost: false
    },
    rugby: {
        homeTeam: homeTeamName,
        awayTeam: awayTeamName,
        homeTeamShort: homeTeamShortName,
        awayTeamShort: awayTeamShortName,
        homeScore: 0,
        awayScore: 0,
        show: false,
    },
    basketball: {
        homeTeam: homeTeamName,
        awayTeam: awayTeamName,
        homeTeamShort: homeTeamShortName,
        awayTeamShort: awayTeamShortName,
        homeScore: 0,
        awayScore: 0,
        show: false
    },
    darts: {
        match: "Darts",
        homeTeam: homeTeamName,
        awayTeam: awayTeamName,
        player1: homeTeamName,
        player2: awayTeamName,
        set1: 0,
        set2:0,
        leg1: 0,
        leg2: 0,
        score1:501,
        score2:501,
        show: false
    },
    swimming: {
        order: '',
        lanes: [],
        homeTeam: homeTeamName,
        awayTeam: awayTeamName,
        laneOrder: [],
        prevOrderLength: 0,
        showclock: false,
        showsplits: false,
        showlist: false,
        distance: "",
        showdistance: true
    },
    archery: {
        team1: homeTeamName,
        team2: awayTeamName,
        score1: 0,
        score2: 0,
        shots1: "",
        shots2: "",
        show: false,
    },
    tennis: {
        options: {
            homeTeam: homeTeamName,
            awayTeam: awayTeamName,
            matchName: "",
            maxSets: 3,
            disableInput: false,
            showScore: false,
            showSets: false,
            showStats: false
        },
        //Score is an array because it contains the history of the match
        //this allows you to undo by doing score.pop()
        score: [{
            sets1: [0], sets2: [0],
            set1: 0, set2: 0,
            game1: 0, game2: 0,
            point1: 0, point2: 0,
            pointName1: 0, pointName2: 0,
            pointsPlayed: 0,
            pointsServed1: 0, pointsServed2: 0,
            pointsWon1: 0, pointsWon2:0,
            firstServeWon1: 0, firstServeWon2: 0,
            secondServeWon1: 0, secondServeWon2: 0,
            ace1: 0, ace2: 0,
            singleFault1: 0, singleFault2: 0,
            doubleFault1: 0, doubleFault2: 0,
            breakPoint1: 0, breakPoint2: 0,
            breaksWon1: 0, breaksWon2: 0,
            serviceGame1: 0, serviceGame2: 0,
            servicesWon1: 0, servicesWon2: 0,
            pointsPlayed: 0, server: 1, tiebreak: false, gamePoint: "", firstFault: false
        }]
    },
    badminton: {
        match: "Badminton",
        subtitle: "Best of 3 Games Wins Match",
        homeTeam: homeTeamName,
        awayTeam: awayTeamName,
        game1: 0,
        game2:0,
        point1: 0,
        point2: 0,
        show: false,
    },
    netball: {
        homeTeam: homeTeamName,
        awayTeam: awayTeamName,
        homeScore: 0,
        awayScore: 0,
        show: false,
        firstpasshome: false,
        firstpassaway: false
    },
    waterpolo: {
        homeTeam: homeTeamName,
        awayTeam: awayTeamName,
        homeScore: 0,
        awayScore: 0,
        show: false,
    },
    volleyball: {
        homeTeam: homeTeamName,
        awayTeam: awayTeamName,
        homeScore: 0,
        awayScore: 0,
        showScore: false,
    }
}
// Make a copy for the operating current state.
// We have to JSON parse this because otherwise it's a referenced copy
// Hence the default array would be updated also.
var state = JSON.parse(JSON.stringify(state_default));


for (var i = 0; i < 8; i++){
	state.swimming.lanes[i] = {
		id: i,
		name: "",
		team: ""
	};
}

/**
 * Gets the event logo.
 */
exports.get_logo = function(req, res) {
    res.json(eventLogo);
}

/**
 * Gets the state of the bug.
 */
exports.get_bug = function(req, res) {
    res.json(state.bug);
}

/**
 * Sets the state of the bug.
 */
exports.set_bug = function(req, res) {
    state.bug = req.body;

    res.status(200).send("Updated");
}

/**
 * Gets the state of the lower thirds.
 */
exports.get_lowerThird = function(req, res) {
    res.json(state.lowerThirds);
}

/**
 * Shows a lower third.
 * The lower third to show is determined by req.params.location.
 *      req.params.location: left/right/full.
 * The request body should contain the lower third heading and subHeading (even if blank).
 */
exports.show_lowerThird = function(req, res) {
    state.lowerThirds[req.params.location].heading = req.body.heading;
    state.lowerThirds[req.params.location].subHeading = req.body.subHeading;
    state.lowerThirds[req.params.location].show = true;

    res.status(200).send("Updated");
}

/**
 * Hides a lower third.
 * The lower third to hide is determined by req.params.location.
 *      req.params.location: left/right/full/all.
 */
exports.hide_lowerThird = function(req, res) {
    if (req.params.location === 'all') {
        state.lowerThirds.left.show = false
        state.lowerThirds.right.show = false
        state.lowerThirds.full.show = false
    } else {
        state.lowerThirds[req.params.location].show = false;
    }

    res.status(200).send("Updated");
}

/**
 * Gets the grid state.
 */
exports.get_grid = function(req, res) {
    res.json(state.grid);
}

/**
 * Sets the grid state.
 */
exports.set_grid = function(req, res) {
    if (req.body.headingcolor) {
        state.grid.headingcolor = req.body.headingcolor;
    }

    if (req.body.leftcolor) {
        state.grid.leftcolor = req.body.leftcolor;
    }

    if (req.body.rightcolor) {
        state.grid.rightcolor = req.body.rightcolor;
    }

    state.grid.header = req.body.header;
    state.grid.rows = req.body.rows;

    if (req.body.position) {
        state.grid.position = req.body.position;
    }

    if (req.body.split) {
        state.grid.split = req.body.split;
    }

    state.grid.show = req.body.show;

    res.status(200).send("Updated");
}

/**
 * Gets the state of the Roses scores.
 */
exports.get_roses = function(req, res) {
    res.json(state.roses);
}

/**
 * Sets the state of the Roses scores.
 */
exports.set_roses = function(req, res) {
    state.roses = req.body;

    res.status(200).send("Updated");
}

/**
 * Gets the current state.
 */
exports.get_state = function(req, res) {
    res.json(state);
}

/**
 * Get the state for a particular sport.
 */
exports.get_sport = function(req, res) {
    var sport = req.params.sport.toUpperCase();

    switch (sport) {
        case "BOXING":
            res.json(state.boxing)
            break;
        case "FOOTBALL":
            res.json(state.football)
            break;
        case "RUGBY":
            res.json(state.rugby)
            break;
        case "DARTS":
            res.json(state.darts)
            break;
        case "SWIMMING":
            res.json(state.swimming)
            break;
        case "BASKETBALL":
            res.json(state.basketball)
            break;
        case "ARCHERY":
            res.json(state.archery)
            break;
        case "BADMINTON":
            res.json(state.badminton)
            break;
        case "TENNIS":
            var tennisState = {};
            tennisState.options = state.tennis.options;
            // Always send the latest score history (current score)
            tennisState.score = state.tennis.score[state.tennis.score.length -1];
            res.json(tennisState)
            break;
        case "NETBALL":
            res.json(state.netball)
            break;
        case "WATERPOLO":
            res.json(state.waterpolo)
            break;
        case "VOLLEYBALL":
            res.json(state.volleyball)
            break;
        default:
            res.status(404).send('Not found');
            break;
    }
}

/**
 * Dispatches to set the state for a particular sport.
 */
exports.set_sport = function (req, res) {
    var sport = req.params.sport.toUpperCase();
    switch (sport) {
        case "BOXING":
            state.boxing = req.body;
            res.status(200).send("Updated");
            break;
        case "FOOTBALL":
            state.football = req.body;
            res.status(200).send("Updated");
            break;
        case "RUGBY":
            state.rugby = req.body;
            res.status(200).send("Updated");
            break;
        case "DARTS":
            state.darts = req.body;
            res.status(200).send("Updated");
            break;
        case "SWIMMING":
            state.swimming = req.body;
            res.status(200).send("Updated");
            break;
        case "BASKETBALL":
            state.basketball = req.body;
            res.status(200).send("Updated");
            break;
        case "ARCHERY":
            state.archery = req.body;
            res.status(200).send("Updated");
            break;
        case "BADMINTON":
            state.badminton = req.body;
            res.status(200).send("Updated");
            break;
        case "TENNIS":
            state.tennis.options = req.body.options;
            // Add the score to the history array
            // Prevents double submission of score history.
            if (!_.isEqual(req.body.score, state.tennis.score.slice(-1)[0])) {
                state.tennis.score.push(req.body.score);
            }
            res.status(200).send("Updated");
            break;
        case "NETBALL":
            state.netball = req.body;
            res.status(200).send("Updated");
            break;
        case "WATERPOLO":
            state.waterpolo = req.body;
            res.status(200).send("Updated");
            break;
        case "VOLLEYBALL":
            state.volleyball = req.body;
            res.status(200).send("Updated");
            break;
        default:
            res.status(404).send('Not found');
            break;
    }
}

// Remove the last score update from tennis history array.
exports.undo_tennis = function (req, res) {
    if (state.tennis.score.length != 1) {
        state.tennis.score.splice(-1,1);
    }
    res.status(200).send("Updated");
}

// Reset tennis game history back to factory.
exports.reset_tennis = function(req, res) {
    // Make a copy for the operating current state.
    // We have to JSON parse this because otherwise it's a referenced copy
    // Hence the default array would be updated also.
    state.tennis = JSON.parse(JSON.stringify(state_default.tennis));
    res.status(200).send("Updated");
}

//Master Timer Functions
var stopwatch = new Stopwatch();

/**
 * Gets the state of the master timer.
 */
exports.get_clock = function (req, res) {
    var state = {
        "isRunning": stopwatch.isRunning(),
        "time": stopwatch.getTime(),
        "direction": stopwatch.getDirection()
    };
    res.json(state);
}

/**
* Gets the master timer time.
*/
exports.get_clock_time = function (req, res) {
    res.json(stopwatch.getTime());
}

/**
* Sets the master timer time.
*/
exports.set_clock_time = function (req, res) {
    stopwatch.setValue(req.body.time);
    res.status(200).send("Updated");
}

/**
* Sets the master timer count direction.
*/
exports.set_clock_count = function (req, res) {
    var sport = req.params.direction.toUpperCase();
    switch (sport) {
        case "UP":
            stopwatch.countUp();
            res.status(200).send("Updated");
            break;
        case "DOWN":
            stopwatch.countDown();
            res.status(200).send("Updated");
            break;
        default:
            res.status(400).send('Bad Request');
            break;
    }
}

/**
* Sets the master timer paused status.
*/
exports.set_clock_pause = function (req, res) {
    stopwatch.pause();
    res.status(200).send("Updated");
}

/**
* Stops the master timer.
*/
exports.set_clock_stop = function (req, res) {
    stopwatch.stop();
    res.status(200).send("Updated");
}

/**
* Resets the master timer.
*/
exports.set_clock_reset = function (req, res) {
    stopwatch.reset();
    res.status(200).send("Updated");
}
