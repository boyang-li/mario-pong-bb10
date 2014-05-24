//For: MarioPong
//File Name: draw.js
//Last Modified: Dec 5, 2012
//Purpose: draw functions


var draw = function () {

    var ball = function (interval) {
        if (game.gameplay.launched() == 0) {
            // if the ball is not launched yet
            // then it is always move with paddle
            board.ball.standby();
        }
        if (!game.gameplay.isGameover())
            board.ball.draw();
    };

    var paddle = function (interval) {
        if (!game.gameplay.isGameover())
            board.paddle.draw();
    };

    // clear the canvas
    var clear = function () {
        context.clearRect(0, 0, config.canvasWidth + 5, config.canvasHeight + 5);
    };

    // get current time
    var currentTime = new Date();

    // get the interval of frame
    var getInterval = function () {
        var lastTime = currentTime;
        currentTime = new Date();
        return currentTime.getTime() - lastTime.getTime();
    };

    var all = function () {
        // set the maximum interval to 40 mileseconds (25fps)
        // so that the movement will not skip
        var interval = Math.min(40, getInterval());
        // draw splash screen
        // if the splash is playing
        if(splash.playing()) {
            splash.draw(interval);
        }

        // clear the canvas
        clear();
        // if the game is paused
        // then nothing is drew
        if ((!game.gameplay.playing() || splash.playing())
                && gameplayAnimation.empty())
            return;

        // draw elements on the board
        ball(interval);
        paddle(interval);

        // draw animation
        gameplayAnimation.draw();

        // update the board
        board.update(interval)

        if (game.debug) {
            fps.addFrame();
            fps.update();
        }
    };

    return {
        all: all
    };

}();

window.requestAnimFrame = function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          window.oRequestAnimationFrame      ||
          window.msRequestAnimationFrame     ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
}();

function animloop(){
  requestAnimFrame(animloop);
  draw.all();
};
