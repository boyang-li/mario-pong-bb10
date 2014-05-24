//For: MarioPong
//File Name: control.js
//Last Modified: Dec 5, 2012
//Purpose: game controls

// move left or right
var rightDown = false;
var leftDown = false;

// keybord
function onKeyDown(evt)
{
    // right arrow
    if (evt.keyCode == 39) {
        rightDown = true;
    // left arrow
    } else if (evt.keyCode == 37) {
        leftDown = true;
    }
}

function onKeyUp(evt)
{
    switch (evt.keyCode) {
        // right arrow
        case 39:
            rightDown = false;
            break;
        // left arrow
        case 37:
            leftDown = false;
            break;
        // 'Esc' to pause
        case 27:
            if (game.gameplay.playing() && game.gameplay.launched() ) {showDialog('pause_menu');}
            else {hideDialog('pause_menu');}
            break;
        // 'Space' to launch ball
        case 32:
//            if (!game.gameplay.launched()) {
                game.gameplay.launch();
//            } 
            break;
        // 'a' -> music [audio] mode
        case 65:
            if (!audio.musicEnabled) {
                audio.background.play();
                $("#button_music_off").hide();
                $("#button_music_on").show();
            } else {
                audio.background.pause();
                $("#button_music_off").show();
                $("#button_music_on").hide();
            }
            audio.musicEnabled = !audio.musicEnabled;
            break;
        // 's' -> sound effect mode
        case 83:
            if (!audio.sfxEnabled) {
                $("#button_sfx_off").hide();
                $("#button_sfx_on").show();
            } else {
                $("#button_sfx_off").show();
                $("#button_sfx_on").hide();
            }
            audio.sfxEnabled = !audio.sfxEnabled;
            break;
    }
}

$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp);


// Touch buttons
// get touch elements
var buttonLeft = document.getElementById('button_left');
var buttonRight = document.getElementById('button_right');
var buttonPlay = document.getElementById('button_play');
var buttonAbout = document.getElementById('about');
var buttonReturn = document.getElementById('button_return');
var gameArea = document.getElementById('game_area');
var buttonReplay = document.getElementById('button_replay')

function leftButtonDown(evt)
{
    evt.preventDefault();
    buttonLeft.style.opacity = 1;
    leftDown = true;
}
function leftButtonUp(evt)
{
    evt.preventDefault();
    buttonLeft.style.opacity = 0.8;
    leftDown = false;
}
function rightButtonDown(evt)
{
    evt.preventDefault();
    buttonRight.style.opacity = 1
    rightDown = true;
}

function rightButtonUp(evt)
{
    buttonRight.style.opacity = 0.8;
    rightDown = false;
}

function launchHandler(evt)
{
    evt.preventDefault();
    if (game.gameplay.isGameover()) {
        return;
    } else if (!game.gameplay.launched()) {
        game.gameplay.launch();
    } 
}

function touchHandler (event) {
    var touch = event.touches[0];
    var touchPosition = {
        x: touch.pageX - parseInt($("#game_canvas").offset().left),
        y: touch.pageY - parseInt($("#game_canvas").offset().top)
    }

    launchHandler(event);

}

gameArea.addEventListener('touchend', function () { touchOnMario = false; });
buttonLeft.addEventListener('touchstart', leftButtonDown);
buttonLeft.addEventListener('touchend', leftButtonUp);
buttonRight.addEventListener('touchstart', rightButtonDown);
buttonRight.addEventListener('touchend', rightButtonUp);
buttonPlay.addEventListener('show_game', true);
buttonPlay.addEventListener('show_about', true);
buttonReturn.addEventListener('show_welcome', true);
//buttonReplay.addEventListener('')

function resetControl() {
    leftDown = false;
    rightDown = false;
}

