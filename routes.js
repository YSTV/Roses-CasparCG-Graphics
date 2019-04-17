module.exports = function(app) {
    var controller = require('./controller');

    app.route('/stopwatch/stop').post(controller.set_clock_stop);
    app.route('/stopwatch/pause').post(controller.set_clock_pause);
    app.route('/stopwatch/reset').post(controller.set_clock_reset);
    app.route('/stopwatch/count/:direction').post(controller.set_clock_count);
    app.route('/stopwatch/set/').post(controller.set_clock_time);
    app.route('/stopwatch/time').get(controller.get_clock_time);
    app.route('/stopwatch').get(controller.get_clock);

    app.route('/team-name/:team');
    app.route('/team-name/:team/:len');

    app.route('/images/logo').get(controller.get_logo);
    app.route('/images/:team');

    app.route('/grid').get(controller.get_grid).post(controller.set_grid);

    app.route('/bug').get(controller.get_bug).post(controller.set_bug);

    app.route('/lower-third').get(controller.get_lowerThird);
    app.route('/lower-third/show/:location').post(controller.show_lowerThird);
    app.route('/lower-third/hide/:location').post(controller.hide_lowerThird);

    app.route('/roses').get(controller.get_roses).post(controller.set_roses);
    app.route('/roses/total');
    app.route('/roses/lanc');
    app.route('/roses/york');

    app.route('/sport/tennis/undo').post(controller.undo_tennis);
    app.route('/sport/tennis/reset').post(controller.reset_tennis);
    app.route('/sport/:sport').get(controller.get_sport).post(controller.set_sport);
    /**
     * boxing
     * football
     * rugby
     * darts
     * swimming
     * basketball
     * archery
     * badminton
     * tennis
     * netball
     * waterpolo
     */
}
