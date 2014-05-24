//For: MarioPong
//File Name: screen.js
//Last Modified: Dec 5, 2012
//Purpose: switch game screens

var display = function () {
    var screens = {};
    // initialize screeens
    var init = function () {
        // splash screen
        screens['splash'] = function () {
            var html = $("#splash_screen");
            // start button
            $("#start").bind("click", function () {
                show("welcome");
                splash.end();
                    });
            return {
                html: html
            };
        }();

        // welcome screen
        screens['welcome'] = function () {
            var html = $("#welcome_screen");
            // show about screen
            var showAbout = function () {
                $("#about_screen").show();
                $("#menu").hide();
            }
            // back to menu
            var back = function () {
                $("#about_screen").hide();
                $("#menu").show();
            }
            $("#about_screen").hide();
            $("#button_play").bind("click",
                    function () {
                        game.gameplay.setDifficulty(1);
                        show("gameplay");
                        game.reset();
                        board.reset();
                        display.screens['gameplay'].instructions['launch'].show();
                     });
            $("#button_about").bind("click", showAbout);
            $("#button_return").bind("click", back);
            return {
                html: html,
                showAbout: showAbout,
                back: back
            };
        }();

        // game play screen
        screens['gameplay'] = function () {
            var html = $("#gameplay_screen");

            // init feedbacks on game screen
            var feedbacks = {};
            feedbacks["gameover"] = $("#gameover").hide();
            feedbacks["win"] = $("#win").hide();
            feedbacks["levelclear"] = $("#level_clear").hide();
            feedbacks["pause"] = $("#pause").hide();
            feedbacks["miss"] = $("#miss").hide();
            var clearFeedbacks = function () {
                for (kind in feedbacks)
                    feedbacks[kind].hide();
                buttons["replay"].hide();
            };

            // init instructions on game screen
            var instructions = {};
            instructions["launch"] = $("#launch_instruction").hide();
            var clearInstructions = function () {
                for (kind in instructions)
                    instructions[kind].hide();
            }

            // buttons on game play screen
            var buttonMenu = document.getElementById('button_menu');
            var buttons = {};
            buttons["menu"] = $("#button_menu");
            buttons["movement"] = $("#movement_control");
            buttons["replay"] = $("#button_replay").hide()

            var replay = function () {
                game.reset();
                board.reset();
                clearFeedbacks();
            };

            $(document).ready(function () {
                buttons["replay"].bind("click", replay);
                buttons["menu"].bind("touchstart", function () {
                    buttonMenu.style.opacity = 1;
                });
                buttons["menu"].bind("touchend", function () {
                    buttonMenu.style.opacity = 0.7;
                    if (game.gameplay.playing() && game.gameplay.launched()) {showDialog('pause_menu');}
                    else {
                        hideDialog('pause_menu');
                    }
                });
            });

            // indicators
            var counters = {};
            counters["life"] = $("#life");
            
            return {
                buttons: buttons,
                instructions: instructions,
                feedbacks: feedbacks,
                counters: counters,
                html: html,
                replay: replay,
                clear: function () {
                    clearInstructions();
                    clearFeedbacks();
                }
            };
        }();

        // hide all screens by default
        for (i in screens) {
            screens[i].html.hide();
        }
    }();

    // show screen
    var show = function(name)
    {
        for (i in screens)
            screens[i].html.hide();
        $("#" + name + "_screen").fadeIn('fast');

    };

    return {
        init: init,
        show: show,
        screens: screens
    };
}();

$(document).ready(function () {
    display.show("splash");
});
