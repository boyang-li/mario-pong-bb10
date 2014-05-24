//For: MarioPong
//File Name: splash.js
//Last Modified: Dec 5, 2012
//Purpose: game loading screen

var splash = function() {
    // if the animation is playing
    playing = true;
    // frame count
    frame = 0;
    // time count
    time =  0;
    // total duration
    totalDuration = 10000;


    // end the animtion
    var end = function () {
        playing = false;
        display.screens["splash"].html.fadeOut("slow");
    };

    // draw all the animated objects
    var draw = function (interval) {
        // if splash is over
        if (time > totalDuration) {
            end();
            setTimeout(function() { display.show("welcome"); }, 1500);
        }
        frame += 1;
        time += interval;

    };

    return {
        playing: function() { return playing; },
        draw: draw,
        end: end
    };

}();
