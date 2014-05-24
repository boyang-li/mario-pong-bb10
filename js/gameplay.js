//For: MarioPong
//File Name: gameplay.js
//Last Modified: Dec 5, 2012
//Purpose: gameplay runtime code

// general gameplay
var game = function () {
    // gameplay screen
    var screen = display.screens['gameplay'];
    var gameplay;
    // player object
    var player = function () {

        // life
        var life = function () {
            // current life
            var current;

            var html = document.getElementById("life");
            var add = function () {
                current += 1;
                html.innerText = current;
            };
            var lose = function () {
                current -= 1;
                html.innerText = current;
            };
            var get = function () {
                return current;
            };
            var reset = function () {
                if (gameplay.difficulty == 1) {
                    current = config.player.LIFE_EASY_INITIAL;
                } else {
                    current = config.player.LIFE_NORMAL_INITIAL;
                }

                html.innerText = current;
            };
            return {
                add: add,
                lose: lose,
                get: get,
                reset: reset
            };
        } ();

        var reset = function () {
            life.reset();
        };

        return {
            life: life,
            reset: reset
        };
    } ();

    // gameplay
    var gameplay = function () {
        // if the ball is launched
        var launched = false;
        var standby = function () {
            playing = true;
            launched = false;
        }
        // if the game is playing
        var playing = true;

        // difficulty
        var difficulty;
        var setDifficulty = function (i) {
            this.difficulty = i;
            if (i == 1) {
//                drag = false;
//                tilt = false;
                $("#button_right").show();
                $("#button_left").show();
                $("#button_right").show();
                $("#button_left").show();
            }
        };

        // is gameover
        var gameover = false;

        var isGameover = function () {
            return gameover;
        }

        // launch the ball
        var launch = function () {
            if (!launched) {
                // check if the ball is already launched
                launched = true;
                // speed along X-axis is randomly generated
                board.ball.dx = (config.ball.DX_INITIAL - 2 * Math.random() * config.ball.DX_INITIAL) * scale.x;
                // spped along Y-axis is constant
                board.ball.dy = -config.ball.DY_INITIAL * scale.y;
            }
            screen.clear();
        };

        // miss
        var miss = function () {
            launched = false;

            if (player.life.get() == 0) {
                gameover = true;
                over();
                return;
            } else {
                player.life.lose();
                screen.feedbacks["miss"].show();
            }
        };

        // game over
        var over = function () {
            playing = false;
            screen.feedbacks["gameover"].show();
            screen.buttons["replay"].show();
        };

        // pause or unpause
        var pause = function () {
            if (launched) {
                playing = !playing;
            }
        };

        var reset = function () {
            standby();

            gameover = false;
        };

        return {
            standby: standby,
            playing: function () { return playing; },
            launched: function () { return launched; },
            launch: launch,
            pause: pause,
            miss: miss,
            reset: reset,
            difficulty: difficulty,
            setDifficulty: setDifficulty,
            isGameover: isGameover
        };
    } ();

    var reset = function () {
        player.reset();
        gameplay.reset();
        resetControl();
    };

    return {
        player: player,
        gameplay: gameplay,
        reset: reset
    };
} ();
