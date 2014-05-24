//For: MarioPong
//File Name: audio.js
//Last Modified: Dec 5, 2012
//Purpose: audio for gameplay

// audio control object
var audio =  function() {
    var hit = new Audio("audio/hit.wav")
    var bounce = new Audio("audio/bounce.wav");
    var background = new Audio("audio/background.mp3");
    bounce.load();
    background.load();

    // mushic and sound
    var musicEnabled = false;
    var sfxEnabled = true;

    // the background music is looped
    background.loop = true;

    // play audio helper function
    function playSound (sound) {
        sound.play();
    }

    // play the different audios
    var play = function (kind) {
        if (!this.sfxEnabled)
            return;
        if ($("#game_area").css("display") == "none")
            return;
        if (kind == "hit") {
            playSound(hit);
        } 
        else if (kind == "bounce") {
            playSound(bounce);
        }
    }

    return {
            musicEnabled: musicEnabled,
            sfxEnabled: sfxEnabled,
            background: background,
            play: play
            };
}();

// play background music when the page is finish loading
var buttonMusicOn = document.getElementById('button_music_on');
var buttonMusicOff = document.getElementById('button_music_off');
var buttonSfxOn = document.getElementById('button_sfx_on');
var buttonSfxOff = document.getElementById('button_sfx_off');

$(document).ready( function () {
        $("#button_music_on").bind("touchstart", function () {
            buttonMusicOn.style.opacity = 1;
        });
        $("#button_music_on").bind("touchend", function () {
            buttonMusicOn.style.opacity = 0.8;
            $(this).hide();
            $("#button_music_off").show();
            audio.background.pause();
            audio.musicEnabled = !audio.musicEnabled;
        });
        $("#button_music_off").bind("touchstart", function () {
            buttonMusicOff.style.opacity = 1;
        });
        $("#button_music_off").bind("touchend", function () {
            buttonMusicOff.style.opacity = 0.8;
            $(this).hide();
            $("#button_music_on").show();
            audio.background.play();
            audio.musicEnabled = !audio.musicEnabled;
        });
        $("#button_sfx_on").bind("touchstart", function () {
            buttonSfxOn.style.opacity = 1;
        });
        $("#button_sfx_on").bind("touchend", function () {
            buttonSfxOn.style.opacity = 0.8;
            $(this).hide();
            $("#button_sfx_off").show();
            audio.sfxEnabled = !audio.sfxEnabled;
        });
        $("#button_sfx_off").bind("touchstart", function () {
            buttonSfxOff.style.opacity = 1;
        });
        $("#button_sfx_off").bind("touchend", function () {
            buttonSfxOff.style.opacity = 0.8;
            $(this).hide();
            $("#button_sfx_on").show();
            audio.sfxEnabled = !audio.sfxEnabled;
        });
        if (audio.musicEnabled) {
            audio.background.play();
            $("#button_music_off").hide();
            $("#button_music_on").show();
        } else {
            $("#button_music_off").show();
            $("#button_music_on").hide();
        }
        if (audio.sfxEnabled) {
            $("#button_sfx_off").hide();
            $("#button_sfx_on").show();
        } else {
            $("#button_sfx_off").show();
            $("#button_sfx_on").hide();
        }
});
